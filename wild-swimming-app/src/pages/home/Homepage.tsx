// import Header from "../../components/Header/Header";

// import Footer from "../../feature/footer/Footer";
import styles from "./homepage.module.css";
import Herosection from "../../feature/herosection/Herosection";

import Map from "../../feature/map/Map";
// import homepage from "./Homepage.png";

const Homepage = () => {
  return (
    <>
      <Herosection />
      <section className={styles.homepage}>
        <section>
          <h5 className={styles.intro}>
            Splash provides a space within which a community of swimmers can
            share the joy and adventure of swimming outdoors. Find a wild
            swimming spot in the Uk - our map uses data from the Environmental
            agency to enable you to check out how clean the water is in your
            favourite swimming spots, share your views on a location and rate a
            location.
          </h5>
        </section>

        <Map />
      </section>
    </>
  );
};

export default Homepage;
