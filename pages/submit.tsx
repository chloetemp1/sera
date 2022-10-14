import axios from "axios";
import useLocalStorage from "use-local-storage";
import { Formik } from "formik";
import { fieldNames, humanReadableFieldNames } from "../components/BestPracticeDisplay";
import { TextField } from "@mui/material";
import { Layout } from "../layouts/Layout";
const base64 = require('base-64');
const yaml = require('yaml');
const sha1 = require("sha1");

const displayInput = (fieldName: string, handleChange: any, handleBlur: any, values: any) => {
  const largeFields = ['findings', 'summary', 'notes', 'bestPractices', 'methodology', 'tools', 'terminology', 'notesOfCaution'];

  return (
    <div key={fieldName}>
      <TextField
        sx={{
          margin: '10px',
          width: 'calc(50% - 20px)',
          color: 'black',
          background: 'white',
        }}
        key={fieldName}
        type="text"
        multiline
        minRows={largeFields.includes(fieldName) ? 5 : 1}
        placeholder={
          humanReadableFieldNames[
            fieldName as keyof typeof humanReadableFieldNames
          ]
        }
        name={fieldName}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[fieldName as keyof typeof values]}
      />
    </div>
  );
};

const API_BASE = 'https://api.github.com';

const SubmitContent = ({}) => {
  const [authData] = useLocalStorage<{ access_token: string }>("githubAuth", {
    access_token: "",
  });

  const handleSubmit = async (values: any) => {
    const { access_token } = authData;

    // const octokit = new Octokit({
    //   auth: access_token,
    // });

    // const data = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
    //   owner: "chloebrett",
    //   repo: "sera",
    //   title: "Amazing new feature",
    //   body: "Please pull these awesome changes in!",
    //   head: "octocat:new-feature",
    //   base: "master",
    // });

    const authConfig = {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    // Get the sha ref of the top commit on `main` right now
    const shaResp = await axios.get(`${API_BASE}/repos/chloebrett/sera/git/ref/heads/main`)

    const { sha: topCommitSha } = shaResp.data.object;

    const contentYaml = yaml.stringify(values);
    const contentSha = sha1(contentYaml);

    const branchName = `user-submitted-content-${contentSha}`;

    // Create a new branch
    const branchCreateResp = await axios.post(`${API_BASE}/repos/chloebrett/sera/git/refs`, {
      ref: `refs/heads/${branchName}`,
      topCommitSha,
    }, authConfig);

    console.log('bcr', branchCreateResp);

    const content = base64.encode(contentYaml);

    // Create the file
    const fileCreateResp = await axios.put(
      `${API_BASE}/repos/chloebrett/sera/contents/framework/content-user/bestPractices/${contentSha}.yaml`,
      {
        message: "Add user-generated content",
        committer: { name: "User Generated Content Submission", email: "noreply@github.com" },
        content,
        branch: branchName,
      },
      authConfig
    );

    console.log('fcr', fileCreateResp);

    // Create the PR
    const prCreateResp = await axios.put(
      `${API_BASE}/repos/chloebrett/sera/pulls`,
      {
        owner: 'chloebrett',
        repo: 'sera',
        title: "Add user-generated content",
        body: 'Automated PR for user-generated content',
        head: branchName,
        base: 'main',
      },
      authConfig
    );

    console.log('pcr', prCreateResp);
  }

  //   if (authData === "") {
  //     return null;
  //   }

  return (
    <Layout title="SERA | Submit Content">
      <div className="w-screen">
        <h1>Submit a best practice</h1>
        <Formik
          initialValues={{
            paperName: "",
            paperLink: "",
            cohorts: [],
            subCohorts: [],
            keywords: [],
            targetAudience: "",
            findings: "",
            summary: "",
            notes: "",
            bestPractices: "",
            methodologyUsed: "",
            toolsUsed: "",
            terminology: "",
            notesOfCaution: "",
            relatedPapers: "",
          }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {fieldNames.map((fieldName) => displayInput(fieldName, handleChange, handleBlur, values))}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default SubmitContent;
