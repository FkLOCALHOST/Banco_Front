import React from 'react';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import "../../assets/styles/historyTable.css"
import { useHistoryOfTransactions } from "../../shared/hooks/transfer/useHistoryOfTransactions";

function getUidFromCookie() {
  const userCookie = document.cookie.match(/(^| )User=([^;]+)/);
  if (!userCookie) {
    return null;
  }
  try {
    const user = JSON.parse(decodeURIComponent(userCookie[2]));
    return user.uid || user.id || user.userDetails?.uid || null;
  } catch {
    return null;
  }
}

const HistoryTable = () => {
  const uid = getUidFromCookie();
  const { history, loading, error } = useHistoryOfTransactions(uid);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(amount);
  };

  const getAccountInfo = (transaction) => {
    if (transaction.type === 'send') {
      return `Hacia: ${transaction.receiver}`;
    } else if (transaction.type === 'receive') {
      return `De: ${transaction.sender}`;
    }
    return 'N/A';
  };

  if (loading) {
    return <div className="history-container"><p>Cargando historial...</p></div>;
  }
  if (error) {
    return <div className="history-container"><p>Error: {error}</p></div>;
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Historial de Transacciones</h2>
      </div>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Cuenta</th>
              <th>Fecha y Hora</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={5}>No hay transacciones.</td>
              </tr>
            ) : (
              history.map((transaction) => {
                const isNegative = transaction.type === 'send';
                
                return (
                  <tr key={transaction.id}>
                    <td>
                      <span className={`transaction-type ${transaction.type}`}>
                        {transaction.type === 'send' ? (
                          <><FiArrowUpRight /> Enviado</>
                        ) : (
                          <><FiArrowDownLeft /> Recibido</>
                        )}
                      </span>
                    </td>
                    <td className={isNegative ? 'amount-send' : 'amount-receive'}>
                      {isNegative ? '-' : '+'}{formatAmount(transaction.amount)}
                    </td>
                    <td>{getAccountInfo(transaction)}</td>
                    <td>{formatDate(transaction.date)}</td>
                    <td>{transaction.description}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryTable;