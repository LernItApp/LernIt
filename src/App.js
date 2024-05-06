import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import New from "./pages/New";
import AppWrapper from "./components/AppWrapper";
import TermsOfService from "./pages/TermsOfService";
import Search from "./pages/Search";
import Privacy from "./pages/Privacy";
import MySets from "./pages/MySets";
import Me from "./pages/Me";
import Contact from "./pages/Contact";
import About from "./pages/About";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import FrontPage from "./pages/FrontPage.js";
import SignIn from "./pages/SignIn.js";
import { Auth } from "./components/Auth.js";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
      <Router>
        <Routes>
          {!isAuth && (
            <>
              <Route path="/" element={<FrontPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<Navigate to="/SignIn" replace />} />
            </>
          )}
          {isAuth && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/me" element={<Me />} />
              <Route path="/mysets" element={<MySets />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/search" element={<Search />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
