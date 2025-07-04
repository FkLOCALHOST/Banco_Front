import React from "react";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiUserCheck,
  FiPhone,
  FiBriefcase,
  FiCreditCard,
} from "react-icons/fi";
import "../../assets/styles/viewAccount.css";
import useGetUser from "../../shared/hooks/user/useGetUser";

function getUidFromCookie() {
  const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
  if (!userCookie) return null;
  try {
    const user = JSON.parse(decodeURIComponent(userCookie[2]));
    return user.uid || user.id || user.userDetails?.uid || null;
  } catch {
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
        <div className="header-content">
          <div className="header-icon-wrapper">
            <FiUser className="view-account-header-icon" />
          </div>
          <div className="header-text">
            <h2>Perfil de Usuario</h2>
            <p>Información personal y datos de contacto</p>
          </div>
        </div>
      </div>

      <div className="profile-cards-container">
        <div className="profile-card personal-info">
          <div className="card-header">
            <FiUser className="card-icon" />
            <h3>Información Personal</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <div className="info-icon">
                <FiUser />
              </div>
              <div className="info-details">
                <label>Nombre Completo</label>
                <span>{user?.name || "No disponible"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiUserCheck />
              </div>
              <div className="info-details">
                <label>Usuario</label>
                <span>{user?.userName || "No disponible"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiCreditCard />
              </div>
              <div className="info-details">
                <label>DPI</label>
                <span>{user?.dpi || "No disponible"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-card contact-info">
          <div className="card-header">
            <FiMail className="card-icon" />
            <h3>Información de Contacto</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <div className="info-icon">
                <FiMail />
              </div>
              <div className="info-details">
                <label>Correo Electrónico</label>
                <span>{user?.email || "No disponible"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiPhone />
              </div>
              <div className="info-details">
                <label>Teléfono</label>
                <span>{user?.phone || "No disponible"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiMapPin />
              </div>
              <div className="info-details">
                <label>Dirección</label>
                <span>{user?.address || "No disponible"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-card work-info">
          <div className="card-header">
            <FiBriefcase className="card-icon" />
            <h3>Información Laboral</h3>
          </div>
          <div className="card-content">
            <div className="info-item">
              <div className="info-icon">
                <FiBriefcase />
              </div>
              <div className="info-details">
                <label>Ocupación</label>
                <span>{user?.workName || "No disponible"}</span>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <FiDollarSign />
              </div>
              <div className="info-details">
                <label>Ingresos Mensuales</label>
                <span>
                  {user?.monthEarnings 
                    ? `Q${new Intl.NumberFormat('es-GT').format(user.monthEarnings)}`
                    : "No disponible"
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="view-account-actions">
        <button
          className="view-account-edit-btn"
          onClick={onEdit}
          type="button"
        >
          <FiUserCheck />
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default ViewAcount;
