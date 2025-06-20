import React, { useState } from "react";
import { FiUser, FiMail, FiMapPin, FiBriefcase, FiDollarSign } from "react-icons/fi";
import "../../assets/styles/editAccount.css";

const EditAcount = ({ user = {} }) => {
  const [form, setForm] = useState({
    nombre: user.nombre || "",
    correo: user.correo || "",
    direccion: user.direccion || "",
    ocupacion: user.ocupacion || "",
    ingresos: user.ingresos || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    alert("Datos guardados correctamente (simulado)");
  };

  return (
    <div className="edit-account-container">
      <div className="edit-account-header">
        <FiUser className="edit-account-header-icon" />
        <h2>Edicion de la cuenta</h2>
      </div>
      <form className="edit-account-form" onSubmit={handleSubmit}>
        <div className="edit-account-row">
          <div className="edit-account-field">
            <label>Nombre Completo</label>
            <div className="edit-account-input-icon">
              <FiUser />
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="edit-account-field">
            <label>Correo Electronico</label>
            <div className="edit-account-input-icon">
              <FiMail />
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="edit-account-row">
          <div className="edit-account-field" style={{ width: "100%" }}>
            <label>Direccion</label>
            <div className="edit-account-input-icon">
              <FiMapPin />
              <input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="edit-account-row">
          <div className="edit-account-field">
            <label>Ocupacion</label>
            <div className="edit-account-input-icon">
              <FiBriefcase />
              <input
                type="text"
                name="ocupacion"
                value={form.ocupacion}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="edit-account-field">
            <label>Ingresos</label>
            <div className="edit-account-input-icon">
              <FiDollarSign />
              <input
                type="number"
                name="ingresos"
                value={form.ingresos}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="edit-account-actions">
          <button type="submit" className="edit-account-save-btn">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAcount;