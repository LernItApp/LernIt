import React, { useState } from 'react';
import '../styles/NavBar.css';
import Cookies from "universal-cookie";
import { Auth } from "../components/Auth.js";

const cookies = new Cookies();

function NavBar() {
    
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

  return (
    <div className='make-sticky'>
        <ul className="navbar">
            <li className="title" id="nav-item"><a href="/">LernIt</a></li>
            <li className="nav-item" id="nav-item"><a href="/mysets">My Sets</a></li>
            <li className="nav-item" id="nav-item"><a href="/new">New</a></li>

            <li className="nav-item search-item" id="nav-item">
                <input
                className='searchBar'
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                />
            </li>


            {!isAuth && (
            <>
                <li className="nav-item" id="nav-item"><a href="/about">About</a></li>
                <li className="nav-item" id="nav-item"><a href="/signin">Sign In</a></li>
            </>
          )}
          {isAuth && (
            <>
                <li className="nav-item" id="nav-item"><a href="/about">About</a></li>
                <li className="nav-item" id="nav-item"><a href="/me">Me</a></li>
                <li className="nav-item" id="nav-item"><a href="/settings">Settings</a></li>
            </>
          )}
        </ul>
    </div>
  )
}

export default NavBar