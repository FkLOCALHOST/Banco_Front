import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import ClientService from "../../components/clientService/clientService.jsx";
import "../../assets/styles/layout.css";

export default function ClientServicePage() {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          <ClientService />
        </main>
      </div>
    </>
  )
}