// import React from "react";
// import { Link } from "react-router-dom";
import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../loginbutton/loginbutton";
import LogoutButton from "../logoutbutton/logoutbutton";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="header">
      {/* <Link to="/" className="header__link">
        <h1 className="header__title">Wild Swimming</h1>
      </Link> */}
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#news">News</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li className="about">
          <a className="active" href="#about">
            About
          </a>
        </li>
      </ul>
      <LoginButton />
      {isAuthenticated && (
        <div>
          {/* <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p> */}
          <p>You are logged in</p>
        </div>
      )}
      <LogoutButton />
    </div>
  );
};

export default Header;
