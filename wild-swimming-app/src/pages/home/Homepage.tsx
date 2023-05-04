import Header from "../../components/Header/Header";
import Footer from "../../feature/footer/Footer";
import homepage from "./Homepage.png";

const Homepage = () => {
  return (
    <section>
      <Header />
      <img src={homepage} width="2000px" height="1000px" alt="Homepage" />
      <Footer />
    </section>
  );
};

export default Homepage;
