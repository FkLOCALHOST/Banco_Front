import { useState } from "react";
import { login as loginService } from "../../../services/api";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginService(credentials);
      if (response.error) {
        setError(response.message || "Login failed");
        setLoading(false);
        return null;
      }
      setLoading(false);
      localStorage.setItem("User", JSON.stringify(response.data.userDetails))
      return response.data;
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
      return null;
    }
  };

  return { login, loading, error };
};

export default useLogin;
