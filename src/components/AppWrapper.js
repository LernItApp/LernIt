import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import '../styles/AppWrapper.css'
import '../styles/ScrollBar.css';

function AppWrapper({ children }) {
  return (
    <div className="App">
    <NavBar />
    <div className="app-container">{children}</div>

    <Footer />

    </div>
  )
}

export default AppWrapper