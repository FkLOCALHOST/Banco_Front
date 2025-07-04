import React, { useState, useEffect } from "react";
import "../../assets/styles/transfer.css";
import serviceHeaderImage from "../../assets/HeaderTR.png";
import useRelizeTransfer from "../../shared/hooks/transfer/useRelizeTransfer";
import useDepositTransaction from "../../shared/hooks/transfer/useDepositTransaction";
import { useGetAccounts } from "../../shared/hooks/accounts/useGetAccounts";
import useCurrentUser from "../../shared/hooks/auth/useNameUser";
import { useLocation } from "react-router-dom";
import useUserRole from "../../memo/useUserRole";
import { TransferForm, DepositForm, HistoryTab } from "../forms/transaction";

const Transfer = () => {
  const user = useCurrentUser();
  const uid = user?.id || null;
  const { accounts } = useGetAccounts(uid);
  const location = useLocation();
  const { isAdmin } = useUserRole();

  const [activeTab, setActiveTab] = useState("transfer");
  const [formData, setFormData] = useState({
    receiver: "",
    sender: "",
    senderAccount: "",
    amount: "",
    typeSender: "saving",
    typeRecive: "monetary",
    note: "",
  });

  const [depositData, setDepositData] = useState({
    receiver: "",
    sender: "",
    amount: "",
    type: "monetary",
  });

  const [serviceForm, setServiceForm] = useState({
    receiver: "",
    amount: "",
    note: "",
  });

  const { relizeTransfer, loading, error, result } = useRelizeTransfer();
  const {
    executeDeposit,
    loading: depositLoading,
    error: depositError,
    result: depositResult,
  } = useDepositTransaction();

  const getAccountOptions = () => {
    if (!accounts) return [];

    const accountOptions = [];

    if (accounts.noAccount) {
      accountOptions.push({
        value: "monetary",
        accountNumber: accounts.noAccount,
        label: `Cuenta Corriente - ${accounts.noAccount}`,
        balance: accounts.noAccountBalance || 0,
        displayText: `Cuenta Corriente - ${accounts.noAccount} (Q${
          accounts.noAccountBalance || "0.00"
        })`,
      });
    }

    if (accounts.savingAccount) {
      accountOptions.push({
        value: "saving",
        accountNumber: accounts.savingAccount,
        label: `Cuenta de Ahorros - ${accounts.savingAccount}`,
        balance: accounts.savingAccountBalance || 0,
        displayText: `Cuenta de Ahorros - ${accounts.savingAccount} (Q${
          accounts.savingAccountBalance || "0.00"
        })`,
      });
    }

    if (accounts.foreingCurrency) {
      accountOptions.push({
        value: "foreing",
        accountNumber: accounts.foreingCurrency,
        label: `Cuenta en Dólares - ${accounts.foreingCurrency}`,
        balance: accounts.foreingCurrencyBalance || 0,
        displayText: `Cuenta en Dólares - ${accounts.foreingCurrency} (USD$${
          accounts.foreingCurrencyBalance || "0.00"
        })`,
      });
    }

    return accountOptions;
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "senderAccount") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        typeSender: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDepositInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
    let senderId = "";
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie[2]));
        senderId = userData.id || "";
      } catch {
        senderId = "";
      }
    }
    if (!senderId) {
      alert("La sesion ha expirado. Por favor, vuelve a iniciar sesión.");
      return;
    }

    await relizeTransfer({
      receiver: formData.receiver,
      sender: senderId,
      amount: Number(formData.amount),
      typeSend: formData.typeSender,
      typeRecive: formData.typeRecive,
      note: formData.note,
    });
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
    let senderId = "";
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie[2]));
        senderId = userData.id || "";
      } catch {
        senderId = "";
      }
    }
    if (!senderId) {
      alert("La sesion ha expirado. Por favor, vuelve a iniciar sesión.");
      return;
    }

    await executeDeposit({
      receiver: depositData.receiver,
      sender: senderId,
      amount: Number(depositData.amount),
      type: depositData.type,
    });
  };

  const handleServiceTransfer = async (e) => {
    e.preventDefault();
    const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
    let senderId = "";
    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie[2]));
        senderId = userData.id || "";
      } catch {
        senderId = "";
      }
    }
    if (!senderId) {
      alert("La sesion ha expirado. Por favor, vuelve a iniciar sesión.");
      return;
    }

    await relizeTransfer({
      receiver: serviceForm.receiver,
      sender: senderId,
      amount: Number(serviceForm.amount),
      typeSend: "monetary",
      typeRecive: "monetary",
      note: serviceForm.note,
    });
  };

  useEffect(() => {
    if (location.state && location.state.serviceTransfer) {
      setActiveTab("history");
      setServiceForm({
        receiver: location.state.receiver || "",
        amount: location.state.amount || "",
        note: location.state.note || "",
      });
    } else if (location.state) {
      setActiveTab("transfer");
      setFormData((prev) => ({
        ...prev,
        receiver: location.state.receiver || "",
        amount: location.state.amount || "",
        note: location.state.note || "",
      }));
    }
  }, [location.state]);

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
          {isAdmin && (
            <button
              className={`tab-btn ${activeTab === "deposits" ? "active" : ""}`}
              onClick={() => handleTabChange("deposits")}
            >
              Depósitos
            </button>
          )}
          <button
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => handleTabChange("history")}
          >
            Servicios
          </button>
        </div>
      </div>
      {activeTab === "transfer" && (
        <TransferForm
          formData={formData}
          accounts={accounts}
          loading={loading}
          error={error}
          result={result}
          onInputChange={handleInputChange}
          onSubmit={handleTransfer}
          getAccountOptions={getAccountOptions}
        />
      )}
      {activeTab === "deposits" && isAdmin && (
        <DepositForm
          depositData={depositData}
          depositLoading={depositLoading}
          depositError={depositError}
          depositResult={depositResult}
          onInputChange={handleDepositInputChange}
          onSubmit={handleDeposit}
        />
      )}
      {activeTab === "history" && (
        <>
          <form className="transfer-form" onSubmit={handleServiceTransfer}>
            <div className="form-group">
              <label htmlFor="service-receiver">No. Cuenta de servicio</label>
              <input
                type="text"
                id="service-receiver"
                name="receiver"
                placeholder="Número de cuenta del servicio"
                value={serviceForm.receiver}
                onChange={handleServiceInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="service-amount">Monto</label>
              <div className="amount-input">
                <span>Q</span>
                <input
                  type="number"
                  id="service-amount"
                  name="amount"
                  placeholder="0.00"
                  value={serviceForm.amount}
                  onChange={handleServiceInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="service-note">Nota (opcional)</label>
              <textarea
                id="service-note"
                name="note"
                placeholder="Agrega una descripción"
                value={serviceForm.note}
                onChange={handleServiceInputChange}
                rows="3"
              />
            </div>
            <button className="transfer-btn" type="submit" disabled={loading}>
              {loading ? "Procesando..." : "Pagar Servicio"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {result && (
              <p style={{ color: "green" }}>¡Pago realizado exitosamente!</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default Transfer;
