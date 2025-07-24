import { useState } from "react";
import { createTransaction } from "../../../services/api";

const useRelizeTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const relizeTransfer = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await createTransaction(data);
      if (response.error) {
        setError(response.message || "Error al realizar la transacción");
        setLoading(false);
        return null;
      }
      setResult(response);
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || "Error al realizar la transacción");
      setLoading(false);
      return null;
    }
  };

  return { relizeTransfer, loading, error, result };
};

export default useRelizeTransfer;