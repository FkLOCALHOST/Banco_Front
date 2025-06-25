import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sideBar";
import EditAcount from "../../components/account/editAcount";

export default function EditAccountPage() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main style={{ marginLeft: "240px", width: "100%", padding: "2rem 0 0 2rem", background: "#F5F5F7", minHeight: "100vh" }}>
          <EditAcount />
        </main>
      </div>
    </>
  );
}