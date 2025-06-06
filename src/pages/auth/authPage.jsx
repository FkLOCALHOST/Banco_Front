import React from "react";
import Login from "../../components/auth/login.jsx";
import paisajeImg from "../../assets/images.jpg";
import "../../assets/styles/authPage.css";
const AuthPage = () => {
  return (
    <div className="auth-page-container">
      <div className="auth-login-container">
        <Login />
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
