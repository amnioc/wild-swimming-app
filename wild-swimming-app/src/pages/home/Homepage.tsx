import Header from "../../components/Header/Header";
import homepage from "./Homepage.png";

const Homepage = () => {
  return (
    <section>
      <Header />
      <img src={homepage} width="2000px" height="1000px" alt="Homepage" />
      <p>Homepage</p>
    </section>
  );
};

export default Homepage;
