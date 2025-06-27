import React from 'react';
import { 
  FiUser, 
  FiEdit3, 
  FiHeadphones, 
  FiHeart,
  FiInfo
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/accountCards.css';

const AccountCards = () => {
  const navigate = useNavigate()
  return (
    <div className="account-cards-container">
      <div className="account-header">
        <div className="account-icon">
          <FiUser />
        </div>
        <h2 className="account-title">Cuenta</h2>
      </div>
      
      <div className="cards-grid">
        <div
          className="account-card info"
          onClick={() => navigate('/cuenta')}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-icon">
            <FiInfo />
          </div>
          <h3 className="card-title">Información de<br />la cuenta</h3>
        </div>

        <div
          className="account-card edit"
          onClick={() => navigate('/editar-cuenta')}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-icon">
            <FiEdit3 />
          </div>
          <h3 className="card-title">Editar datos de<br />la cuenta</h3>
        </div>

        <div 
          className="account-card service" 
          onClick={() => navigate('/clientService')}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-icon">
            <FiHeadphones />
          </div>
          <h3 className="card-title">Servicio al<br />cliente</h3>
        </div>

        <div className="account-card favorites">
          <div className="card-icon">
            <FiHeart />
          </div>
          <h3 className="card-title">Cuentas<br />favoritas</h3>
        </div>
      </div>
    </div>
  );
};

export default AccountCards;
