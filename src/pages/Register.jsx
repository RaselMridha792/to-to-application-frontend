import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { RegisterUser, LoginWithGoogle, updateUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photo.value;
    const password = form.password.value;
    RegisterUser(email, password)
    .then(result =>{
      updateUser(name, photo)
      .then(result =>{
            console.log(result);
      }).catch(error =>{
            console.log(error);
      })
      console.log('successfully signed Up',result)
      Swal.fire({
            title: "Success",
            text: "Successfully Signed Up",
            icon: "success"
          });
          navigate('/')
    }).catch(error =>{
      console.log(error.message)
      Swal.fire({
            title: "something went wrong",
            text: error.message,
            icon: "error"
          });
    })
  };

  const handleGoogleLogin = () =>{
      LoginWithGoogle()
      .then(result =>{
            console.log('successfully signed Up',result)
            Swal.fire({
                  title: "Success",
                  text: "Successfully Signed Up",
                  icon: "success"
                });
                navigate('/')
      }).catch(err =>{
            console.log(err.message)
      Swal.fire({
            title: "something went wrong",
            text: err.message,
            icon: "error"
          });
      })
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
            <form onSubmit={handleSignUp} className="card-body">
              <h1 className="text-2xl font-bold text-center">Sign Up Now</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="link"
                  name="photo"
                  placeholder="Photo url"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <div className="w-full mt-4">
                <button onClick={handleGoogleLogin} className="w-full btn btn-outline"><FaGoogle /> Sign Up With Google</button>
              </div>
              <p>
                Already have an account?{" "}
                <Link className="text-blue-600" to="/login">
                  Please Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
