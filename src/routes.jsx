import AuthPage from "./pages/auth/authPage.jsx";
import HomePage from "./pages/homePage.jsx";
import HistoryPage from "./pages/history/historyPage.jsx";
import TransferPage from "./pages/transfer/transferPage.jsx";
import ClientServicePage from "./pages/clientService/clientServicePage.jsx";
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
    path: "/history",
    element: (
      <CookieValidator>
        <HistoryPage />
      </CookieValidator>

    )
  },
  {
    path: "/transfer",
    element: (
      <CookieValidator>
        <TransferPage />
      </CookieValidator>

    )
  },
  {
    path: "/clientService",
    element: <ClientServicePage/>
  }
    path: "/accounts",
    element: (
      <CookieValidator>
        <AccountsPage />
      </CookieValidator>
    ),
  },
];
