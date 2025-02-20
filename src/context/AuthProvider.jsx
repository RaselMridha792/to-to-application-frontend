import { createContext, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
      const [changeColor, setChangeColor] = useState(true);
      const provider = new GoogleAuthProvider();


      const RegisterUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
      }

      const LoginUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
      }

      const LoginWithGoogle = () =>{
        return signInWithPopup(auth, provider)
      }




  const authInfo = {
      changeColor,
      setChangeColor,
      RegisterUser,
      LoginUser,
      LoginWithGoogle,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
