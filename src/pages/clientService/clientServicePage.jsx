import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import ClientService from "../../components/clientService/clientService.jsx";

export default function ClientServicePage() {
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
          <ClientService />
        </div>
      </div>
    </>
  )
}