import React, { useState } from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import useGetServices from "../../shared/hooks/services/useGetServices";
import { FiEdit3, FiTrash2, FiPlus, FiHeart } from "react-icons/fi";
import useUserRole from "../../memo/useUserRole.js";
import "../../assets/styles/services.css";
import "../../assets/styles/layout.css";
import { useNavigate } from "react-router-dom";

const ServicesDonate = () => {
  const { services, loading, error } = useGetServices();
  const { isAdmin, loading: loadingRole } = useUserRole();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});

  const donateServices = services.filter(
    (service) => service.type === "Apoyo_Externo"
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="services-main-container main-content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="services-title">Servicios de Apoyo Externo</h2>
            {!loadingRole && isAdmin && (
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "#25263c",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.6rem 1.2rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onClick={() =>
                  alert("Funcionalidad de agregar servicio (simulado)")
                }
              >
                <FiPlus />
                Agregar servicio
              </button>
            )}
          </div>
          {loading ? (
            <div>Cargando servicios de apoyo externo...</div>
          ) : error ? (
            <div>Error al cargar servicios.</div>
          ) : donateServices.length === 0 ? (
            <div>No hay servicios de apoyo externo disponibles.</div>
          ) : (
            <div className="services-cards-grid">
              {donateServices.map((service) => {
                const favKey = service.uid;
                return (
                  <div className="service-card" key={favKey}>
                    <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                      <div className="service-card-name">{service.name}</div>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: favorites[favKey] ? "#e53935" : "#fff",
                          fontSize: "1.5rem",
                          marginLeft: "0.5rem",
                          outline: "none",
                        }}
                        title={favorites[favKey] ? "Quitar de favoritos" : "Agregar a favoritos"}
                        onClick={() => toggleFavorite(favKey)}
                        tabIndex={0}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <FiHeart fill={favorites[favKey] ? "#e53935" : "none"} />
                      </button>
                    </div>
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="service-card-img"
                      />
                    ) : (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                        alt="Sin imagen"
                        className="service-card-img"
                        style={{ objectFit: "contain", background: "#e0e0e0" }}
                      />
                    )}
                    <div className="service-card-desc">{service.description}</div>
                    <div className="service-card-price">
                      Precio: {service.price === 0 ? "Variable" : service.price}
                    </div>
                    <button
                      className="pay-btn"
                      style={{
                        marginTop: "0.7rem",
                        background: "#1976d2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.5rem 1.2rem",
                        fontWeight: 600,
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      onClick={() =>
                        navigate("/transfer", {
                          state: {
                            serviceTransfer: true,
                            receiver: service.wallet?.noAccount || "",
                            amount: service.price,
                            note: service.name,
                          },
                        })
                      }
                    >
                      Pagar
                    </button>
                    {!loadingRole && isAdmin && (
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginTop: "0.7rem",
                        }}
                      >
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#4BB543",
                            fontSize: "1.3rem",
                          }}
                          title="Editar"
                          onClick={() =>
                            alert("Funcionalidad de editar servicio (simulado)")
                          }
                        >
                          <FiEdit3 />
                        </button>
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#FF5252",
                            fontSize: "1.3rem",
                          }}
                          title="Eliminar"
                          onClick={() =>
                            alert("Funcionalidad de eliminar servicio (simulado)")
                          }
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ServicesDonate;
