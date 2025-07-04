import { useState } from "react";
import { register as registerService } from "../../../services/api";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    setData(null);

    const response = await registerService(formData);

    if (response.error) {
      setError(response.e);
    } else {
      setData(response.data);
    }

    setLoading(false);
    return response;
  };

  return { register, loading, error, data };
};
