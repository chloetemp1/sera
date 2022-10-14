import axios from "axios";
import useLocalStorage from "use-local-storage";
import { Formik } from "formik";
import { fieldNames, humanReadableFieldNames } from "../components/BestPracticeDisplay";
import { TextField } from "@mui/material";
import { Layout } from "../layouts/Layout";
const base64 = require('base-64');
const yaml = require('yaml');

const displayInput = (fieldName: string, handleChange: any, handleBlur: any, values: any) => {
  const largeFields = ['findings', 'summary', 'notes', 'bestPractices', 'methodology', 'tools', 'terminology', 'notesOfCaution'];

  return (
    <div>
      <TextField
        sx={{
          margin: '10px',
          width: 'calc(50% - 20px)',
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

    const content = base64.encode(yaml.stringify(values));

    // Create the file
    const { data } = await axios.put(
      `https://api.github.com/repos/chloebrett/sera/contents/framework/content-user/bestPractices/newFile.yaml`,
      {
        message: "Add user-generated content",
        committer: { name: "User Generated Content Submission", email: "noreply@github.com" },
        content,
      },
      authConfig
    );

    console.log(data);
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
