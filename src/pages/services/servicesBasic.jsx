import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import useGetServices from "../../shared/hooks/services/useGetServices";
import { FiEdit3, FiTrash2, FiPlus } from "react-icons/fi";
import useUserRole from "../../memo/useUserRole.js";
import "../../assets/styles/services.css";

const ServicesBasic = () => {
  const { services, loading, error } = useGetServices();
  const { isAdmin, loading: loadingRole } = useUserRole();

  const basicServices = services.filter(
    (service) => service.type === "Servicios_Basicos"
  );

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main className="services-main-container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 className="services-title">Servicios Básicos</h2>
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
            <div>Cargando servicios básicos...</div>
          ) : error ? (
            <div>Error al cargar servicios.</div>
          ) : basicServices.length === 0 ? (
            <div>No hay servicios básicos disponibles.</div>
          ) : (
            <div className="services-cards-grid">
              {basicServices.map((service) => (
                <div className="service-card" key={service.uid}>
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="service-card-img"
                    />
                  )}
                  <div className="service-card-name">{service.name}</div>
                  <div className="service-card-desc">{service.description}</div>
                  <div className="service-card-price">Precio: {service.price}</div>
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
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ServicesBasic;
