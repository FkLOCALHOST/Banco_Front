import React from 'react';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import "../../assets/styles/historyTable.css"
import useHistory from "../../shared/hooks/history/useHistory";

const HistoryTable = () => {
  const { history, loading, error } = useHistory();

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
              history.map((transactionId) => (
                <tr key={transactionId}>
                  <td>
                    {/* No hay info de tipo, solo ID */}
                    <span className="transaction-type send">
                      <FiArrowUpRight /> Enviado
                    </span>
                  </td>
                  <td className="amount-send">
                    {/* Sin monto, solo ID */}
                    Q -
                  </td>
                  <td>{transactionId}</td>
                  <td>
                    {/* Sin fecha */}
                    -
                  </td>
                  <td>
                    {/* Sin descripción */}
                    -
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryTable;