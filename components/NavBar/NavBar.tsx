import queryString from 'query-string';
import styles from "./NavBar.module.css";
import { CLIENT_ID, REDIRECT_URI } from '../../config';

const NavBar = () => {
  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
  }

  const queryStringified = queryString.stringify(params);

  return (
    <div className={styles.navBar}>
    <a href={`https://github.com/login/oauth/authorize?${queryStringified}`} className={styles.navBarLink}>Submit Content</a>
    <a href={`https://github.com/login/oauth/authorize?${queryStringified}`}>My Favorites</a>
  </div>
  )
}

export default NavBar;