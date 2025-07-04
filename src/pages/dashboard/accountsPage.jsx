import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import BankAccounts from "../../components/dashboard/bankAccounts.jsx";
import "../../assets/styles/layout.css";

const AccountsPage = () => {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content main-content-fullwidth">
          <BankAccounts />
        </main>
      </div>
    </>
  );
};

export default AccountsPage;
