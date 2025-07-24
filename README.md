# 💳 BancoGuate — Frontend

**BancoGuate** es una aplicación web desarrollada con **React.js** que permite a los usuarios realizar operaciones bancarias como transferencias entre monedas, pagos de servicios, y a los administradores visualizar estadísticas clave del sistema.

Este repositorio contiene exclusivamente el **frontend** del proyecto. Está diseñado para integrarse con una API backend que maneja la lógica de negocio y persistencia en **MongoDB**.

---

## ✨ Funcionalidades

### 🏦 Para Usuarios
- Transacciones entre diferentes monedas (GTQ, USD).
- Pagos de servicios (agua, luz, internet, teléfono).
- Autenticación y manejo de sesión mediante cookies.
- Historial de transacciones y facturas.

### 📊 Para Administradores
- Acceso a panel con estadísticas financieras.
- Visualización de gráficos interactivos.
- Filtros por tipo de transacción, fecha y usuario.

---

## 🛠️ Tecnologías Utilizadas

- **React.js** — Librería principal para la construcción de la interfaz.
- **CSS** — Estilos personalizados para una experiencia moderna.
- **Axios** — Cliente HTTP para comunicación con la API backend.
- **MongoDB** — Base de datos utilizada en el backend (consultada vía API).
- **Cookies** — Para manejo de sesiones y autenticación.
- **Vercel** — Infraestructura de despliegue del frontend.
- **Firebase** — Utilizado para notificaciones y almacenamiento de archivos (facturas, logs, etc).

---

## 📦 Instalación

1. **Clona el repositorio (para uso en local):**
   ```bash
   git clone https://github.com/FkLOCALHOST/Banco_Front.git
   npm i 
   npm run dev
2. **Para acceder al proyecto funcional:**
   ```bash
   https://bank-front-deploy.web.app/
