import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../loginbutton/loginbutton";
import LogoutButton from "../logoutbutton/logoutbutton";
import logo from "./logo.png";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const handleGoToHome = () => {
    window.location.replace("/");
  };
  const handleGoToTsCs = () => {
    window.location.replace("/terms");
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="header">
      <div className="width-container">
        <img
          src={logo}
          className="logo-img"
          width="100px"
          height="100px"
          alt="wild swimming logo"
        />
        <div className="nav-container">
          <nav>
            <ul>
              <li>
                <div className="nav-listitem" onClick={handleGoToHome}>Home</div>
              </li>
              <li>
                <div className="nav-listitem">Account</div>
              </li>
              <li>
                <div className="nav-listitem">Contact Us</div>
              </li>
              <li>
                <div className="nav-listitem" onClick={handleGoToTsCs}>
                  Terms and Conditions
                </div>
              </li>
              <li>
                <div className="nav-listitem">About</div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="search-container">
          <form>
            <input type="text" placeholder="Search..." />
            <button type="submit">Search</button>
          </form>
          <LoginButton />
          <LogoutButton />
        </div>
      </div>
      {user !== undefined && isAuthenticated && (
        <div>
          <p>You are logged in</p>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
        </div>
      )}
    </div>
  );
};

export default Header;
