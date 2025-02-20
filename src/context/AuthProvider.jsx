import { createContext, useEffect, useState } from "react";
import {onAuthStateChanged, signInWithPopup, signOut,  } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
      const [changeColor, setChangeColor] = useState(true);
      const provider = new GoogleAuthProvider();
      const [user, setUser] = useState(null);
      const [loader, setLoader] = useState(true);


      const LoginWithGoogle = () =>{
        setLoader(true)
        return signInWithPopup(auth, provider)
      }


      useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
          if(currentUser){
            setUser(currentUser);
            setLoader(false);
          }else{
            setUser(null);
            setLoader(true);
          }
        });
        return ()=>{
          unSubscribe();
        }
      })


      const logOutUser = ()=>{
        setLoader(true);
        return signOut(auth)
      }


  const authInfo = {
      changeColor,
      setChangeColor,
      LoginWithGoogle,
      loader,
      user,
      logOutUser,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
