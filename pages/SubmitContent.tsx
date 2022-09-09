import axios from "axios";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { Octokit } from "octokit";

const SubmitContent = ({}) => {
  const [authData] = useLocalStorage("githubAuth", "");
  const [bestPracticeFilename, setBestPracticeFilename] =
    useState<string>("test.yaml");
  const [bestPracticeContent, setBestPracticeContent] =
    useState<string>("test content");

  const handleSubmit = async () => {
    const { access_token } = JSON.parse(authData);

    // const octokit = new Octokit({
    //   auth: access_token,
    // });

    // const data = await octokit.request("POST /repos/{owner}/{repo}/pulls", {
    //   owner: "chloebrett",
    //   repo: "persona",
    //   title: "Amazing new feature",
    //   body: "Please pull these awesome changes in!",
    //   head: "octocat:new-feature",
    //   base: "master",
    // });

    const { data } = await axios.post(
      `https://api.github.com/repos/chloebrett/persona/pulls`,
      {
        title: "Amazing new feature",
        body: "Please pull these awesome changes in!",
        head: "octocat:new-feature",
        base: "master",
      },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(JSON.stringify(data));
  };

  //   if (authData === "") {
  //     return null;
  //   }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setBestPracticeFilename(e.target.value)}
        value={bestPracticeFilename}
      />
      <textarea onChange={(e) => setBestPracticeContent(e.target.value)}>
        {bestPracticeContent}
      </textarea>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitContent;
