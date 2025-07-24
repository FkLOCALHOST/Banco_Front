import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../assets/styles/changePasswordModal.css"; 

const ChangePasswordModal = ({ isOpen, onClose, onSubmit, loading, error, success }) => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <h2 className="modal-title">Cambiar Contraseña</h2>
        
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error.split(", ").map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        )}

        {success && <div className="success-message">¡Contraseña actualizada con éxito!</div>}

        <div className="modal-actions">
          <button
            onClick={onClose}
            className="secondary-btn"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSubmit(newPassword)}
            className="save-btn"
            disabled={loading || !newPassword}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;