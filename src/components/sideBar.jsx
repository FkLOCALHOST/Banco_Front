import React from 'react';
import { 
  FiUser, 
  FiCreditCard, 
  FiSend, 
  FiClock, 
  FiDollarSign 
} from 'react-icons/fi';
import '../assets/styles/sidebar.css'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <div className="user-icon">
          <FiUser />
        </div>
      </div>
      <nav>
        <ul className="sidebar-links">
          <li>
            <a href="#">
              <FiUser className="sidebar-link-icon" />
              Servicios
            </a>
          </li>
          <li>
            <a href="#">
              <FiCreditCard className="sidebar-link-icon" />
              Cuentas
            </a>
          </li>
          <li>
          <a onClick={() => navigate('/transfer')} style={{cursor: 'pointer'}}>
              <FiSend className="sidebar-link-icon" />
              Transferir
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/history')} style={{cursor: 'pointer'}}>
              <FiClock className="sidebar-link-icon" />
              Historial
            </a>
          </li>
          <li>
            <a href="#">
              <FiDollarSign className="sidebar-link-icon" />
              Crédito
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;