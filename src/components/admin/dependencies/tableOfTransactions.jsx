import React, { useState, useMemo, useEffect } from 'react';
import { FiArrowUpRight, FiArrowDownLeft, FiChevronLeft, FiChevronRight, FiRotateCcw, FiSearch, FiEdit3 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import "../../../assets/styles/historyTable.css"
import { useHistoryOfTransactions } from "../../../shared/hooks/transfer/useHistoryOfTransactions";
import useRevertTransaction from "../../../shared/hooks/transfer/useRevertTransaction";
import Navbar from "../../navbar";
import Sidebar from "../../sideBar";

const TableOfTransactions = () => {
  const navigate = useNavigate();
  const [searchUid, setSearchUid] = useState('');
  const [activeUid, setActiveUid] = useState(null);
  const { history, loading, error, refetch } = useHistoryOfTransactions(activeUid);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchUid.trim()) {
      setActiveUid(searchUid.trim());
      setCurrentPage(1); // Reset pagination when searching
    }
  };

  const handleClearSearch = () => {
    setSearchUid('');
    setActiveUid(null);
    setCurrentPage(1);
  };

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

  const handleEdit = (transactionId) => {
    navigate(`/admin/deposits/edit/${transactionId}`);
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
    <>
      <Navbar />
      <div style={{ display: 'flex', marginTop: '64px' }}>
        <Sidebar />
        <div className="history-container" style={{ marginLeft: '240px', width: '100%', padding: '2rem' }}>
          <div className="history-header">
            <h2>Historial de Transacciones de Usuario</h2>

        {/* Barra de búsqueda */}
        <div className="search-container" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1', maxWidth: '300px' }}>
              <FiSearch
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }}
              />
              <input
                type="text"
                placeholder="Ingresa el UID del usuario..."
                value={searchUid}
                onChange={(e) => setSearchUid(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.5rem 0.5rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!searchUid.trim() || loading}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: searchUid.trim() ? '#1976d2' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: searchUid.trim() ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem'
              }}
            >
              Buscar
            </button>
            {activeUid && (
              <button
                type="button"
                onClick={handleClearSearch}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Limpiar
              </button>
            )}
          </form>

          {activeUid && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#e0f2fe',
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#0277bd'
            }}>
              Mostrando transacciones del usuario: <strong>{activeUid}</strong>
            </div>
          )}

          {!activeUid && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#6b7280'
            }}>
              Introduce un UID de usuario para ver sus transacciones
            </div>
          )}
        </div>
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
              <th>Editar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {!activeUid ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  Por favor, introduce un UID de usuario para ver sus transacciones
                </td>
              </tr>
            ) : currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  {loading ? 'Cargando transacciones...' : 'No hay transacciones para este usuario.'}
                </td>
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
                      <button
                        className="edit-btn-small"
                        onClick={() => handleEdit(transaction.id || transaction.uid || transaction._id)}
                        title="Editar transacción"
                        style={{
                          backgroundColor: '#4BB543',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.4rem 0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.8rem',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#45a040'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#4BB543'}
                      >
                        <FiEdit3 />
                        <span>Editar</span>
                      </button>
                    </td>
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
      {activeUid && sortedHistory.length > 0 && totalPages > 1 && (
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
      </div>
    </>
  );
}

export default TableOfTransactions;
