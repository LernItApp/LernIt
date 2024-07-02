import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import '../styles/AppWrapper.css'
import '../styles/ScrollBar.css';
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../firebase-config.js";
import logo from './githubicon.webp';

const cookies = new Cookies();

function AppWrapper({ children }) {

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
  };

  return (
    <div className="App">
    <NavBar />
    <div className="app-container">{children}</div>

    <Footer />

    <a class="github-icon" href="https://github.com/LernItApp/LernIt" target="_blank">
            <img src={logo} alt="GitHub Repository"/>
    </a>

    </div>
  )
}

export default AppWrapper