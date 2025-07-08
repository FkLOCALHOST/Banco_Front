import React, { useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGetAllUsers } from '../../shared/hooks/user/useGetAllUsers';
import "../../assets/styles/historyTable.css";
import Navbar from '../navbar';
import Sidebar from '../sideBar';

const UsersTableAccount = () => {
    const { users, loading, error } = useGetAllUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const sortedUsers = useMemo(() => {
        if (!Array.isArray(users)) return [];
        return [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [users]);

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    if (loading) return <div className="history-container"><p>Cargando usuarios...</p></div>;
    if (error) return <div className="history-container"><p>Error al cargar usuarios: {error}</p></div>;

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="history-container" style={{ margin: "5% 15%" }}>
                <div className="history-header">
                    <h2>Lista de Usuarios</h2>
                </div>
                <div className="history-table-container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>ID Wallet</th>
                                <th>No. Cuenta Corriente</th>
                                <th>Saldo Corriente</th>
                                <th>No. Cuenta Ahorro</th>
                                <th>Saldo Ahorro</th>
                                <th>No. Cuenta Dólares</th>
                                <th>Saldo Dólares</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length === 0 ? (
                                <tr><td colSpan={8}>No hay usuarios disponibles.</td></tr>
                            ) : (
                                currentUsers.map((user) => {
                                    const wallet = user.wallet;
                                    return (
                                        <tr key={user.uid}>
                                            <td>{user.name}</td>
                                            <td>{wallet?._id || 'Sin wallet'}</td>
                                            <td>{wallet?.noAccount || 'N/A'}</td>
                                            <td>Q {wallet?.noAccountBalance ?? 'N/A'}</td>
                                            <td>{wallet?.savingAccount || 'N/A'}</td>
                                            <td>Q {wallet?.savingAccountBalance ?? 'N/A'}</td>
                                            <td>{wallet?.foreingCurrency || 'N/A'}</td>
                                            <td>$ {wallet?.foreingCurrencyBalance ?? 'N/A'}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                {sortedUsers.length > 0 && totalPages > 1 && (
                    <div className="pagination-container">
                        <div className="pagination-info">
                            Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, sortedUsers.length)} de {sortedUsers.length} usuarios
                        </div>
                        <div className="pagination-controls">
                            <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-btn">
                                <FiChevronLeft /> Anterior
                            </button>
                            <div className="page-numbers">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`page-btn ${currentPage === page ? 'active' : ''}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-btn">
                                Siguiente <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UsersTableAccount;
