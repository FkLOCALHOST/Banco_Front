import React from "react";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/sideBar.jsx";
import AccountCards from "../components/dashboard/accountCards.jsx";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <main style={{ marginLeft: "240px", width: "100%", padding: "0" }}>
          <AccountCards />
        </main>
      </div>
    </>
  );
}