import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "./context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EntryPage = () => {
  const { LoginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignIn = () => {
    LoginWithGoogle()
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "Success",
          text: "Successfully Login",
          icon: "Success",
        });
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          title: "opps! there was a problem",
          text: error.message,
          icon: "error",
        });
      });
  };
  return (
    <>
      <div className="text-center min-h-screen w-full flex items-center bg-teal-300 justify-center flex-col">
        <h1 className="text-3xl font-bold">
          Welcome To Our Task Management Application
        </h1>
        <p className="text-xl font-bold">You need to sign-up/login to go</p>
        <button onClick={handleSignIn} className="btn btn-outline mt-5">
          <FaGoogle></FaGoogle> Go With Google
        </button>
      </div>
    </>
  );
};

export default EntryPage;
