import React from "react";
import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import ServiceForm from "../../components/services/serviceForm.jsx"


export default function ServiceFormPage(){
    return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
            <ServiceForm />
        </main>
      </div>
    </>
  )
}
