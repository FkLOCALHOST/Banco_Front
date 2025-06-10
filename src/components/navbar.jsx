import React from 'react';
import '../assets/styles/navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">BAM <span className="highlight">GUATE</span></div>
      <div className="navbar-user">
        <span>Buenos Días, <strong>{'{Usuario}'}</strong></span>
        <a href="#" className="logout">Salir</a>
      </div>
    </nav>
  );
};

export default Navbar;