import React, { useState, useEffect } from "react";
import "../../assets/styles/changePasswordModal.css"; 

const ChangePasswordModal = ({ isOpen, onClose, onSubmit, loading, error, success }) => {
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (success) {
      setNewPassword("");
      setTimeout(() => onClose(), 1500);
    }
  }, [success, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Cambiar Contraseña</h3>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">¡Contraseña actualizada!</div>}
        <div className="modal-actions">
          <button
            onClick={() => onSubmit(newPassword)}
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button onClick={onClose} className="secondary-btn">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
