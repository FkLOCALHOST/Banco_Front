import React from 'react';
import { 
  FiHelpCircle, 
  FiBell, 
  FiLogOut 
} from 'react-icons/fi';
import '../assets/styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">BAM <span className="highlight">GUATE</span></div>      <div className="navbar-user">
        <span>Buenos Días, <strong>{'{Usuario}'}</strong></span>
        <div className="navbar-actions">
          <button className="navbar-btn help-btn" title="Ayuda">
            <FiHelpCircle />
          </button>
          <button className="navbar-btn notification-btn" title="Notificaciones">
            <FiBell />
          </button>
          <a href="#" className="logout" title="Salir">
            <span>salir</span>
            <FiLogOut />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;