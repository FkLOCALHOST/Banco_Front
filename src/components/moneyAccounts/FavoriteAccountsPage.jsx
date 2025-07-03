import React, { useEffect, useMemo, useState } from 'react';
import useCurrentUser from '../../shared/hooks/auth/useNameUser.jsx';
import { useGetAccounts } from '../../shared/hooks/accounts/useGetAccounts.jsx';
import Navbar from '../navbar.jsx';
import Sidebar from '../sideBar.jsx';
import '../../assets/styles/AccountsPage.css';

export const FavoriteAccountsPage = () => {
    const user = useCurrentUser();
    const uid = useMemo(() => user?.id || null, [user]);
    const { accounts, loading, error } = useGetAccounts(uid);
    const [favoriteCards, setFavoriteCards] = useState([]);

    useEffect(() => {
        if (!accounts || !accounts.favoriteAccount || accounts.favoriteAccount.length === 0) {
            setFavoriteCards([]);
            return;
        }

        const favoriteMap = {
            [accounts.noAccount]: {
                label: 'Cuenta Corriente',
                number: accounts.noAccount,
                balance: accounts.noAccountBalance,
                moves: accounts.noAccountMovements,
                type: 'normal'
            },
            [accounts.savingAccount]: {
                label: 'Cuenta de Ahorros',
                number: accounts.savingAccount,
                balance: accounts.savingAccountBalance,
                moves: accounts.savingAccountMovements,
                type: 'savings'
            },
            [accounts.foreingCurrency]: {
                label: 'Cuenta en Dólares',
                number: accounts.foreingCurrency,
                balance: accounts.foreingCurrencyBalance,
                moves: accounts.foreingCurrencyMovements,
                type: 'dollars'
            }
        };

        const cards = accounts.favoriteAccount
            .map(accountNumber => favoriteMap[accountNumber])
            .filter(Boolean);

        setFavoriteCards(cards);
    }, [accounts]);

    if (!uid) return <div className="loading-text">Usuario no autenticado</div>;
    if (loading) return <div className="loading-text">Cargando cuentas favoritas...</div>;
    if (error) return <div className="error-text">Error: {error}</div>;
    if (!accounts) return <div className="empty-text">No se pudieron cargar las cuentas.</div>;
    if (favoriteCards.length === 0) return (
        <>
            <Navbar />
            <div style={{ display: 'flex', marginTop: '64px' }}>
                <Sidebar />
                <main
                    style={{
                        marginLeft: '240px',
                        width: '100%',
                        padding: '2rem 0 0 2rem',
                        background: '#F5F5F7',
                        minHeight: '100vh'
                    }}
                    className="main-content"
                >
                    <div className="accounts-container">
                        <h1 className="accounts-title">Cuentas Favoritas</h1>
                        <div className="empty-text">No tienes cuentas favoritas aún. Agrega tus cuentas favoritas desde la página principal.</div>
                    </div>
                </main>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', marginTop: '64px' }}>
                <Sidebar />
                <main
                    style={{
                        marginLeft: '240px',
                        width: '100%',
                        padding: '2rem 0 0 2rem',
                        background: '#F5F5F7',
                        minHeight: '100vh'
                    }}
                    className="main-content"
                >
                    <div className="accounts-container">
                        <h1 className="accounts-title">Cuentas Favoritas</h1>
                        <div className="accounts-grid">
                            {favoriteCards.map(({ label, number, balance, moves, type }) => (
                                <div className="account-card" key={number}>
                                    <div className="account-card-header">
                                        <h2 className="account-type">{label}</h2>
                                    </div>
                                    <div className="account-card-body">
                                        <div className="account-info-section">
                                            <p className="account-label">No. de Cuenta:</p>
                                            <p className={`account-number ${type}`}>{number}</p>
                                        </div>
                                        <div className={`account-balance ${type === 'dollars' ? 'dollars' : ''}`}>
                                            {balance || '0.00'}
                                        </div>
                                    </div>
                                    <div className="account-card-footer">
                                        <p className="account-mov">Movimientos: {moves || 0}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
