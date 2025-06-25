import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sideBar";
import ViewAcount from "../../components/account/viewAcount";
import { useNavigate } from "react-router-dom";

export default function ViewAccountPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main
          style={{
            marginLeft: "240px",
            width: "100%",
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