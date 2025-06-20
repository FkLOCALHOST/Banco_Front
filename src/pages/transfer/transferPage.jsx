import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import Transfer from "../../components/transfer/transfer.jsx";

export default function TransferPage() {
    return (
        <>
          <Navbar />
          <div style={{ display: "flex", marginTop: "64px" }}>
            <Sidebar />
            <div style={{ 
          flex: 1, 
          marginLeft: "250px",
          padding: "20px",
          minHeight: "calc(100vh - 64px)"
        }}>
          <Transfer />
        </div>
          </div>
        </>
  );
}
