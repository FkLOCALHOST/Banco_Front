import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";
import CookieValidator from "./shared/validators/validateCookie.jsx";
import Credito from "./components/credit/credits.jsx";
import Notificaciones from "./components/notifications.jsx";
import PaginaAyuda from "./pages/help/helpPage.jsx";

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
  },
  {
    path: "/noti",
    element: <Notificaciones/>
  },
  {
    path: "/help",
    element: <PaginaAyuda />
  }

];
