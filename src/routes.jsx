import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";
import HistoryPage from "./pages/history/historyPage.jsx";
import TransferPage from "./pages/transfer/transferPage.jsx";
import ClientServicePage from "./pages/clientService/clientServicePage.jsx";
import AccountsPage from "./pages/dashboard/accountsPage.jsx";
import CookieValidator from "./shared/validators/validateCookie.jsx";
import Credito from "./components/credit/credits.jsx";
import Notificaciones from "./components/notifications.jsx";
import PaginaAyuda from "./pages/help/helpPage.jsx";
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
  },
{
    path: "/editar-cuenta",
    element: (
      <CookieValidator>
        <EditAccountPage />
      </CookieValidator>
    ),
  },
  {
    path: "/history",
    element: (
      <CookieValidator>
        <HistoryPage />
      </CookieValidator>
    ),
  },
  {
    path: "/transfer",
    element: (
      <CookieValidator>
        <TransferPage />
      </CookieValidator>
    ),
  },
  {
    path: "/clientService",
    element: <ClientServicePage />,
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
