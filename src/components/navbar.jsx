import React from "react";
import { FiHelpCircle, FiLogOut } from "react-icons/fi";
import "../assets/styles/navbar.css";
import useCurrentUser from "../shared/hooks/auth/useNameUser";
import logo from "../assets/logoBanco.png";
import Notificaciones from "./notifications";
import { useNavigate } from "react-router-dom";

const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/; Secure; SameSite=None`;
};

const Navbar = () => {
  const navigate = useNavigate()
  const user = useCurrentUser();

  const handleLogout = (event) => {
    event.preventDefault();
    deleteCookie("auth_token");
    localStorage.removeItem("User");
    navigate("/")
  };

  const userAux = JSON.parse(localStorage.getItem("User"));

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => (window.location.href = "/home")}
        style={{ cursor: "pointer" }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "80px", marginRight: "5%", marginTop: "10px" }}
        />
      </div>
      <div className="navbar-user">
        <span>
          Buenos Días, <strong>{user?.userName || userAux?.name || "Usuario"}</strong>
        </span>
        <div className="navbar-actions">
          <button className="navbar-btn help-btn" title="Ayuda">
            <FiHelpCircle />
          </button>
          <Notificaciones />
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
