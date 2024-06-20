import React, { createContext, useContext } from 'react';
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../firebase-config.js";

const AuthContext = createContext();

const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
  };

  return (
    <AuthContext.Provider value={{ signUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
