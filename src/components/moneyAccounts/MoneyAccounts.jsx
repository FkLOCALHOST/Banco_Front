import React from 'react';
import { useGetAccounts } from '../../shared/hooks/accounts/useGetAccounts';
import useCurrentUser from '../../shared/hooks/auth/useNameUser';
import useMyFavAccounts from '../../shared/hooks/accounts/useMyFavAccounts.jsx';
import { FiHeart } from 'react-icons/fi';
import Navbar from '../navbar.jsx';
import Sidebar from '../sideBar.jsx';
import "../../assets/styles/AccountsPage.css";

export const MoneyAccounts = () => {
    const user = useCurrentUser();
    const uid = React.useMemo(() => user?.id || null, [user]);
    const { accounts, loading, error } = useGetAccounts(uid);
    const { addFavorite, loading: favLoading } = useMyFavAccounts();

    const [favorites, setFavorites] = React.useState({
        normal: false,
        savings: false,
        dollars: false,
    });

    const isAccountFavorite = (accountNumber, favoriteList) =>
        favoriteList.includes(accountNumber);

    React.useEffect(() => {
        if (accounts && accounts.favoriteAccount) {
            setFavorites({
                normal: isAccountFavorite(accounts.noAccount, accounts.favoriteAccount),
                savings: isAccountFavorite(accounts.savingAccount, accounts.favoriteAccount),
                dollars: isAccountFavorite(accounts.foreingCurrency, accounts.favoriteAccount),
            });
        }
    }, [accounts]);

    const toggleFavorite = async (accountType) => {
        const typeMap = {
            normal: "noAccount",
            savings: "savingAccount",
            dollars: "foreingCurrency",
        };

        const typeAccount = typeMap[accountType];

        setFavorites((prev) => ({
            ...prev,
            [accountType]: !prev[accountType],
        }));

        const response = await addFavorite(accounts._id, { typeAccount });

        if (!response || !response.accountFav) {
            setFavorites((prev) => ({
                ...prev,
                [accountType]: !prev[accountType],
            }));
        } else {
            const updatedFavs = response.accountFav.favoriteAccount;
            setFavorites({
                normal: isAccountFavorite(accounts.noAccount, updatedFavs),
                savings: isAccountFavorite(accounts.savingAccount, updatedFavs),
                dollars: isAccountFavorite(accounts.foreingCurrency, updatedFavs),
            });
        }
    };

    if (!uid) return <div>Usuario no autenticado</div>;
    if (loading) return <div>Cargando cuentas...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!accounts) return <div>No se encontraron cuentas.</div>;

    return (
        <>
            <Navbar />
            <div style={{ display: "flex", marginTop: "64px" }}>
                <Sidebar />
                <main style={{
                    marginLeft: "240px",
                    width: "100%",
                    padding: "2rem 0 0 2rem",
                    background: "#F5F5F7",
                    minHeight: "100vh"
                }}>
                    <div className="accounts-container">
                        <h1 className="accounts-title">Tus Cuentas</h1>
                        <div className="accounts-grid">
                            {[
                                {
                                    label: "Cuenta Corriente",
                                    type: "normal",
                                    number: accounts.noAccount,
                                    balance: accounts.noAccountBalance,
                                    moves: accounts.noAccountMovements,
                                },
                                {
                                    label: "Cuenta de Ahorros",
                                    type: "savings",
                                    number: accounts.savingAccount,
                                    balance: accounts.savingAccountBalance,
                                    moves: accounts.savingAccountMovements,
                                },
                                {
                                    label: "Cuenta en Dólares",
                                    type: "dollars",
                                    number: accounts.foreingCurrency,
                                    balance: accounts.foreingCurrencyBalance,
                                    moves: accounts.foreingCurrencyMovements,
                                },
                            ].map(({ label, type, number, balance, moves }) => (
                                <div className="account-card" key={type}>
                                    <div className="account-card-header">
                                        <h2 className="account-type">{label}</h2>
                                    </div>
                                    <div className="account-card-body">
                                        <div className="account-info-section">
                                            <p className="account-label">No. de Cuenta:</p>
                                            <p className={`account-number ${type}`}>{number}</p>
                                        </div>
                                        <div className={`account-balance ${type}`}>
                                            {balance || '0.00'}
                                        </div>
                                    </div>
                                    <div className="account-card-footer">
                                        <p className="account-mov">Movimientos: {moves}</p>
                                        <button
                                            className={`favorite-btn ${favorites[type] ? 'active' : ''}`}
                                            onClick={() => toggleFavorite(type)}
                                            title="Agregar/Quitar favorita"
                                            disabled={favLoading}
                                        >
                                            <FiHeart className="favorite-icon" />
                                        </button>
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
