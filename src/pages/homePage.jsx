import React from 'react';
import Navbar from '../components/navbar.jsx';
import Sidebar from '../components/sideBar.jsx';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', marginTop: '64px' }}>
        <Sidebar />
        <main style={{ marginLeft: '240px', padding: '2rem', width: '100%' }}>
          <h1>Bienvenido al panel principal</h1>
          {/* Tu contenido aquí */}
        </main>
      </div>
    </>
  );
}