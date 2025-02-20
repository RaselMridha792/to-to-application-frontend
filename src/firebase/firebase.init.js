// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxcRy_rzZvH48ZNwcmM_aLd0dZlG_VKac",
  authDomain: "to-do-application-1a053.firebaseapp.com",
  projectId: "to-do-application-1a053",
  storageBucket: "to-do-application-1a053.firebasestorage.app",
  messagingSenderId: "734050608075",
  appId: "1:734050608075:web:ea34c73c9d28b6cf7c4c4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;