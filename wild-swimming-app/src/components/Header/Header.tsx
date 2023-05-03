import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../loginbutton/loginbutton";
import LogoutButton from "../logoutbutton/logoutbutton";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#account">Account</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <a href="#terms">Terms and Conditions</a>
          </li>
          <li className="about">
            <a className="active" href="#about">
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className="search-container">
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <LoginButton />
      {user !== undefined && isAuthenticated && (
        <div>
          <p>You are logged in</p>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      <LogoutButton />
    </div>
  );
};

export default Header;