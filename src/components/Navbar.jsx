import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const { changeColor, setChangeColor, user, logOutUser} = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignOut = ()=>{
    logOutUser()
    .then(()=>{
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'log out successful',
        showConfirmButton: false,
        timer: 1500,
      })
      navigate('/entry-page')

    }).catch(error =>{
      console.log(error)
    })
  }
  return (
    <>
      <div className="bg-gray-600">
        <div
          className={`navbar max-w-screen-2xl mx-auto ${
            changeColor ? "text-black" : "text-white"
          }`}
        >
          <div className="navbar-start">
            <a className="btn btn-ghost text-xl text-white">Task Management</a>
          </div>
          <div className="navbar-end gap-5">
            <input
              type="checkbox"
              onChange={() => setChangeColor(!changeColor)}
              value="dark"
              className="toggle theme-controller"
            />
            <div>
              {user ? (
                <>
                <button onClick={handleSignOut} className="btn btn-primary">Log out</button>
                </>
              ) : (
                <>
                  <Link to="/entry-page" className="btn btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
