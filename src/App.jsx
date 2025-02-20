import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  console.log(location.pathname == "/entry-page");

  return (
    <>
      <div>
        {location.pathname == "/entry-page" ? (
          <></>
        ) : (
          <>
            <Navbar></Navbar>
          </>
        )}

        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
