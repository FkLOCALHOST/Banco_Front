import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";

export const routes = [
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
];
