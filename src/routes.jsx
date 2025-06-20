import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";
import CookieValidator from "./shared/validators/validateCookie.jsx";
import EditAccountPage from "./pages/account/editAccount.jsx";

export const routes = [
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/home",
    element: (
      <CookieValidator>
        <HomePage />
      </CookieValidator>
    ),
  },
  {
    path: "/editar-cuenta",
    element: (
      <CookieValidator>
        <EditAccountPage />
      </CookieValidator>
    ),
  },
];
