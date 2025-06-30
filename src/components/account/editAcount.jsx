import React, { useState, useEffect } from "react";
import { FiUser, FiUserCheck, FiMapPin, FiBriefcase, FiDollarSign } from "react-icons/fi";
import "../../assets/styles/editAccount.css";
import useGetUser from "../../shared/hooks/user/useGetUser";
import useEditUser from "../../shared/hooks/user/useEditUser";
import AlertCustom from "../alertCustom";

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

const EditAcount = ({ user: _user }) => {
  const uid = getUidFromCookie();
  const { user, loading, error } = useGetUser(uid);
  const { editUser, loading: saving, error: saveError, success } = useEditUser();

  const [form, setForm] = useState({
    name: "",
    userName: "",
    address: "",
    workName: "",
    monthEarnings: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        userName: user.userName || "",
        address: user.address || "",
        workName: user.workName || "",
        monthEarnings: user.monthEarnings || "",
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
        <FiUser className="edit-account-header-icon" />
        <h2>Edición de la cuenta</h2>
      </div>
      <form className="edit-account-form" onSubmit={handleSubmit}>
        <div className="edit-account-row">
          <div className="edit-account-field">
            <label>Nombre Completo</label>
            <div className="edit-account-input-icon">
              <FiUser />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="edit-account-field">
            <label>Usuario</label>
            <div className="edit-account-input-icon">
              <FiUserCheck />
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="edit-account-row">
          <div className="edit-account-field" style={{ width: "100%" }}>
            <label>Dirección</label>
            <div className="edit-account-input-icon">
              <FiMapPin />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="edit-account-row">
          <div className="edit-account-field">
            <label>Ocupación</label>
            <div className="edit-account-input-icon">
              <FiBriefcase />
              <input
                type="text"
                name="workName"
                value={form.workName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="edit-account-field">
            <label>Ingresos Mensuales</label>
            <div className="edit-account-input-icon">
              <FiDollarSign />
              <input
                type="number"
                name="monthEarnings"
                value={form.monthEarnings}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="edit-account-actions">
          <button type="submit" className="edit-account-save-btn" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className="edit-account-save-btn"
            style={{ marginLeft: "1rem", background: "#25263c" }}
            onClick={() => alert("Funcionalidad de cambiar contraseña (simulado)")}
          >
            Cambiar contraseña
          </button>
        </div>
        {saveError && <div style={{ color: "red", marginTop: "1rem" }}>{saveError}</div>}
      </form>
    </div>
  );
};

export default EditAcount;