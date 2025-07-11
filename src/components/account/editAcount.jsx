import React, { useState, useEffect } from "react";
import { FiUser, FiUserCheck, FiMapPin, FiBriefcase, FiDollarSign, FiPhone, FiCreditCard, FiMail } from "react-icons/fi";
import "../../assets/styles/editAccount.css";
import useGetUser from "../../shared/hooks/user/useGetUser";
import useEditUser from "../../shared/hooks/user/useEditUser";
import AlertCustom from "../alertCustom";
import useUpdatePassword from "../../shared/hooks/user/useUpdatePassword";
import ChangePasswordModal from "./changePasswordModal";

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

const EditAcount = () => {
  const uid = getUidFromCookie();
  const { user, loading, error } = useGetUser(uid);
  const { editUser, loading: saving, error: saveError, success } = useEditUser();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const {
    changePassword,
    loading: changingPassword,
    error: changePasswordError,
    success: changePasswordSuccess
  } = useUpdatePassword();
  
  const [form, setForm] = useState({
    name: "",
    userName: "",
    email: "",
    address: "",
    workName: "",
    monthEarnings: "",
    phone: "",
    dpi: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        userName: user.userName || "",
        email: user.email || "",
        address: user.address || "",
        workName: user.workName || "",
        monthEarnings: user.monthEarnings || "",
        phone: user.phone || "",
        dpi: user.dpi || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editUser(uid, form);
  };

  if (loading) return <div className="edit-account-container">Cargando información...</div>;
  if (error) return <div className="edit-account-container">Error al cargar la información.</div>;

  return (
    <div className="edit-account-container">
      {showAlert && (
        <AlertCustom
          message="¡Datos guardados correctamente!"
          type="success"
          onClose={() => setShowAlert(false)}
        />
      )}
      
      <div className="edit-account-header">
        <div className="header-content">
          <div className="header-icon-wrapper">
            <FiUser className="edit-account-header-icon" />
          </div>
          <div className="header-text">
            <h2>Editar Perfil</h2>
            <p>Actualiza tu información personal y de contacto</p>
          </div>
        </div>
      </div>

      <form className="edit-account-form" onSubmit={handleSubmit}>
        <div className="form-cards-container">
          <div className="form-card personal-info">
            <div className="card-header">
              <FiUser className="card-icon" />
              <h3>Información Personal</h3>
            </div>
            <div className="card-content">
              <div className="form-row">
                <div className="form-field">
                  <label>Nombre Completo</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FiUser />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre completo"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Usuario</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FiUserCheck />
                    </div>
                    <input
                      type="text"
                      name="userName"
                      value={form.userName}
                      onChange={handleChange}
                      placeholder="Nombre de usuario"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>DPI</label>
                  <div className="input-wrapper disabled">
                    <div className="input-icon">
                      <FiCreditCard />
                    </div>
                    <input
                      type="text"
                      name="dpi"
                      value={form.dpi}
                      disabled
                      placeholder="Documento de identificación"
                      className="disabled-input"
                    />
                  </div>
                  <small className="field-note">Este campo no puede ser modificado</small>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card contact-info">
            <div className="card-header">
              <FiMail className="card-icon" />
              <h3>Información de Contacto</h3>
            </div>
            <div className="card-content">
              <div className="form-row">
                <div className="form-field">
                  <label>Correo Electrónico</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FiMail />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Correo electrónico"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Teléfono</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FiPhone />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Número de teléfono"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Dirección</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FiMapPin />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Dirección completa"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-card work-info">
            <div className="card-header">
              <FiBriefcase className="card-icon" />
              <h3>Información Laboral</h3>
            </div>
            <div className="card-content">
              <div className="form-row">
                <div className="form-field">
                  <label>Ocupación</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FiBriefcase />
                    </div>
                    <input
                      type="text"
                      name="workName"
                      value={form.workName}
                      onChange={handleChange}
                      placeholder="Tu ocupación o profesión"
                      required
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>Ingresos Mensuales</label>
                  <div className="input-wrapper">
                    <div className="input-icon">
                      <FiDollarSign />
                    </div>
                    <input
                      type="number"
                      name="monthEarnings"
                      value={form.monthEarnings}
                      onChange={handleChange}
                      placeholder="Ingresos mensuales en quetzales"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => setShowChangePassword(true)}
          >
            Cambiar Contraseña
          </button>
        </div>

        {saveError && (
          <div className="error-message">
            {saveError}
          </div>
        )}
      </form>

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSubmit={(newPassword) => changePassword(uid, newPassword)}
        loading={changingPassword}
        error={changePasswordError}
        success={changePasswordSuccess}
      />
    </div>
  );
};

export default EditAcount;