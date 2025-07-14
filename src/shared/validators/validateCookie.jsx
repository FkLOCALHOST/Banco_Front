import { Navigate } from "react-router-dom";

const CookieValidator = ({ children }) => {
  const auth = localStorage.getItem("auth");
  if (auth !== "true") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default CookieValidator;
