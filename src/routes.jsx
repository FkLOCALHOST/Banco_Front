import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";
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
];
