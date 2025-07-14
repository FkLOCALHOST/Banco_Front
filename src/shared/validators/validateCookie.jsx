import { Navigate } from "react-router-dom";

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const CookieValidator = ({ children }) => {
  const token = getCookie("auth_token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default CookieValidator;