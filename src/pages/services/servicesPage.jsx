import Navbar from "../../components/navbar.jsx";
import Sidebar from "../../components/sideBar.jsx";
import ServicesCards from "../../components/services/services.jsx";

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <main style={{ marginLeft: "240px", width: "100%", padding: "0" }}>
        <ServicesCards />
      </main>
      <Sidebar />
    </>
  );
};

export default ServicesPage;
