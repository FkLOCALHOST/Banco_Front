import React from "react";

const ConfirmAlert = ({ message, onConfirm, onCancel, title = "Confirmar acción" }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          minWidth: "320px",
          maxWidth: "400px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 2.5rem 1.5rem 2.5rem",
          gap: "1.2rem",
          border: "2px solid #ff6b6b",
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle
              cx="35"
              cy="35"
              r="30"
              fill="none"
              stroke="#ffebee"
              strokeWidth="6"
            />
            <circle
              cx="35"
              cy="35"
              r="30"
              fill="none"
              stroke="#ff6b6b"
              strokeWidth="6"
            />
            <text
              x="35"
              y="45"
              textAnchor="middle"
              fill="#ff6b6b"
              fontSize="32"
              fontWeight="bold"
            >
              ?
            </text>
          </svg>
        </div>
        <h3
          style={{
            color: "#25263c",
            fontWeight: 600,
            fontSize: "1.25rem",
            textAlign: "center",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "#25263c",
            fontSize: "1rem",
            textAlign: "center",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          {message}
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "0.5rem",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid #e0e0e0",
              background: "#fff",
              color: "#666",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "0.75rem 1.5rem",
              border: "2px solid #ff6b6b",
              background: "#ff6b6b",
              color: "#fff",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
