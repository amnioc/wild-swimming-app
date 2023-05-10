import Map from "../map/Map";
import styles from "./herosection.module.css";
import { Link } from "react-router-dom";

const Herosection = () => {
  return (
    <>
      <div className={styles.herosectioncontainer}>
        <div className={styles.heroimage}></div>
        <div className={styles.herotextsection}>
          <h1 className={styles.h1}>Discover the Perfect Place To Swim</h1>
          <br />
          <Link to ="/" className={styles.searchbutton} >
            SEARCH NOW
          </Link>
        </div>
        <section>
        <h5 className={styles.intro}
        >Splash provides a space within which a community of swimmers can share the joy and adventure of swimming outdoors. Find a wild swimming spot in the Uk - our map uses data from the Environmental agency to enable you to check out how clean the water is in your favourite swimming spots, share your views on a location and  rate a location.
        </h5>
        </section>
      </div>
    </>
  );
};

export default Herosection;
