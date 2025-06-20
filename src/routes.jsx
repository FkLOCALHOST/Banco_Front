import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";
import AccountsPage from "./pages/dashboard/accountsPage.jsx";
import CookieValidator from "./shared/validators/validateCookie.jsx";

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
    path: "/accounts",
    element: (
      <CookieValidator>
        <AccountsPage />
      </CookieValidator>
    ),
  },
];
