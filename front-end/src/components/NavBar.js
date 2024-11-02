import React, { useState } from "react"

import "./NavBar.css"

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (<div>
    
    <div className={`sidebar-defocus-area ${isOpen ? 'open' : ''}`} onClick={toggleSidebar} />

    <nav className="navbar">
      <div className="navbar-left">
        <button className='toggle-button' onClick={toggleSidebar}>Sidebar</button>
      </div>
      <div className="navbar-center">
        <a href="/" className="logo">
          InLook
        </a>
      </div>
      <div className="navbar-right" />
    </nav>

    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li> 
        <li>
          <a href="/journal">JournalWrite</a>
        </li>
        <li>
          <a href="/view-journals">JournalView</a>
        </li>
      </ul>
    </nav>
    
  </div>)
}

export default NavBar
