import React, { useState } from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import useGetServices from "../../shared/hooks/services/useGetServices";
import { FiEdit3, FiTrash2, FiPlus, FiHeart } from "react-icons/fi";
import useUserRole from "../../memo/useUserRole.js";
import "../../assets/styles/services.css";
import "../../assets/styles/layout.css";
import { useNavigate } from "react-router-dom";

const ServicesInstitutions = () => {
  const { services, loading, error } = useGetServices();
  const { isAdmin, loading: loadingRole } = useUserRole();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});

  const institutionServices = services.filter(
    (service) => service.type === "Instituciones"
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
            <h2 className="services-title">Servicios de Instituciones</h2>
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
            <div>Cargando servicios de instituciones...</div>
          ) : error ? (
            <div>Error al cargar servicios.</div>
          ) : institutionServices.length === 0 ? (
            <div>No hay servicios de instituciones disponibles.</div>
          ) : (
            <div className="services-cards-grid">
              {institutionServices.map((service) => {
                const favKey = service.uid;
                return (
                  <div className="service-card" key={favKey}>
                    <div className="service-card-header">
                      <div className="service-card-name">{service.name}</div>
                      <button
                        className={`favorite-btn ${favorites[favKey] ? 'active' : 'inactive'}`}
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
                      <div className="service-card-actions">
                        <button
                          className="action-btn edit"
                          title="Editar"
                          onClick={() =>
                            alert("Funcionalidad de editar servicio (simulado)")
                          }
                        >
                          <FiEdit3 />
                        </button>
                        <button
                          className="action-btn delete"
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

export default ServicesInstitutions;
