import React, { useState } from "react";
import "../../assets/styles/transfer.css";
import serviceHeaderImage from "../../assets/HeaderTR.png";
import { useCreateWallet } from "../../shared/hooks/wallet/useCreateWallet ";
import Navbar from "../navbar";
import Sidebar from "../sideBar";

const GenerateAccount = () => {
    const [user, setUser] = useState("");
    const { createWallet, walletData, error, loading, reset } = useCreateWallet();

    const handleGenerateAccount = async (e) => {
        e.preventDefault();

        if (!user.trim()) {
            alert("Por favor ingresa un ID de usuario válido.");
            return;
        }

        await createWallet({ user });
    };

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className="transfer-container" style={{marginTop: "50px"}}>
                <div className="service-header-image">
                    <img src={serviceHeaderImage} alt="Generar Cuenta" />
                </div>
                <form className="transfer-form" onSubmit={handleGenerateAccount}>
                    <div className="form-group">
                        <label htmlFor="user-id">ID de Usuario</label>
                        <input
                            type="text"
                            id="user-id"
                            name="user"
                            placeholder="Ingrese el ID del usuario"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
                    <button className="transfer-btn" type="submit" disabled={loading}>
                        {loading ? "Generando..." : "Generar Cuenta"}
                    </button>
                    {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
                    {walletData && (
                        <p style={{ color: "green", marginTop: "1rem" }}>
                            ✅ Cuenta generada exitosamente
                        </p>
                    )}
                </form>
            </div>
        </>
    );
};

export default GenerateAccount;
