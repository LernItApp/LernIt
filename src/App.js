import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <AppWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/me" element={<Me />} />
          <Route path="/mysets" element={<MySets />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/search" element={<Search />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
