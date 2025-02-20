import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
      const {LoginUser} = useContext(AuthContext);
      const navigate = useNavigate()

      const handleSignIn = (e)=>{
            e.preventDefault()

            const form = e.target;
            const email = form.email.value;
            const password = form.password.value;
            LoginUser(email, password)
            .then(result =>{
                  console.log('successfully signed User:', result);
                  Swal.fire({
                              title: "Success",
                              text: "Successfully Login",
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
      }
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
            <form onSubmit={handleSignIn} className="card-body">
            <h1 className="text-2xl font-bold text-center">Login Now</h1>
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
                <button className="btn btn-primary">Login</button>
              </div>
              <p>Dont have an account? <Link className="text-blue-600" to='/register'>Please Register</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
