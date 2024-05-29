import React, { useState, useEffect } from 'react';
import '../styles/NavBar.css';
import Cookies from "universal-cookie";
import { Auth } from "../components/Auth.js";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth methods
const cookies = new Cookies();

function NavBar() {
    
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
    const [inputValue, setInputValue] = useState('');

  // Set up Firebase authentication state listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        cookies.set("auth-token", user.refreshToken);
      } else {
        setIsAuth(false);
        cookies.remove("auth-token");
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        console.log('Enter Clicked...Searching for:', inputValue);
        
        // send user to search page with their query.
        document.location.href = `/search/${inputValue}`;

      }
    }

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
                placeholder='Search for study materials...'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
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