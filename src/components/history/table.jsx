import React, { useState, useMemo, useEffect } from 'react';
import { FiArrowUpRight, FiArrowDownLeft, FiChevronLeft, FiChevronRight, FiRotateCcw } from 'react-icons/fi';
import "../../assets/styles/historyTable.css"
import { useHistoryOfTransactions } from "../../shared/hooks/transfer/useHistoryOfTransactions";
import useRevertTransaction from "../../shared/hooks/transfer/useRevertTransaction";

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
  const { history, loading, error, refetch } = useHistoryOfTransactions(uid);
  const [currentPage, setCurrentPage] = useState(1);
  const [revertedTransactions, setRevertedTransactions] = useState(new Set());
  const [hasRefetched, setHasRefetched] = useState(false);
  const [showRevertModal, setShowRevertModal] = useState(false);
  const [transactionToRevert, setTransactionToRevert] = useState(null);
  const itemsPerPage = 10;
  const { revert, loading: revertLoading, error: revertError, success: revertSuccess } = useRevertTransaction();

  useEffect(() => {
    if (revertSuccess && !hasRefetched) {
      setHasRefetched(true);
      const timer = setTimeout(() => {
        if (refetch) {
          refetch();
          setTimeout(() => {
            setRevertedTransactions(new Set());
            setHasRefetched(false);
          }, 500);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [revertSuccess, refetch, hasRefetched]);

  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history]);

  const totalPages = Math.ceil(sortedHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = useMemo(() => {
    return sortedHistory.slice(startIndex, endIndex);
  }, [sortedHistory, startIndex, endIndex]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRevert = async (transactionId) => {
    setTransactionToRevert(transactionId);
    setShowRevertModal(true);
  };

  const confirmRevert = async () => {
    if (transactionToRevert) {
      const success = await revert(transactionToRevert);
      if (success) {
        setRevertedTransactions(prev => new Set(prev).add(transactionToRevert));
      }
    }
    setShowRevertModal(false);
    setTransactionToRevert(null);
  };

  const cancelRevert = () => {
    setShowRevertModal(false);
    setTransactionToRevert(null);
  };

  const canRevertTransaction = (transaction) => {
    const transactionId = transaction.id || transaction.uid || transaction._id;

    if (revertedTransactions.has(transactionId)) {
      return false;
    }

    if (transaction.status === 'FINALLY' || transaction.status === 'REVERTED') {
      return false;
    }

    if (transaction.type !== 'send') {
      return false;
    }

    return true;
  };

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

      {revertError && (
        <div className="error-message" style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '6px',
          color: '#721c24'
        }}>
          {revertError}
        </div>
      )}

      {revertSuccess && (
        <div className="success-message" style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '6px',
          color: '#155724'
        }}>
          {revertSuccess}
        </div>
      )}

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Cuenta</th>
              <th>Fecha y Hora</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={6}>No hay transacciones.</td>
              </tr>
            ) : (
              currentTransactions.map((transaction) => {
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
                    <td>
                      {canRevertTransaction(transaction) && (
                        <button
                          className="revert-btn-small"
                          onClick={() => handleRevert(transaction.id || transaction.uid || transaction._id)}
                          disabled={revertLoading}
                          title="Revertir transacción"
                        >
                          <FiRotateCcw />
                          <span>{revertLoading ? 'Revirtiendo...' : 'Revertir'}</span>
                        </button>
                      )}
                      {(transaction.status === 'REVERTED' || revertedTransactions.has(transaction.id || transaction.uid || transaction._id)) && (
                        <span className="reverted-status">
                          Revertida
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {sortedHistory.length > 0 && totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            <span>
              Mostrando {startIndex + 1} - {Math.min(endIndex, sortedHistory.length)} de {sortedHistory.length} transacciones
            </span>
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
              Anterior
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="pagination-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {showRevertModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirmar Reversión</h3>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de revertir la transacción?</p>
              <p className="modal-warning">Esta acción no se puede deshacer.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn cancel-btn" 
                onClick={cancelRevert}
                disabled={revertLoading}
              >
                Cancelar
              </button>
              <button 
                className="modal-btn confirm-btn" 
                onClick={confirmRevert}
                disabled={revertLoading}
              >
                {revertLoading ? 'Revirtiendo...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryTable;
