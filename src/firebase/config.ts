// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQCgR8-U3x_NC2kHiyONqFZvHpGMPxSnk",
  authDomain: "for-templates.firebaseapp.com",
  projectId: "for-templates",
  storageBucket: "for-templates.appspot.com",
  messagingSenderId: "72319146766",
  appId: "1:72319146766:web:7b1d42667022acb55bd55f",

  clientId:
    "126529217570-caj00vjn96eijofkpqlcsiah4hhmqudd.apps.googleusercontent.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
