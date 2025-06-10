import React from 'react';
import '../assets/styles/sidebar.css'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">BAM <span className="highlight">GUATE</span></h2>
      <nav>
        <ul className="sidebar-links">
          <li><a href="#">Cuenta BG</a></li>
          <li><a href="#">Cuentas</a></li>
          <li><a href="#">Transferir</a></li>
          <li><a href="#">Historial</a></li>
          <li><a href="#">Crédito</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;