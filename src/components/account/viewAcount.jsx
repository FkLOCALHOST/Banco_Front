import React from "react";
import { FiUser, FiMail, FiMapPin, FiDollarSign, FiUserCheck } from "react-icons/fi";
import "../../assets/styles/viewAccount.css";
import useCurrentUser from "../../shared/hooks/auth/useNameUser";

const ViewAcount = ({ onEdit }) => {
  const user = useCurrentUser();

  return (
    <div className="view-account-container">
      <div className="view-account-header">
        <FiUserCheck className="view-account-header-icon" />
        <h2>Información de la cuenta</h2>
      </div>
      <div className="view-account-form">
        <div className="view-account-row">
          <div className="view-account-field">
            <label>Nombre</label>
            <div className="view-account-input-icon">
              <FiUser />
              <span>{user?.nombre || "No disponible"}</span>
            </div>
          </div>
          <div className="view-account-field">
            <label>Usuario</label>
            <div className="view-account-input-icon">
              <FiUserCheck />
              <span>{user?.username || "No disponible"}</span>
            </div>
          </div>
        </div>
        <div className="view-account-row">
          <div className="view-account-field">
            <label>Dirección</label>
            <div className="view-account-input-icon">
              <FiMapPin />
              <span>{user?.address || "No disponible"}</span>
            </div>
          </div>
          <div className="view-account-field">
            <label>Email</label>
            <div className="view-account-input-icon">
              <FiMail />
              <span>{user?.email || "No disponible"}</span>
            </div>
          </div>
        </div>
        <div className="view-account-row">
          <div className="view-account-field">
            <label>Ingresos Mensuales</label>
            <div className="view-account-input-icon">
              <FiDollarSign />
              <span>{user?.monthEarnings || "No disponible"}</span>
            </div>
          </div>
        </div>
        <div className="view-account-actions">
          <button
            className="view-account-edit-btn"
            onClick={onEdit}
            type="button"
          >
            Editar Cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAcount;