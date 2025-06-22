import React from "react";
import {
  FiDollarSign,FiSave,FiGlobe,FiHeart,FiEye,FiEyeOff,FiCopy,FiPlus,FiSend,FiTrash2,
} from "react-icons/fi";
import "../../assets/styles/bankAccounts.css";

const BankAccounts = () => {
  // Datos de prueba 
  const accountsData = {
    accounts: [
      {
        id: 1,
        number: 1234567890,
        type: "monetary",
        name: "Cuenta monetaria",
        description: "Cuenta principal para movimientos diarios",
        balance: 15750.5,
        currency: "GTQ",
        currencySymbol: "Q",
        icon: FiDollarSign,
      },
      {
        id: 2,
        number: 3456789012,
        type: "saving",
        name: "Cuenta de Ahorros",
        description: "Cuenta para ahorro con mejores rendimientos",
        balance: 8500.75,
        currency: "GTQ",
        currencySymbol: "Q",
        icon: FiSave,
      },
      {
        id: 3,
        number: 4567890123,
        type: "foreign",
        name: "Cuenta de Divisas",
        description: "Cuenta para manejo de moneda extranjera",
        balance: 2350.25,
        currency: "USD",
        currencySymbol: "$",
        icon: FiGlobe,
      },
    ],
    favoriteAccounts: [
      {
        id: 1,
        accountNumber: 1234567890,
        accountType: "monetary",
        alias: "Mi Cuenta Principal",
        isOwn: true, // Si es cuenta propia o de terceros
      },
      {
        id: 2,
        accountNumber: 3456789012,
        accountType: "saving",
        alias: "Ahorros Vacaciones",
        isOwn: true,
      },
    ],
  };  // Estados para la UI
  const [showBalances, setShowBalances] = React.useState({
    monetary: true,
    saving: true,
    foreign: true,
  });

  // Estado para modal de agregar
  // const [showAddFavoriteModal, setShowAddFavoriteModal] = React.useState(false);

  // Funciones para manejo de balances
  const toggleBalance = (accountType) => {
    setShowBalances((prev) => ({
      ...prev,
      [accountType]: !prev[accountType],
    }));
  };

  // Función para copiar número de cuenta
  const copyAccountNumber = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber.toString());
    // Aquí se podría agregar una notificación de éxito
  };

  // Función para verificar si una cuenta es favorita
  const isFavorite = (accountNumber) => {
    return accountsData.favoriteAccounts.some(
      (fav) => fav.accountNumber === accountNumber
    );
  };

  // Funciones placeholder para futuras funcionalidades
  const handleAddFavorite = () => {
    // setShowAddFavoriteModal(true);
    console.log("Abrir modal para agregar favorito");
  };
  const handleQuickTransfer = (favoriteAccount) => {
    // Función para transferencia rápida 
    console.log("Transferir a:", favoriteAccount);
  };

  const handleDeleteFavorite = (favoriteId) => {
    // Función para eliminar favorito
    console.log("Eliminar favorito:", favoriteId);
  };

  return (
    <div className="bank-accounts-container">
      <div className="accounts-header">
        <h2 className="accounts-title">Mis Cuentas Bancarias</h2>
        <p className="accounts-subtitle">
          Gestiona tus cuentas y consulta tus saldos
        </p>
      </div>      <div className="accounts-grid">
        {accountsData.accounts.map((account) => {
          const IconComponent = account.icon;
          return (
            <div key={account.id} className={`account-card ${account.type}`}>
              <div className="account-header">
                <div className="account-type">
                  <IconComponent className="account-icon" />
                  <div>
                    <h3>{account.name}</h3>
                    <p className="account-description">{account.description}</p>
                  </div>
                </div>
                {isFavorite(account.number) && (
                  <FiHeart className="favorite-icon filled" />
                )}
              </div>
              <div className="account-number">
                <span>No. de Cuenta:</span>
                <div className="number-container">
                  <span className="number">{account.number}</span>
                  <button
                    className="copy-btn"
                    onClick={() => copyAccountNumber(account.number)}
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
                    onClick={() => toggleBalance(account.type)}
                  >
                    {showBalances[account.type] ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
                <div className="balance-amount">
                  {showBalances[account.type]
                    ? `${account.currencySymbol} ${account.balance.toLocaleString(
                        account.currency === "USD" ? "en-US" : "es-GT",
                        { minimumFractionDigits: 2 }
                      )}`
                    : `${account.currencySymbol} ••••••`}
                </div>
              </div>
            </div>
          );
        })}
      </div>      <div className="favorites-section">
        <div className="favorites-header">
          <h3>Cuentas Favoritas</h3>
          <button className="add-favorite-btn" onClick={handleAddFavorite}>
            <FiPlus />
            <span>Agregar Favorito</span>
          </button>
        </div>
        
        <div className="favorites-grid">
          {accountsData.favoriteAccounts.map((favorite) => (
            <div key={favorite.id} className="favorite-card">
              <div className="favorite-header">
                <div className="favorite-info">
                  <div className="favorite-alias">
                    <h4>{favorite.alias}</h4>
                    <span className="account-type-badge">
                      {favorite.isOwn ? "Cuenta Propia" : "Cuenta Externa"}
                    </span>
                  </div>                  <div className="favorite-actions">
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteFavorite(favorite.id)}
                      title="Eliminar favorito"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="favorite-account-info">
                <div className="account-number-info">
                  <span className="label">No. de Cuenta:</span>
                  <div className="number-container">
                    <span className="number">{favorite.accountNumber}</span>
                    <button
                      className="copy-btn"
                      onClick={() => copyAccountNumber(favorite.accountNumber)}
                      title="Copiar número de cuenta"
                    >
                      <FiCopy />
                    </button>
                  </div>
                </div>
                
                <div className="account-type-info">
                  <span className="label">Tipo:</span>
                  <span className="type-value">
                    {favorite.accountType === "monetary" && "Cuenta Monetaria"}
                    {favorite.accountType === "saving" && "Cuenta de Ahorros"}
                    {favorite.accountType === "foreign" && "Cuenta de Divisas"}
                    {favorite.accountType === "external" && "Cuenta Externa"}
                  </span>
                </div>
              </div>
              
              <div className="favorite-actions-bottom">
                <button 
                  className="quick-transfer-btn"
                  onClick={() => handleQuickTransfer(favorite)}
                >
                  <FiSend />
                  <span>Transferir</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {accountsData.favoriteAccounts.length === 0 && (
          <div className="empty-favorites">
            <FiHeart className="empty-icon" />
            <h4>No tienes cuentas favoritas</h4>
            <p>Agrega cuentas frecuentes para acceso rápido y transferencias</p>
            <button className="add-first-favorite" onClick={handleAddFavorite}>
              <FiPlus />
              <span>Agregar Primera Cuenta</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankAccounts;
