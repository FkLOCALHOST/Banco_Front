import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/notifications.css"
import { FiBell } from "react-icons/fi";
const Notificaciones = () => {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef();


  const notificaciones = [
    "Transferencia recibida por $2,500",
    "Tu tarjeta ha sido aprobada",
    "Nuevo mensaje del asesor",
    "Estado de cuenta disponible",
  ];


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-notificaciones" ref={ref}>
      <button
        className="boton-campana"
        onClick={() => setAbierto(!abierto)}
        aria-label="Notificaciones"
      >
        <FiBell/>
      </button>

      {abierto && (
        <div className="contenido-dropdown">
          <h4>Notificaciones</h4>
          {notificaciones.length === 0 ? (
            <p className="sin-notificaciones">No tienes notificaciones.</p>
          ) : (
            <ul className="lista-notificaciones">
              {notificaciones.map((item, index) => (
                <li key={index} className="notificacion-item">
                  <span className="punto"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
