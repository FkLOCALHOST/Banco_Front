import React, { useState } from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import useGetServices from "../../shared/hooks/services/useGetServices";
import { FiEdit3, FiTrash2, FiPlus, FiHeart } from "react-icons/fi";
import useUserRole from "../../memo/useUserRole.js";
import "../../assets/styles/services.css";
import { useNavigate } from "react-router-dom";

const ServicesBasic = () => {
  const { services, loading, error } = useGetServices();
  const { isAdmin, loading: loadingRole } = useUserRole();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
          </div>
          {loading ? (
            <div>Cargando servicios básicos...</div>
          ) : error ? (
            <div>Error al cargar servicios.</div>
          ) : basicServices.length === 0 ? (
            <div>No hay servicios básicos disponibles.</div>
          ) : (
            <div className="services-cards-grid">
              {basicServices.map((service) => {
                const favKey = service._id || service.uid;
                return (
                  <div className="service-card" key={favKey}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
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
                        title={
                          favorites[favKey]
                            ? "Quitar de favoritos"
                            : "Agregar a favoritos"
                        }
                        onClick={() => toggleFavorite(favKey)}
                        tabIndex={0}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <FiHeart
                          fill={favorites[favKey] ? "#e53935" : "none"}
                        />
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

export default ServicesBasic;
