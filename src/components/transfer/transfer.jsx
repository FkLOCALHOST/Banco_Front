import React, { useState } from "react";
import "../../assets/styles/transfer.css";
import serviceHeaderImage from "../../assets/HeaderTR.png"

const Transfer = () => {
  const [activeTab, setActiveTab] = useState("transfer");
  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    typeSend: "monetary",
    typeRecive: "monetary",
    note: ""
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="transfer-container">
      <div className="service-header-image">
        <img src={serviceHeaderImage} alt="Transferencia" />
        </div>
      <div className="transfer-header">
        <div className="transfer-tabs">
          <button 
            className={`tab-btn ${activeTab === "transfer" ? "active" : ""}`}
            onClick={() => handleTabChange("transfer")}
          >
            Transferir
          </button>
          <button 
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => handleTabChange("history")}
          >
            Historial
          </button>
          <button 
            className={`tab-btn ${activeTab === "deposit" ? "active" : ""}`}
            onClick={() => handleTabChange("deposit")}
          >
            Depósito
          </button>
        </div>
      </div>

      {activeTab === "transfer" && (
        <div className="transfer-form">
          <div className="form-group">
            <label htmlFor="receiver">Cuenta destino</label>
            <input
              type="text"
              id="receiver"
              name="receiver"
              placeholder="Correo o número de cuenta"
              value={formData.receiver}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Monto</label>
            <div className="amount-input">
              <span>Q</span>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="account-types">
            <div className="form-group">
              <label>Cuenta origen</label>
              <select 
                name="typeSend" 
                value={formData.typeSend}
                onChange={handleInputChange}
              >
                <option value="monetary">Monetaria</option>
                <option value="saving">Ahorro</option>
                <option value="foreing">Moneda extranjera</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cuenta destino</label>
              <select 
                name="typeRecive" 
                value={formData.typeRecive}
                onChange={handleInputChange}
              >
                <option value="monetary">Monetaria</option>
                <option value="saving">Ahorro</option>
                <option value="foreing">Moneda extranjera</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="note">Nota (opcional)</label>
            <textarea
              id="note"
              name="note"
              placeholder="Agrega una descripción"
              value={formData.note}
              onChange={handleInputChange}
              rows="3"
            />
          </div>

          <button className="transfer-btn">Transferir ahora</button>
        </div>
      )}

      {activeTab === "history" && (
        <div className="history-container">
          <div className="history-header">
            <h3>Últimas transacciones</h3>
            <button className="view-all-btn">Ver todo</button>
          </div>
          
        </div>
      )}

      {activeTab === "deposit" && (
        <div className="deposit-form">
          <div className="form-group">
            <label htmlFor="deposit-amount">Monto a depositar</label>
            <div className="amount-input">
              <span>Q</span>
              <input
                type="number"
                id="deposit-amount"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Cuenta destino</label>
            <select 
              name="typeRecive" 
              value={formData.typeRecive}
              onChange={handleInputChange}
            >
              <option value="monetary">Monetaria</option>
              <option value="saving">Ahorro</option>
              <option value="foreing">Moneda extranjera</option>
            </select>
          </div>

          <button className="deposit-btn">Realizar depósito</button>
        </div>
      )}
    </div>
  );
};

export default Transfer;