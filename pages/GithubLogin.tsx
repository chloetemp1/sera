import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const GithubLogin = ({}) => {
  const router = useRouter();

  const [_, setAuthData] = useLocalStorage("githubAuth", "");

  useEffect(() => {
    const { code } = router.query;

    const getAuthData = async () => {
      const { data } = await axios.get(`/api/githubLogin?code=${code}`);
      return data.data;
    };

    getAuthData().then((data) => setAuthData(data));

    router.push('/');
  }, [router, setAuthData]);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default GithubLogin;
