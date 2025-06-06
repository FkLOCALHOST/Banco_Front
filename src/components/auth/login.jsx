import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../../assets/styles/login.css";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login">
      <div className="banco-information">
        <h1 className="banco-title">BAMGUATE</h1>
        <p className="banco-description">Welcome back to your account!</p>
      </div>
      <form className="login-form">
        <div className="login-input">
          <input type="text" placeholder="Email" className="login-input-text" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="login-input-text"
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        <button className="login-button">Login</button>
        <p>You do not have an account? </p>
        <button className="register-button">Register</button>
      </form>
    </div>
  );
};

export default Login;
