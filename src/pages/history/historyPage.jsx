import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import HistoryTable from "../../components/history/table.jsx";

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <HistoryTable />
        </div>
      </div>
    </>
  )
}