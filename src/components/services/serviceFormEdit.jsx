import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetServices from "../../shared/hooks/services/useGetServices";
import useEditService from "../../shared/hooks/services/useEditService";
import '../../assets/styles/serviceForm.css';

const ServiceFormEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { services, loading: fetchLoading, error: fetchError } = useGetServices();
  const { editService, loading, error, success } = useEditService();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: true,
    type: 'Apoyo_Externo'
  });

  const [currentService, setCurrentService] = useState(null);

  useEffect(() => {
    if (id && services.length > 0) {
      const service = services.find(s => (s._id || s.uid || s.id) === id);
      if (service) {
        setCurrentService(service);
        setFormData({
          name: service.name || '',
          description: service.description || '',
          price: service.price || '',
          status: service.status !== undefined ? service.status : true,
          type: service.type || 'Apoyo_Externo'
        });
      }
    }
  }, [id, services]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate(-1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const serviceTypes = [
    { value: "Servicios_Basicos", label: "Servicios Básicos" },
    { value: "Educacion", label: "Educación" },
    { value: "Instituciones", label: "Instituciones" },
    { value: "Apoyo_Externo", label: "Apoyo Externo" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentService) {
      await editService(currentService._id || currentService.id, formData);
    }
  };

  if (fetchLoading) {
    return <div className="service-form-container">Cargando servicios...</div>;
  }

  if (!currentService) {
    return <div className="service-form-container">Servicio no encontrado</div>;
  }

  return (
    <div className="service-form-container">
      <h1 className="service-form-title">Editar Servicio</h1>

      {(error || fetchError) && (
        <div className="alert alert-error">
          {error || fetchError}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          Servicio actualizado exitosamente
        </div>
      )}
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label className="form-label">Nombre del Servicio</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tipo de Servicio</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-control"
          >
            {serviceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>



        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-cancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || fetchLoading}
            className="btn btn-primary"
          >
            {loading ? 'Actualizando...' : 'Actualizar Servicio'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceFormEdit;