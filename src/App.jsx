import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const {user} = useContext(AuthContext)
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
