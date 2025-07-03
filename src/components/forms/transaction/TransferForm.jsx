import React from "react";

const TransferForm = ({
    formData,
    accounts,
    loading,
    error,
    result,
    onInputChange,
    onSubmit,
    getAccountOptions
}) => {
    return (
        <form className="transfer-form" onSubmit={onSubmit}>
            {!accounts ? (
                <div className="loading-accounts" style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: '#6b7280',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    margin: '20px 0'
                }}>
                    <p>Cargando cuentas disponibles...</p>
                </div>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="receiver">Cuenta destino</label>
                        <input
                            type="text"
                            id="receiver"
                            name="receiver"
                            placeholder="Correo o número de cuenta"
                            value={formData.receiver}
                            onChange={onInputChange}
                            required
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
                                onChange={onInputChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>
                    <div className="account-types">
                        <div className="form-group">
                            <label>Cuenta origen</label>
                            <select
                                name="senderAccount"
                                value={formData.senderAccount}
                                onChange={onInputChange}
                                required
                            >
                                <option value="">Selecciona una cuenta</option>
                                {getAccountOptions().map((account) => (
                                    <option key={account.value} value={account.value}>
                                        {account.displayText}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Cuenta destino</label>
                            <select
                                name="typeRecive"
                                value={formData.typeRecive}
                                onChange={onInputChange}
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
                            onChange={onInputChange}
                            rows="3"
                        />
                    </div>
                    <div className="button-group">
                        <button
                            className="transfer-btn"
                            type="submit"
                            disabled={loading || !formData.senderAccount}
                        >
                            {loading ? "Procesando..." : "Transferir ahora"}
                        </button>
                    </div>
                </>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {result && (
                <p style={{ color: "green" }}>¡Transferencia realizada!</p>
            )}
        </form>
    );
};

export default TransferForm;
