import React, { useEffect, useRef } from "react";

const AlertCustom = ({ message, type = "success", onClose, duration = 2000 }) => {
  const circleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    if (circleRef.current) {
      circleRef.current.style.strokeDashoffset = 0;
    }
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        minWidth: "320px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem 2.5rem 1.5rem 2.5rem",
        gap: "1.2rem",
        border: "2px solid #4BB543",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 70,
          height: 70,
          marginBottom: "0.5rem",
          overflow: "hidden",
        }}
      >
        <svg width="70" height="70">
          <circle
            cx="35"
            cy="35"
            r="30"
            fill="none"
            stroke="#e6f4ea"
            strokeWidth="6"
          />
          <circle
            ref={circleRef}
            cx="35"
            cy="35"
            r="30"
            fill="none"
            stroke="#4BB543"
            strokeWidth="6"
            strokeDasharray={2 * Math.PI * 30}
            strokeDashoffset={2 * Math.PI * 30}
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(.4,2,.6,1)",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
          />
        </svg>
        <svg
          viewBox="0 0 52 52"
          style={{
            position: "absolute",
            top: 9,
            left: 9,
            width: 52,
            height: 52,
            pointerEvents: "none",
            overflow: "visible", // Asegura que el SVG no recorte el checkmark
            display: "block", // Previene scroll innecesario
          }}
        >
          <polyline
            points="14,28 23,37 38,18"
            fill="none"
            stroke="#4BB543"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 40,
              strokeDashoffset: 0,
              animation: "checkmark 0.7s 0.7s cubic-bezier(.4,2,.6,1) forwards",
            }}
          />
          <style>
            {`
              @keyframes checkmark {
                from { stroke-dashoffset: 40; }
                to { stroke-dashoffset: 0; }
              }
            `}
          </style>
        </svg>
      </div>
      <span
        style={{
          color: "#25263c",
          fontWeight: 600,
          fontSize: "1.15rem",
          textAlign: "center",
        }}
      >
        {message}
      </span>
    </div>
  );
};

export default AlertCustom;
