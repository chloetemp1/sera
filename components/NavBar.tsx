import Link from 'next/link';
import queryString from 'query-string';
import { CLIENT_ID, REDIRECT_URI } from '../config';

const NavBar = () => {
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  }

  const queryStringified = queryString.stringify(params);

  return (
    <div className="flex justify-end w-full h-12 py-4 font-semibold">
      <div className='mx-4 mr-4'>
        <Link href={`https://github.com/login/oauth/authorize?${queryStringified}`}>Log in with Github</Link>
      </div>
      <div className='mx-4 mr-6'>
        <Link href={`/submit`}>Submit content</Link>
      </div>
      <Link href={"/favourites"}>Your favourites</Link>
  </div>
  )
}

export default NavBar;