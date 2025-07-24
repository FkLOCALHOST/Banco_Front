import { useState } from 'react';
import { toggleService } from '../../../services/api';

export const useDeleteService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteService = async (serviceId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await toggleService(serviceId);
      if (response.error) {
        throw new Error(response.message);
      }
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err.message);
      return { error: true, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteService, loading, error, success };
};
