import React from "react";
import {
  FiHome, 
  FiBook, 
  FiBriefcase, 
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/accountCards.css";

const ServicesCards = () => {
  const navigate = useNavigate();

  return (
    <div className="account-cards-container">
      <main style={{ marginLeft: "5%", width: "100%", padding: "0", marginTop: "64px" }}>
        <h2 className="account-title">Servicios</h2>
      </main>
      <div className="cards-grid">
        <div
          className="account-card info"
          onClick={() => navigate("/services/basicos")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-icon">
            <FiHome />
          </div>
          <h3 className="card-title">
            Servicios
            <br />
            Básicos
          </h3>
        </div>

        <div
          className="account-card edit"
          onClick={() => navigate("/services/educacion")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-icon">
            <FiBook />
          </div>
          <h3 className="card-title">Educación</h3>
        </div>

        <div
          className="account-card service"
          onClick={() => navigate("/services/instituciones")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-icon">
            <FiBriefcase />
          </div>
          <h3 className="card-title">Instituciones</h3>
        </div>

        <div
          className="account-card favorites"
          onClick={() => navigate("/services/donaciones")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-icon">
            <FiUsers />
          </div>
          <h3 className="card-title">
            Apoyo
            <br />
            Externo
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ServicesCards;
