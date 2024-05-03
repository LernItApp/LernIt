// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVg1dWocyRou6YA12DbysVEQjvPZVgXMY",
  authDomain: "lernit-78956.firebaseapp.com",
  projectId: "lernit-78956",
  storageBucket: "lernit-78956.appspot.com",
  messagingSenderId: "734853062024",
  appId: "1:734853062024:web:a342e2f56958e0293b6e3d",
  measurementId: "G-ZZH7WPD8YZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();