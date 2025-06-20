import React from "react";
import { FiHeadphones, FiPhone, FiMail, FiMessageSquare, FiUser } from "react-icons/fi";
import "../../assets/styles/clientService.css";
import serviceHeaderImage from "../../assets/HeaderCS.png"

const ClientService = () => {
  const serviceOptions = [
    {
      title: "1234",
      description: "Atención telefónica las 24 horas",
      icon: <FiPhone size={24} />,
      action: "Conoce más"
    },
    {
      title: "Whatsapp BG",
      description: "Atención por mensajería instantánea",
      icon: <FiMessageSquare size={24} />,
      action: "Escribenos"
    },
    {
      title: "Correo Electrónico",
      description: "Contacto por correo electrónico",
      icon: <FiMail size={24} />,
      action: "Escribenos"
    },
    {
      title: "Autogestiones por llamada",
      description: "Servicios automatizados por teléfono",
      icon: <FiHeadphones size={24} />,
      action: "Conoce más"
    },
    {
      title: "Comentarios y Reclamos",
      description: "Sistema de gestión de reclamos",
      icon: <FiHeadphones size={24} />,
      action: "Conoce más"
    }
  ];

  return (
    <div className="client-service-container">

        <div className="service-header-image">
        <img src={serviceHeaderImage} alt="Servicio al Cliente" />
        </div>

      <div className="service-options-grid">
        {serviceOptions.map((option, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{option.icon}</div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <button className="service-action-btn">{option.action}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClientService;