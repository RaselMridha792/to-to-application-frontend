import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRoutes = ({children}) => {
  const {user, loader} = useContext(AuthContext);
  if (loader) {
    return (
      <>
        <div className="w-full min-h-screen flex items-center justify-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </>
    );
  }
  if (user) {
    return children;
  }

  return (
    <>
      <Navigate to="/entry-page"></Navigate>
    </>
  );
};

export default PrivetRoutes;
