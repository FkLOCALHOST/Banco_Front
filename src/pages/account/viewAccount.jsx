import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sideBar";
import ViewAcount from "../../components/account/viewAcount";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/layout.css";

export default function ViewAccountPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main
          className="main-content"
          style={{
            padding: "2rem 0 0 2rem",
            background: "#F5F5F7",
            minHeight: "100vh",
          }}
        >
          <ViewAcount onEdit={() => navigate("/editar-cuenta")} />
        </main>
      </div>
    </>
  );
}