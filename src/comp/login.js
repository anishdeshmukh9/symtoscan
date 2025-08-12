// src/components/Login.js
import React, { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Login() {
  const [user, setUser] = useState(null);

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Google login function
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error:", error);
    }
  };

  // --- Styles ---

  const pageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f0f2f5",
  };

  const containerStyle = {
    padding: "2rem 3rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loggedInContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem", // Space between elements
  };

  const profileImgStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "2px solid #ddd",
  };

  const profileNameStyle = {
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "#333",
  };

  const baseButtonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
    fontWeight: "500",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const loginButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#4285F4", // Google Blue
    color: "white",
  };

  const logoutButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: "#f8f9fa",
    color: "#3c4043",
    border: "1px solid #dadce0",
  };


  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        {user ? (
          <div style={loggedInContainerStyle}>
            <img src={user.photoURL} alt="User profile" style={profileImgStyle} />
            <span style={profileNameStyle}>{user.displayName}</span>
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} style={loginButtonStyle}>
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}