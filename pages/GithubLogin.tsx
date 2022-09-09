import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import queryString from "query-string";

const GithubLogin = ({}) => {
  const router = useRouter();
  console.log(router.query);

  const [authData, setAuthData] = useLocalStorage("githubAuth", "");

  useEffect(() => {
    const { code } = router.query;

    const getAuthData = async () => {
      const { data } = await axios.get(`/api/githubLogin?code=${code}`);
      const parsedData = queryString.parse(data.data);
      return JSON.stringify(parsedData);
    };

    getAuthData().then((data) => setAuthData(data));
  }, [router, setAuthData]);

  return (
    <div>
      {JSON.stringify(router.query)}
      {authData === ""
        ? "authenticating..."
        : "auth data saved to local storage"}
    </div>
  );
};

export default GithubLogin;
