import Map from "../map/Map";
import styles from "./herosection.module.css";
import { Link } from "react-router-dom";

const Herosection = () => {
  return (
    <>
      <div className={styles.herosectioncontainer}>
        <div className={styles.heroimage}></div>
        <div className={styles.herotextsection}>
          <h1 className={styles.h1}>Discover the Perfect Place To Wild Swim</h1>
          <br />
          {/* <Link to ="/" className={styles.searchbutton} >
            SEARCH NOW
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Herosection;
