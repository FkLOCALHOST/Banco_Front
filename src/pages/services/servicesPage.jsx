import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import ServicesCards from "../../components/services/services.jsx";
import "../../assets/styles/layout.css";

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content main-content-fullwidth">
          <ServicesCards />
        </main>
      </div>
    </>
  );
};

export default ServicesPage;
