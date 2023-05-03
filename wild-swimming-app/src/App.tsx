import "./App.css";
import RootLayout from "./components/RootLayout/RootLayout";
import Homepage from "./pages/home/Homepage";
import TsCs from "./pages/ts-cs/Ts-cs";
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
      <Route path="terms" element={<TsCs />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
