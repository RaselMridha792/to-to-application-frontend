import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const location = useLocation();
  const {user} = useContext(AuthContext)
  console.log(location.pathname == "/entry-page");

  return (
    <>
      <div>
        {!user? (
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
