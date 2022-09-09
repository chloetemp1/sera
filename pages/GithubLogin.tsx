import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

const GithubLogin = ({}) => {
    const router = useRouter();
    console.log(router.query);

    const [authData, setAuthData] = useState<string>("");

    useEffect(() => {
        const { code } = router.query;

        const getAuthData = async () => {
            const { data } = await axios.get(`/api/githubLogin?code=${code}`);
            return data;
        }

        getAuthData().then(data => setAuthData(data.data));
    }, [router, setAuthData]);

    return <div>
        {JSON.stringify(router.query)}
        {authData}
    </div>
}

export default GithubLogin;
