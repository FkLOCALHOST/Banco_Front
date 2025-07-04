import { useState } from "react";
import { FiEye, FiEyeOff, FiUser, FiMail, FiHome, FiPhone, FiBriefcase, FiDollarSign, FiUserCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/register.css";
import { useRegister } from "../../shared/hooks/auth/useRegister";

const initialForm = {
    name: "",
    userName: "",
    dpi: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    workName: "",
    monthEarnings: "",
};

const Register = ({ onSuccess }) => {
    const [form, setForm] = useState(initialForm);
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState("");
    const { register, loading, error } = useRegister();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setLocalError("");
    };

    const validateForm = () => {
        if (Object.values(form).some(v => !v)) {
            setLocalError("Complete all fields.");
            return false;
        }
        if (form.dpi.length < 8) {
            setLocalError("DPI must have at least 8 digits");
            return false;
        }
        if (form.phone.length < 8) {
            setLocalError("Phone must have at least 8 digits");
            return false;
        }
        if (Number(form.monthEarnings) < 0) {
            setLocalError("Monthly earnings cannot be negative");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError("");
        if (!validateForm()) return;

        const formData = {
            ...form,
            dpi: Number(form.dpi),
            monthEarnings: Number(form.monthEarnings),
        };

        const result = await register(formData);
        if (result && !result.error) {
            navigate("/home");
            if (typeof onSuccess === "function") onSuccess();
        }
    };

    return (
        <div className="register-hero">
            <div className="register-card">
                <div className="register-header">
                    <h1>BAMGUATE</h1>
                    <p>Create your new account</p>
                </div>
                <form className="register-form-modern" onSubmit={handleSubmit} autoComplete="off">
                    <div className="register-row">
                        <div className="register-group">
                            <FiUserCheck className="register-icon" />
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                placeholder=" "
                                id="register_name"
                            />
                            <label htmlFor="register_name">Full Name</label>
                        </div>
                        <div className="register-group">
                            <FiUser className="register-icon" />
                            <input
                                type="text"
                                name="userName"
                                value={form.userName}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                placeholder=" "
                                id="register_username"
                            />
                            <label htmlFor="register_username">User Name</label>
                        </div>
                    </div>
                    <div className="register-row">
                        <div className="register-group">
                            <FiUser className="register-icon" />
                            <input
                                type="number"
                                name="dpi"
                                value={form.dpi}
                                onChange={handleChange}
                                required
                                min="0"
                                placeholder=" "
                                id="register_dpi"
                            />
                            <label htmlFor="register_dpi">DPI</label>
                        </div>
                        <div className="register-group">
                            <FiHome className="register-icon" />
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                placeholder=" "
                                id="register_address"
                            />
                            <label htmlFor="register_address">Address</label>
                        </div>
                    </div>
                    <div className="register-row">
                        <div className="register-group">
                            <FiPhone className="register-icon" />
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                                maxLength={15}
                                autoComplete="off"
                                placeholder=" "
                                id="register_phone"
                            />
                            <label htmlFor="register_phone">Phone</label>
                        </div>
                        <div className="register-group">
                            <FiMail className="register-icon" />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                placeholder=" "
                                id="register_email"
                            />
                            <label htmlFor="register_email">Email</label>
                        </div>
                    </div>
                    <div className="register-row">
                        <div className="register-group" style={{ position: "relative" }}>
                            <FiUser className="register-icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                placeholder=" "
                                id="register_password"
                            />
                            <label htmlFor="register_password">Password</label>
                            <span
                                className="register-eye"
                                onClick={() => setShowPassword(v => !v)}
                                tabIndex={0}
                                role="button"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>
                        <div className="register-group">
                            <FiBriefcase className="register-icon" />
                            <input
                                type="text"
                                name="workName"
                                value={form.workName}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                                placeholder=" "
                                id="register_work"
                            />
                            <label htmlFor="register_work">Work Name</label>
                        </div>
                    </div>
                    <div className="register-row">
                        <div className="register-group" style={{ width: "100%" }}>
                            <FiDollarSign className="register-icon" />
                            <input
                                type="number"
                                name="monthEarnings"
                                value={form.monthEarnings}
                                onChange={handleChange}
                                required
                                min="0"
                                placeholder=" "
                                id="register_earnings"
                            />
                            <label htmlFor="register_earnings">Monthly Earnings</label>
                        </div>
                    </div>
                    <button className="register-btn-modern" type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                    {(localError || error) && (
                        <div className="register-error">
                            {localError || error?.response?.data?.message || "Registration failed"}
                        </div>
                    )}
                    <div className="register-bottom">
                        <span>Ya tienes una cuenta?</span>
                        <button
                            className="register-login-link"
                            type="button"
                            onClick={() => navigate("/")}
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;