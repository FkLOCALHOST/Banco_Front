import React from "react";
import { FiHelpCircle, FiBell, FiLogOut } from "react-icons/fi";
import "../assets/styles/navbar.css";
import useCurrentUser from "../shared/hooks/auth/useNameUser";

const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
};

const Navbar = () => {
  const user = useCurrentUser();
  const handleLogout = (sesion) => {
   sesion.preventDefault();
   deleteCookie("User");
   window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        BAM <span className="highlight">GUATE</span>
      </div>
      <div className="navbar-user">
        <span>
          Buenos Días, <strong>{user?.userName || "Usuario"}</strong>
        </span>
        <div className="navbar-actions">
          <button className="navbar-btn help-btn" title="Ayuda">
            <FiHelpCircle />
          </button>
          <button
            className="navbar-btn notification-btn"
            title="Notificaciones"
          >
            <FiBell />
          </button>
          <a href="#" className="logout" title="Salir" onClick={handleLogout}>
            <span>salir</span>
            <FiLogOut />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;