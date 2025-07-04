import React from "react";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/sideBar.jsx";
import AccountCards from "../components/dashboard/accountCards.jsx";
import "../assets/styles/layout.css";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content main-content-fullwidth">
          <AccountCards />
        </main>
      </div>
    </>
  );
}