import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import New from "./pages/New";
import AppWrapper from "./components/AppWrapper";

function App() {
  return (
    <AppWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
