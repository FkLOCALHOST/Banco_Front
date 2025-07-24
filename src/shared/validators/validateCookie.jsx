import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../../services/api";

const CookieValidator = ({ children }) => {
  const [valid, setValid] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setValid(isValid);
    };
    checkAuth();
  }, []);

  if (valid === null) return null;

  if (!valid) return <Navigate to="/" replace />;

  return children;
};

export default CookieValidator;
