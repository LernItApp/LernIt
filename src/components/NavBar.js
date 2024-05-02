import React from 'react'
import '../styles/NavBar.css';

function NavBar() {
  return (
    <div className='make-sticky'>
        <ul className="navbar">
            <li className="title" id="nav-item"><a href="/">LernIt</a></li>
            <li className="nav-item" id="nav-item"><a href="/mysets">My Sets</a></li>
            <li className="nav-item" id="nav-item"><a href="/new">New</a></li>

            {/* <li className="nav-item" id="nav-item">
                <input
                type="text"
                value={""}
                />
            </li> */}
            <li className="nav-item" id="nav-item"><a href="/about">About</a></li>
            <li className="nav-item" id="nav-item"><a href="/me">Me</a></li>
        </ul>
    </div>
  )
}

export default NavBar