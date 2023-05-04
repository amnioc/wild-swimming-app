import styles from "./footer.module.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.innercontainer}>
        <div>
          <img src="" alt="Splash logo" width="50rem" />
          <p className={styles.slogan}>
            Splash places<br></br> to swim
          </p>
        </div>
        <div>
          <h4 className={styles.linkheading}>Link</h4>
          <div className={styles.linkcontainer}>
            <ul>
              <li>
                <Link to="/" className={styles.linkitem}>
                  Home
                </Link>
              </li>
              <li className={styles.linkitemli}>
                <Link to="/account" className={styles.linkitem}>
                  Account
                </Link>
              </li>
            </ul>
            <ul className={styles.linkitemul}>
              <li>
                <Link to="/contact" className={styles.linkitem}>
                  Contact Us
                </Link>
              </li>
              <li className={styles.linkitemli}>
                <Link to="/about" className={styles.linkitem}>
                  About
                </Link>
              </li>
            </ul>
            <ul className={styles.linkitemul}>
              <li>
                <Link to="/terms" className={styles.linkitem}>
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.contactcontainer}>
          <h4 className={styles.contactheading}>Contact Us</h4>
          <p className={styles.contactaddress}>
            Team2projectphase,<br></br> Manchester st, Manchester M60 BRR
            <br></br>
            Phone: 07123456789<br></br>
            E-Mail:{" "}
            <a href="mailto:team2projectphase@gmail.com">
              team2projectphase@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
