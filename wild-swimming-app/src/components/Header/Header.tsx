import "./styles.css";
import { useState } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../loginbutton/loginbutton";
import LogoutButton from "../logoutbutton/logoutbutton";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isHamOpen, setIsHamOpen] = useState(false);

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }
  return (
    <div className="header">
      <div className="width-container">
        <div className="logo-hamburger-container">
          <img
            src={logo}
            className="logo-img"
            width="100px"
            height="100px"
            alt="wild swimming logo"
          />
          <div
            className="hamburgericon"
            onClick={() => {
              setIsHamOpen((prev) => !prev);
            }}
          >
            <svg
              viewBox="0 0 100 80"
              width="30"
              height="30"
              className="hamburgersvg"
            >
              <rect width="80" height="10"></rect>
              <rect y="30" width="80" height="10"></rect>
              <rect y="60" width="80" height="10"></rect>
            </svg>
          </div>
        </div>
        <div className={isHamOpen ? "showMenu" : "hideMenu"}>
          <div
            className="menu"
            onClick={() => {
              setIsHamOpen(false);
            }}
          >
            <ul>
              <li>
                <Link to="/" className="ham-listitem">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/account" className="ham-listitem">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/contact" className="ham-listitem">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="ham-listitem">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/about" className="ham-listitem">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="nav-container">
          <nav>
            <ul>
              <li>
                <Link to="/" className="nav-listitem">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/account" className="nav-listitem">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-listitem">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="nav-listitem">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/about" className="nav-listitem">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="search-container">
          <form>
            <input type="text" placeholder="Search..." />

            <button type="submit">Search</button>
          </form>

          {!isAuthenticated && <LoginButton />}
          {isAuthenticated && <LogoutButton />}
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
  console.log(user);
};

export default Header;
