import "./App.css";
import RootLayout from "./components/RootLayout/RootLayout";
import Homepage from "./pages/home/Homepage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const { user, isAuthenticated, isLoading } = useAuth0();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Homepage />} />
    </Route>
  )
);

import LocationDetails from "./pages/location-details/Location-details";
import TsCs from "./pages/ts-cs/Ts-cs";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
