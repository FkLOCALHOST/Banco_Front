import { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/login.css";
import useLogin from "../../shared/hooks/auth/useLogin";

const Login = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login({ email, password });
    if (result && !result.error) {
      navigate("/home");
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    }
  };

  return (
    <div className="login-hero">
      <div className="login-card">
        <div className="login-header">
          <h1>BAMGUATE</h1>
          <p>Welcome back to your account!</p>
        </div>
        <form className="login-form-modern" onSubmit={handleSubmit}>
          <div className="login-group">
            <FiMail className="login-icon" />
            <input
              type="text"
              placeholder=" "
              className="login-input-modern"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
              id="login-email"
              autoComplete="email"
            />
            <label htmlFor="login-email">Email</label>
          </div>
          <div className="login-group" style={{ position: "relative" }}>
            <FiLock className="login-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              className="login-input-modern"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              id="login-password"
              autoComplete="current-password"
            />
            <label htmlFor="login-password">Password</label>
            <span
              className="login-eye"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={0}
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
          <button className="login-btn-modern" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && (
            <div className="login-error">
              {error.response?.data?.message || "Credenciales erróneas"}
            </div>
          )}
          <div className="login-bottom">
            <span>You do not have an account?</span>
            <button
              className="login-register-link"
              type="button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;