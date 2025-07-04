import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sideBar";
import EditAcount from "../../components/account/editAcount";
import "../../assets/styles/layout.css";

export default function EditAccountPage() {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content" style={{ padding: "2rem 0 0 2rem", background: "#F5F5F7", minHeight: "100vh" }}>
          <EditAcount />
        </main>
      </div>
    </>
  );
}