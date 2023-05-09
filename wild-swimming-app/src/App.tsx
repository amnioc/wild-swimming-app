import "./App.css";
import { Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout/RootLayout";
import Homepage from "./pages/home/Homepage";
import LocationDetails from "./pages/location-details/Location-details";
import TsCs from "./pages/ts-cs/Ts-cs";

import Footer from "./feature/footer/Footer";

function App() {
  return (
    <section>

      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Homepage />} />
        </Route>

        <Route path="terms" element={<TsCs />} />
        <Route path="location/:id" element={<LocationDetails />} />
      </Routes>
      
      <Footer/>

    </section>
  );
}

export default App;
