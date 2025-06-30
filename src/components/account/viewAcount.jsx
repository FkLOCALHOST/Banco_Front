import React from "react";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiUserCheck,
} from "react-icons/fi";
import "../../assets/styles/viewAccount.css";
import useGetUser from "../../shared/hooks/user/useGetUser";

function getUidFromCookie() {
  const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
  if (!userCookie) return null;
  try {
    const user = JSON.parse(decodeURIComponent(userCookie[2]));
    return user.uid || user.id || user.userDetails?.uid || null;
  } catch (e) {
    return null;
  }
}

const ViewAcount = ({ onEdit }) => {
  const uid = getUidFromCookie();
  const { user, loading, error } = useGetUser(uid);

  if (loading)
    return (
      <div className="view-account-container">Cargando información...</div>
    );
  if (error)
    return (
      <div className="view-account-container">
        Error al cargar la información.
      </div>
    );

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
              <span>{user?.name || "No disponible"}</span>
            </div>
          </div>
          <div className="view-account-field">
            <label>Usuario</label>
            <div className="view-account-input-icon">
              <FiUserCheck />
              <span>{user?.userName || "No disponible"}</span>
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
