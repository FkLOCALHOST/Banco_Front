import React from "react";
import { FiHeadphones, FiPhone, FiMail, FiMessageSquare, FiUser, FiClock, FiGlobe } from "react-icons/fi";
import "../../assets/styles/clientService.css";
import serviceHeaderImage from "../../assets/HeaderCS.png"

const ClientService = () => {
  const serviceOptions = [
    {
      title: "Línea de Atención",
      number: "1234",
      description: "Atención telefónica especializada disponible las 24 horas del día",
      icon: <FiPhone size={28} />,
      action: "Llamar Ahora",
      color: "phone",
      availability: "24/7"
    },
    {
      title: "WhatsApp Bancario",
      number: "WhatsApp BG",
      description: "Resuelve tus consultas de forma rápida y segura por mensajería",
      icon: <FiMessageSquare size={28} />,
      action: "Escribir",
      color: "whatsapp",
      availability: "En línea"
    },
    {
      title: "Correo Electrónico",
      number: "info@banco.com",
      description: "Contacto profesional para consultas detalladas y documentación",
      icon: <FiMail size={28} />,
      action: "Enviar Email",
      color: "email",
      availability: "Resp. 24h"
    },
    {
      title: "Autogestión Telefónica",
      number: "Auto",
      description: "Servicios automatizados para consultas rápidas y operaciones básicas",
      icon: <FiHeadphones size={28} />,
      action: "Acceder",
      color: "auto",
      availability: "Disponible"
    },
    {
      title: "Centro de Reclamos",
      number: "Reclamos",
      description: "Sistema especializado para gestión de comentarios y reclamos",
      icon: <FiUser size={28} />,
      action: "Reportar",
      color: "complaints",
      availability: "Lun-Vie"
    }
  ];

  return (
    <div className="client-service-container">
      <div className="service-hero-section">
        <div className="service-header-image">
          <img src={serviceHeaderImage} alt="Servicio al Cliente" />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Centro de Atención al Cliente</h1>
              <p>Estamos aquí para ayudarte. Elige el canal que más te convenga</p>
              <div className="hero-stats">
                <div className="stat-item">
                  <FiClock />
                  <span>Atención 24/7</span>
                </div>
                <div className="stat-item">
                  <FiGlobe />
                  <span>Múltiples Canales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="service-content">
        <div className="section-header">
          <h2>¿Cómo podemos ayudarte?</h2>
          <p>Selecciona el medio de contacto que prefieras</p>
        </div>

        <div className="service-options-grid">
          {serviceOptions.map((option, index) => (
            <div key={index} className={`service-card ${option.color}`}>
              <div className="service-card-header">
                <div className="service-icon">{option.icon}</div>
              </div>
              <div className="service-card-content">
                <div className="service-availability">
                  <span className="availability-badge">{option.availability}</span>
                </div>
                <h3>{option.title}</h3>
                <div className="service-contact">{option.number}</div>
                <p>{option.description}</p>
              </div>
              <div className="service-card-footer">
                <button className="service-action-btn">
                  {option.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientService;