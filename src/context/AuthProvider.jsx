import { createContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
      const [changeColor, setChangeColor] = useState(true);
      const provider = new GoogleAuthProvider();
      const [user, setUser] = useState(null);
      const [loader, setLoader] = useState(false);


      const RegisterUser = (email, password) =>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
      }

      const LoginUser = (email, password) =>{
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
      }

      const LoginWithGoogle = () =>{
        setLoader(true)
        return signInWithPopup(auth, provider)
      }

      const updateUser = (displayName, photoUrl) =>{
        return updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoUrl,
        })
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
      RegisterUser,
      LoginUser,
      LoginWithGoogle,
      loader,
      user,
      updateUser,
      logOutUser,
  };
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
