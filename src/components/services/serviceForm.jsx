import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useServices } from "../../shared/hooks/services/useAddService";
import '../../assets/styles/serviceForm.css';

const ServiceForm = () => {
  const navigate = useNavigate();
  const { createService, loading, error, success } = useServices();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: true,
    type: 'Apoyo_Externo',
    image: null
  });

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/admin-options'); 
      }, 3000);
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('status', formData.status);
    data.append('type', formData.type);
    if (formData.image) {
      data.append('image', formData.image);
    }

    await createService(data);
  };

  return (
    <div className="service-form-container">
      <h1 className="service-form-title">Agregar Nuevo Servicio</h1>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success">
          Servicio creado exitosamente
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

        <div className="form-group">
          <label className="form-label">Imagen del Servicio</label>
          <label className="file-input-label">
            Seleccionar imagen
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
          {formData.image && (
            <span className="file-name">{formData.image.name}</span>
          )}
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
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Guardando...' : 'Guardar Servicio'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;