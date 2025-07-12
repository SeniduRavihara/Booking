// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwur4RMgz_373epvDOKvCgnSAtK_DCKXg",
  authDomain: "bookinglk-e6a4e.firebaseapp.com",
  projectId: "bookinglk-e6a4e",
  storageBucket: "bookinglk-e6a4e.appspot.com",
  messagingSenderId: "396057711038",
  appId: "1:396057711038:web:ac64348150f5298bbb29ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
