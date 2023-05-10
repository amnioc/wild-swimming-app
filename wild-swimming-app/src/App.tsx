import "./App.css";
import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout/RootLayout";
import Homepage from "./pages/home/Homepage";
import LocationDetails from "./pages/location-details/Location-details";
import TsCs from "./pages/ts-cs/Ts-cs";

import Footer from "./feature/footer/Footer";
import Header from "./components/Header/Header";

function App() {
  return (
    <section>
      <Header />

      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />

          <Route path="terms" element={<TsCs />} />
          <Route path="location/:id" element={<LocationDetails />} />
        </Route>
      </Routes>

      <Footer />
    </section>
  );
}

export default App;
