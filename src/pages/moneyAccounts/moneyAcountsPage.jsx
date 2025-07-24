import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import { FiCreditCard, FiHeart } from "react-icons/fi";
import "../../assets/styles/accountCards.css";
import "../../assets/styles/layout.css";
import { useNavigate } from "react-router-dom";

const MoneyAccountsPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main
          className="main-content"
          style={{
            padding: "2rem 0 0 2rem",
            background: "#F5F5F7",
            minHeight: "100vh"
          }}
        >
          <h2
            className="account-title"
            style={{ marginBottom: "2rem" }}
          >
            Cuentas de Dinero
          </h2>
          <div className="cards-grid">
            <div className="account-card info" onClick={() => { navigate("/my-accounts") }}>
              <div className="card-icon">
                <FiCreditCard />
              </div>
              <h3 className="card-title">Mis cuentas</h3>
            </div>
            <div className="account-card favorites" onClick={() => { navigate("/my-favorite-accounts") }}>
              <div className="card-icon">
                <FiHeart />
              </div>
              <h3 className="card-title">Cuentas favoritas</h3>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MoneyAccountsPage;
