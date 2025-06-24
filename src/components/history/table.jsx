import React from 'react';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import "../../assets/styles/historyTable.css"

const HistoryTable = () => {

    //Datos de prueba
  const transactions = [
    {
      id: 1,
      type: 'send',
      amount: 500.00,
      account: '****7890',
      date: '15/06/2023',
      time: '10:30 AM',
      description: 'Transferencia a cuenta personal'
    },
    {
      id: 2,
      type: 'receive',
      amount: 1200.00,
      account: '****4567',
      date: '14/06/2023',
      time: '02:15 PM',
      description: 'Depósito de nómina'
    }
  ]

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
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>
                  {transaction.type === 'send' ? (
                    <span className="transaction-type send">
                      <FiArrowUpRight /> Enviado
                    </span>
                  ) : (
                    <span className="transaction-type receive">
                      <FiArrowDownLeft /> Recibido
                    </span>
                  )}
                </td>
                <td className={transaction.type === 'send' ? 'amount-send' : 'amount-receive'}>
                  {transaction.type === 'send' ? '-' : '+'} Q{transaction.amount.toFixed(2)}
                </td>
                <td>{transaction.account}</td>
                <td>
                  {transaction.date} <span className="time">{transaction.time}</span>
                </td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HistoryTable;