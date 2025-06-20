import React from "react";
import {
  FiDollarSign,
  FiSave,
  FiGlobe,
  FiHeart,
  FiEye,
  FiEyeOff,
  FiCopy,
} from "react-icons/fi";
import "../../assets/styles/bankAccounts.css";

const BankAccounts = () => {
  const accountsData = {
    noAccount: 1234567890,
    noAccountBalance: 15750.5,
    noAccountMovements: 25,
    savingAccount: 3456789012,
    savingAccountBalance: 8500.75,
    savingAccountMovements: 12,
    foreingCurrency: 4567890123,
    foreingCurrencyBalance: 2350.25,
    foreingCurrencyMovements: 8,
    favoriteAccount: [1234567890, 3456789012],
  };

  const [showBalances, setShowBalances] = React.useState({
    monetary: true,
    saving: true,
    foreign: true,
  });

  const toggleBalance = (accountType) => {
    setShowBalances((prev) => ({
      ...prev,
      [accountType]: !prev[accountType],
    }));
  };

  const copyAccountNumber = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber.toString());
  };

  const isFavorite = (accountNumber) => {
    return accountsData.favoriteAccount.includes(accountNumber);
  };

  return (
    <div className="bank-accounts-container">
      <div className="accounts-header">
        <h2 className="accounts-title">Mis Cuentas Bancarias</h2>
        <p className="accounts-subtitle">
          Gestiona tus cuentas y consulta tus saldos
        </p>
      </div>
      <div className="accounts-grid">
        <div className="account-card monetary">
          <div className="account-header">
            <div className="account-type">
              <FiDollarSign className="account-icon" />
              <div>
                <h3>Cuenta monetaria</h3>
                <p className="account-description">
                  Cuenta principal para movimientos diarios
                </p>
              </div>
            </div>
            {isFavorite(accountsData.noAccount) && (
              <FiHeart className="favorite-icon filled" />
            )}
          </div>
          <div className="account-number">
            <span>No. de Cuenta:</span>
            <div className="number-container">
              <span className="number">{accountsData.noAccount}</span>
              <button
                className="copy-btn"
                onClick={() => copyAccountNumber(accountsData.noAccount)}
              >
                <FiCopy />
              </button>
            </div>
          </div>
          <div className="balance-section">
            <div className="balance-header">
              <span>Saldo Disponible:</span>
              <button
                className="toggle-balance"
                onClick={() => toggleBalance("monetary")}
              >
                {showBalances.monetary ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <div className="balance-amount">
              {showBalances.monetary
                ? `Q ${accountsData.noAccountBalance.toLocaleString("es-GT", {
                    minimumFractionDigits: 2,
                  })}`
                : "Q ••••••"}
            </div>
          </div>

          <div className="movements-count">
            <span>Movimientos este mes: {accountsData.noAccountMovements}</span>
          </div>
        </div>
        <div className="account-card saving">
          <div className="account-header">
            <div className="account-type">
              <FiSave className="account-icon" />
              <div>
                <h3>Cuenta de Ahorros</h3>
                <p className="account-description">
                  Cuenta para ahorro con mejores rendimientos
                </p>
              </div>
            </div>
            {isFavorite(accountsData.savingAccount) && (
              <FiHeart className="favorite-icon filled" />
            )}
          </div>
          <div className="account-number">
            <span>No. de Cuenta:</span>
            <div className="number-container">
              <span className="number">{accountsData.savingAccount}</span>
              <button
                className="copy-btn"
                onClick={() => copyAccountNumber(accountsData.savingAccount)}
              >
                <FiCopy />
              </button>
            </div>
          </div>
          <div className="balance-section">
            <div className="balance-header">
              <span>Saldo Disponible:</span>
              <button
                className="toggle-balance"
                onClick={() => toggleBalance("saving")}
              >
                {showBalances.saving ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <div className="balance-amount">
              {showBalances.saving
                ? `Q ${accountsData.savingAccountBalance.toLocaleString(
                    "es-GT",
                    { minimumFractionDigits: 2 }
                  )}`
                : "Q ••••••"}
            </div>
          </div>
          <div className="movements-count">
            <span>
              Movimientos este mes: {accountsData.savingAccountMovements}
            </span>
          </div>
        </div>
        <div className="account-card foreign">
          <div className="account-header">
            <div className="account-type">
              <FiGlobe className="account-icon" />
              <div>
                <h3>Cuenta de Divisas</h3>
                <p className="account-description">
                  Cuenta para manejo de moneda extranjera
                </p>
              </div>
            </div>
            {isFavorite(accountsData.foreingCurrency) && (
              <FiHeart className="favorite-icon filled" />
            )}
          </div>

          <div className="account-number">
            <span>No. de Cuenta:</span>
            <div className="number-container">
              <span className="number">{accountsData.foreingCurrency}</span>
              <button
                className="copy-btn"
                onClick={() => copyAccountNumber(accountsData.foreingCurrency)}
              >
                <FiCopy />
              </button>
            </div>
          </div>

          <div className="balance-section">
            <div className="balance-header">
              <span>Saldo Disponible:</span>
              <button
                className="toggle-balance"
                onClick={() => toggleBalance("foreign")}
              >
                {showBalances.foreign ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
            <div className="balance-amount">
              {showBalances.foreign
                ? `$ ${accountsData.foreingCurrencyBalance.toLocaleString(
                    "en-US",
                    { minimumFractionDigits: 2 }
                  )}`
                : "$ ••••••"}
            </div>
          </div>

          <div className="movements-count">
            <span>
              Movimientos este mes: {accountsData.foreingCurrencyMovements}
            </span>
          </div>
        </div>
      </div>
      <div className="favorites-section">
        <h3>Cuentas Favoritas</h3>
        <div className="favorites-list">
          {accountsData.favoriteAccount.map((account, index) => (
            <div key={index} className="favorite-item">
              <FiHeart className="favorite-icon filled" />
              <span>{account}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BankAccounts;
