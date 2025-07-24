import React, { useState } from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import useGetServices from "../../shared/hooks/services/useGetServices";
import { useDeleteService } from "../../shared/hooks/services/useDeleteService";
import { FiEdit3, FiTrash2, FiPlus } from "react-icons/fi";
import useUserRole from "../../memo/useUserRole.js";
import ConfirmAlert from "../../components/confirmAlert.jsx";
import AlertCustom from "../../components/alertCustom.jsx";
import "../../assets/styles/services.css";
import "../../assets/styles/layout.css";
import { useNavigate } from "react-router-dom";

const ServicesDonate = () => {
  const { services, loading, error } = useGetServices();
  const { isAdmin, loading: loadingRole } = useUserRole();
  const { deleteService, loading: deleteLoading } = useDeleteService();
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleDeleteService = (serviceId, serviceName) => {
    setServiceToDelete({ id: serviceId, name: serviceName });
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    setShowConfirmDialog(false);
    const result = await deleteService(serviceToDelete.id);
    if (result.error) {
      alert(`Error al eliminar el servicio: ${result.message}`);
    } else {
      setShowSuccessAlert(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setServiceToDelete(null);
  };

  const donateServices = services.filter(
    (service) => service.type === "Apoyo_Externo"
  );

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
                return (
                  <div className="service-card" key={service._id || service.uid || service.id}>
                    <div className="service-card-header">
                      <div className="service-card-name">{service.name}</div>
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
                            navigate(`/service-form/edit/${service._id || service.uid || service.id}`)
                          }
                        >
                          <FiEdit3 />
                        </button>
                        <button
                          className="action-btn delete"
                          title="Eliminar"
                          onClick={() =>
                            handleDeleteService(
                              service._id || service.uid || service.id,
                              service.name
                            )
                          }
                          disabled={deleteLoading}
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
      {showConfirmDialog && (
        <ConfirmAlert
          message={`¿Estás seguro de que quieres eliminar el servicio "${serviceToDelete?.name}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          title="Eliminar servicio"
        />
      )}
      {showSuccessAlert && (
        <AlertCustom
          message="Servicio eliminado exitosamente"
          type="success"
          onClose={() => setShowSuccessAlert(false)}
        />
      )}
    </>
  );
};

export default ServicesDonate;