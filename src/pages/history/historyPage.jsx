import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import HistoryTable from "../../components/history/table.jsx";
import "../../assets/styles/layout.css";

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content main-content-padded">
          <HistoryTable />
        </main>
      </div>
    </>
  )
}