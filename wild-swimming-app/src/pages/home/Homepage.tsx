import Header from "../../components/Header/Header";
import Map from "../../feature/map/Map";
import homepage from "./Homepage.png";

const Homepage = () => {
  return (
    <section>
      <Header />
      <img src={homepage} width="2000px" height="1000px" alt="Homepage" />
      <p>Homepage</p>
      <Map/>
    </section>
  );
};

export default Homepage;
