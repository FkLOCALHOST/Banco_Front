import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";
import CookieValidator from "./shared/validators/validateCookie.jsx";
import Credito from "./components/credit/credits.jsx";

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
    path: "/credit",
    element: <Credito/>
  }
];
