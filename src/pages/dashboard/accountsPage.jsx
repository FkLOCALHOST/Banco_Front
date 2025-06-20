import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import BankAccounts from "../../components/dashboard/bankAccounts.jsx";

const AccountsPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main style={{ marginLeft: "240px", width: "100%", padding: "0" }}>
          <BankAccounts />
        </main>
      </div>
    </>
  );
};

export default AccountsPage;
