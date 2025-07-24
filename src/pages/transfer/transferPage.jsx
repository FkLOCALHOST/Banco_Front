import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import Transfer from "../../components/transfer/transfer.jsx";
import "../../assets/styles/layout.css";

export default function TransferPage() {
    return (
        <>
          <Navbar />
          <div className="layout-container">
            <Sidebar />
            <main className="main-content main-content-padded">
              <Transfer />
            </main>
          </div>
        </>
  );
}
