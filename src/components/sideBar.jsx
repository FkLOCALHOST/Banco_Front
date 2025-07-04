import React from 'react';
import { 
  FiUser, 
  FiCreditCard, 
  FiSend, 
  FiClock, 
  FiShield
} from 'react-icons/fi';
import '../assets/styles/sidebar.css'; 
import { useNavigate } from 'react-router-dom';
import useUserRole from '../memo/useUserRole';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isAdmin } = useUserRole();
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
            <a onClick={() => navigate('/cuenta')} style={{cursor: 'pointer'}}>
              <FiUser className="sidebar-link-icon" />
              Mi Cuenta
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/services')} style={{cursor: 'pointer'}}>
              <FiUser className="sidebar-link-icon" />
              Servicios
            </a>
          </li>
          <li>
            <a onClick={() => navigate('/money-accounts')} style={{cursor: 'pointer'}}>
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
          {isAdmin && (
            <li>
              <a onClick={() => navigate('/admin-options')} style={{cursor: 'pointer'}}>
                <FiShield className="sidebar-link-icon" />
                Opciones de administrador
              </a>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;