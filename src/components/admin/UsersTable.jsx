import React, { useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGetAllUsers } from '../../shared/hooks/user/useGetAllUsers';
import "../../assets/styles/historyTable.css";
import Navbar from '../navbar';
import Sidebar from '../sideBar';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
    const { users, loading, error } = useGetAllUsers();
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
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

    const handleEdit = (userId) => {
        navigate(`/admin/edit-user/${userId}`);
    };

    if (loading) return <div className="history-container"><p>Cargando usuarios...</p></div>;
    if (error) return <div className="history-container"><p>Error al cargar usuarios: {error}</p></div>;

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="history-container" style={{ margin: "5% 15%" }}>
                <div className="history-header">
                    <h2>Datos Personales de Usuarios</h2>
                </div>
                <div className="history-table-container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>DPI</th>
                                <th>Dirección</th>
                                <th>Profesión</th>
                                <th>Ingresos Mensuales</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length === 0 ? (
                                <tr><td colSpan={10}>No hay usuarios disponibles.</td></tr>
                            ) : (
                                currentUsers.map((user) => (
                                    <tr key={user.uid}>
                                        <td>{user.name}</td>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.dpi || 'N/A'}</td>
                                        <td>{user.address || 'N/A'}</td>
                                        <td>{user.workName || 'N/A'}</td>
                                        <td>Q {user.monthEarnings?.toLocaleString() || '0.00'}</td>
                                        <td>{user.status ? "Activo" : "Inactivo"}</td>
                                        <td>
                                            <button onClick={() => handleEdit(user.uid)} style={{color:"white"}} className="edit-btn">
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))
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

export default UsersTable;
