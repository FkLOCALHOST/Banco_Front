import React from 'react';
import { 
  FiUsers, 
  FiDollarSign, 
  FiPackage,
  FiShield,
  FiTrendingUp,
  FiBox
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/accountCards.css';
import Navbar from '../navbar';
import Sidebar from '../sideBar';

const AdminOptionCards = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' , marginTop: '50px' }}>
        <Sidebar />
        <div style={{ 
          flex: 1, 
          marginLeft: '250px', 
          padding: '20px',
          minHeight: 'calc(100vh - 100px)',
          backgroundColor: '#f5f5f5'
        }}>
          <div className="account-cards-container" style={{ margin: 0 }}>
            <div className="account-header">
              <div className="account-icon">
                <FiShield />
              </div>
              <h2 className="account-title">Panel de Administrador</h2>
            </div>
            <div className="cards-grid">
            <div
              className="account-card info"
              onClick={() => navigate('/admin/get-users-info')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon">
                <FiUsers />
              </div>
              <h3 className="card-title">Gestión de<br />Usuarios</h3>
              <p className="card-description" style={{ color: 'white' }}>Administrar clientes y usuarios del sistema</p>
            </div>
            <div
              className="account-card edit"
              onClick={() => navigate("/admin/user-transactions/")}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon">
                <FiTrendingUp />
              </div>
              <h3 className="card-title">Cuentas con<br />Más Movimientos</h3>
              <p className="card-description" style={{ color: 'white' }}>Ver actividad de cuentas ordenadas por movimientos</p>
            </div>
            <div 
              className="account-card service" 
              onClick={() => navigate('/admin/deposits')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon">
                <FiDollarSign />
              </div>
              <h3 className="card-title">Gestión de<br />Depósitos</h3>
              <p className="card-description" style={{ color: 'white' }}>Realizar y gestionar depósitos de usuarios</p>
            </div>
            <div 
              className="account-card favorites"
              onClick={() => navigate('/admin/products')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon">
                <FiPackage />
              </div>
              <h3 className="card-title">Productos y<br />Servicios</h3>
              <p className="card-description" style={{ color: 'white' }}>Gestionar productos exclusivos del banco</p>
            </div>
            <div 
              className="account-card info"
              onClick={() => navigate('/admin/get-users')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon">
                <FiUsers />
              </div>
              <h3 className="card-title">Detalles de<br />Usuarios</h3>
              <p className="card-description" style={{ color: 'white' }}>Ver saldos y movimientos de usuarios</p>
            </div>
            <div 
              className="account-card edit"
              onClick={() => navigate('/admin/generate-wallet')}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-icon">
                <FiBox />
              </div>
              <h3 className="card-title">Otorgar Cuentas</h3>
              <p className="card-description" style={{ color: 'white' }}>Dar a los usuarios cuentas para su manejo</p>
            </div>            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOptionCards;
