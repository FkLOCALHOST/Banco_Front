import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import useGetServices from "../../shared/hooks/services/useGetServices";
import "../../assets/styles/services.css";

const ServicesEducacion = () => {
  const { services, loading, error } = useGetServices();

  const educacionServices = services.filter(
    (service) => service.type === "Educacion"
  );

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main className="services-main-container">
          <h2 className="services-title">Servicios de Educación</h2>
          {loading ? (
            <div>Cargando servicios de educación...</div>
          ) : error ? (
            <div>Error al cargar servicios.</div>
          ) : educacionServices.length === 0 ? (
            <div>No hay servicios de educación disponibles.</div>
          ) : (
            <div className="services-cards-grid">
              {educacionServices.map((service) => (
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
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ServicesEducacion;
