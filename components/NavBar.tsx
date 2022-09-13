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
    <a className='mx-4 mr-6' href={`https://github.com/login/oauth/authorize?${queryStringified}`}>Submit Content</a>
    <a href={`https://github.com/login/oauth/authorize?${queryStringified}`}>My Favorites</a>
  </div>
  )
}

export default NavBar;