import React from "react";
import Login from "../../components/auth/login.jsx";
import "../../assets/styles/authPage.css";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/home");
  };

  return (
    <div className="auth-page-container">
      <div className="auth-login-container">
        <Login onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default AuthPage;
