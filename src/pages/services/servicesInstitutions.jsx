import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import useGetServices from "../../shared/hooks/services/useGetServices";
import "../../assets/styles/services.css";

const ServicesInstitutions = () => {
  const { services, loading, error } = useGetServices();

  const institutionServices = services.filter(
    (service) => service.type === "Instituciones"
  );

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main className="services-main-container">
          <h2 className="services-title">Servicios de Instituciones</h2>
          {loading ? (
            <div>Cargando servicios de instituciones...</div>
          ) : error ? (
            <div>Error al cargar servicios.</div>
          ) : institutionServices.length === 0 ? (
            <div>No hay servicios de instituciones disponibles.</div>
          ) : (
            <div className="services-cards-grid">
              {institutionServices.map((service) => (
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

export default ServicesInstitutions;
