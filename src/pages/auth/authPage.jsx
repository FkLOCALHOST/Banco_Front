import React from "react";
import Login from "../../components/auth/login.jsx";
import paisajeImg from "../../assets/images.jpg";
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
      <div className="auth-img-container">
        <img
          src={paisajeImg}
          alt="Paisaje"
          className="auth-img"
        />
      </div>
    </div>
  );
};

export default AuthPage;
