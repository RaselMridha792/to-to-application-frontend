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
      <div className="bg-orange-300">
        <div
          className={`navbar max-w-screen-2xl mx-auto ${
            changeColor ? "text-black" : "text-white"
          }`}
        >
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <details>
                  <summary>Parent</summary>
                  <ul className="p-2">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
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
