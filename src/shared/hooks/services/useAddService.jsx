import { useState } from 'react';
import { addService } from '../../../services/api';

export const useServices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createService = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await addService(formData);
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

  return { createService, loading, error, success };
};