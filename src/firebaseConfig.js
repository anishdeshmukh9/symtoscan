// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-75fgFd8_4UT_z0oF2jbM-JY3CwBtPfs",
  authDomain: "symptoscan-66bb4.firebaseapp.com",
  projectId: "symptoscan-66bb4",
  storageBucket: "symptoscan-66bb4.firebasestorage.app",
  messagingSenderId: "400127719702",
  appId: "1:400127719702:web:82fe81a3332125193d7837",
  measurementId: "G-16RZKXEYP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default firebaseConfig;
