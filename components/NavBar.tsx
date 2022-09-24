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

          // <div>
      //   <a
      //     href={`https://github.com/login/oauth/authorize?${queryStringified}`}
      //   >
      //     Log in with Github
      //   </a>
      // </div>

      // <div>
      //   <Link href={`/submit`}>Submit content</Link>
      // </div>

      // <div>
      //   
      // </div>

    <div className="flex justify-end w-full h-12 py-4 font-semibold">
      <Link className='mx-4 mr-6' href={`/submit`}>Submit content</Link>
      <Link href={"/favourites"}>Your favourites</Link>
  </div>
  )
}

export default NavBar;