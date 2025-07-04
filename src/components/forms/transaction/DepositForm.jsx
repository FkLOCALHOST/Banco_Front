import React from "react";

const DepositForm = ({ 
  depositData, 
  depositLoading, 
  depositError, 
  depositResult, 
  onInputChange, 
  onSubmit 
}) => {
  return (
    <form className="transfer-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="deposit-receiver">No. Cuenta</label>
        <input
          type="text"
          id="deposit-receiver"
          name="receiver"
          placeholder="Número de cuenta del destinatario"
          value={depositData.receiver}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deposit-amount">Monto</label>
        <div className="amount-input">
          <span>Q</span>
          <input
            type="number"
            id="deposit-amount"
            name="amount"
            placeholder="0.00"
            value={depositData.amount}
            onChange={onInputChange}
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Tipo de cuenta destino</label>
        <select
          name="type"
          value={depositData.type}
          onChange={onInputChange}
        >
          <option value="monetary">Monetaria</option>
          <option value="saving">Ahorro</option>
          <option value="foreing">Moneda extranjera</option>
        </select>
      </div>
      <button
        className="transfer-btn"
        type="submit"
        disabled={depositLoading}
      >
        {depositLoading ? "Procesando..." : "Realizar depósito"}
      </button>

      {depositError && <p style={{ color: "red" }}>{depositError}</p>}
      {depositResult && (
        <p style={{ color: "green" }}>¡Depósito realizado exitosamente!</p>
      )}
    </form>
  );
};

export default DepositForm;
