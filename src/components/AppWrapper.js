import React from 'react'
import NavBar from './NavBar'
import '../styles/AppWrapper.css'
import '../styles/ScrollBar.css';

function AppWrapper({ children }) {
  return (
    <div className="App">
    <NavBar />
    <div className="app-container">{children}</div>

    <footer>
        <p>Copyright © 2024 Mintype. All rights reserved.</p>
        <p><a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a> | <a href="/contact">Contact Us</a></p>
    </footer>

    </div>
  )
}

export default AppWrapper