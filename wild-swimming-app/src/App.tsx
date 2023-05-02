// import React from "react";
import "./App.css";
// import { Link } from "react-router-dom";
// import Header from "./components/Header/Header";
import RootLayout from "./components/RootLayout/RootLayout";
import Homepage from "./pages/home/Homepage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Homepage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
