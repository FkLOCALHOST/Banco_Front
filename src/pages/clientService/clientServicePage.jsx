import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";

export default function ClientServicePage() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
      </div>
    </>
  );
}
