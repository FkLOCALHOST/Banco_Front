import React from 'react'

export const NavBar = () => {
  return (
    <>
        <nav className="navbar">
            <div className="navbar-container">
            <h1 className="navbar-title">BAMGUATE</h1>
            <ul className="navbar-links">
                <li className="navbar-link"><a href="/home">Home</a></li>
                <li className="navbar-link"><a href="/about">About</a></li>
                <li className="navbar-link"><a href="/contact">Contact</a></li>
            </ul>
            </div>
        </nav>
    </>
  )
}
export default NavBar;
