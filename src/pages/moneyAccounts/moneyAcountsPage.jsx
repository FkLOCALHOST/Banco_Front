import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import { FiCreditCard, FiHeart } from "react-icons/fi";
import "../../assets/styles/accountCards.css";

const MoneyAccountsPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main
          style={{
            marginLeft: "240px",
            width: "100%",
            padding: "2rem 0 0 2rem",
            background: "#F5F5F7",
            minHeight: "100vh",
          }}
        >
          <h2
            className="account-title"
            style={{ marginBottom: "2rem" }}
          >
            Cuentas de Dinero
          </h2>
          <div className="cards-grid">
            <div className="account-card info">
              <div className="card-icon">
                <FiCreditCard />
              </div>
              <h3 className="card-title">Mis cuentas</h3>
            </div>
            <div className="account-card favorites">
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
