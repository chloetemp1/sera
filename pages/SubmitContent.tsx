import axios from "axios";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { Octokit } from "octokit";

const SubmitContent = ({}) => {
  const [authData] = useLocalStorage<{ access_token: string }>("githubAuth", {
    access_token: "",
  });
  const [bestPracticeFilename, setBestPracticeFilename] =
    useState<string>("test.yaml");
  const [bestPracticeContent, setBestPracticeContent] =
    useState<string>("test content");

  const handleSubmit = async () => {
    const { access_token } = authData;

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

    const authConfig = {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${access_token}`,
      },
    };

    // Create the file
    const { data: createFileData } = await axios.put(
      `https://api.github.com/repos/chloebrett/persona/contents/framework/content/bestPractices/newFile.yaml`,
      {
        message: "my commit message",
        committer: { name: "Monalisa Octocat", email: "octocat@github.com" },
        content: "bXkgbmV3IGZpbGUgY29udGVudHM=",
      },
      authConfig
    );

    const { sha } = createFileData;

    // Create the pull request
    const { data } = await axios.post(
      `https://api.github.com/repos/chloebrett/persona/pulls`,
      {
        title: "Amazing new feature",
        body: "Please pull these awesome changes in!",
        head: sha,
        base: "master",
      },
      authConfig
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
      <textarea
        value={bestPracticeContent}
        onChange={(e) => setBestPracticeContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitContent;
