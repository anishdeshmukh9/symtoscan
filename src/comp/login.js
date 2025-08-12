// src/components/Login.js
import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
      alert(`Welcome ${result.user.displayName}!`);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login to SymptoScan</h2>
      <button style={styles.googleBtn} onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  googleBtn: {
    backgroundColor: "#4285F4",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer"
  }
};

export default Login;
