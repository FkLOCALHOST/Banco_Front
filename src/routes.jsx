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
import ViewAccountPage from "./pages/account/viewAccount.jsx";
import ServicesPage from "./pages/services/servicesPage.jsx";
import MoneyAccountsPage from "./pages/moneyAccounts/moneyAcountsPage.jsx";
import ServicesEducacion from "./pages/services/servicesEducacion";
import ServicesBasic from "./pages/services/servicesBasic";
import ServicesInstitutions from "./pages/services/servicesInstitutions";
import ServicesDonate from "./pages/services/servicesDonate";
import { MoneyAccounts } from "./components/moneyAccounts/MoneyAccounts.jsx";
import { FavoriteAccountsPage } from "./components/moneyAccounts/FavoriteAccountsPage.jsx";
import Register from "./components/auth/register.jsx";
import AdminOptionCards from "./components/admin/AdminOptionCards.jsx";
import GenerateAccount from "./components/admin/GenerateAccount.jsx";
import UsersTableAccount from "./components/admin/UsersTableAccount.jsx";
import UsersTable from "./components/admin/UsersTable.jsx";
import EditAcountAdmin from "./components/admin/dependencies/EditAcountAdmin.jsx";
import UsersTableTransaction from "./components/admin/UsersTableTransactions.jsx";
import TableOfTransactions from "./components/admin/dependencies/tableOfTransactions.jsx";
import EditTransaction from "./components/admin/dependencies/EditTransaction.jsx";
import ServiceFormPage from "./pages/services/serviceForm.jsx";
import ServiceFormEdit from "./components/services/serviceFormEdit.jsx";

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
    element: <Credito />,
  },
  {
    path: "/noti",
    element: <Notificaciones />,
  },
  {
    path: "/help",
    element: <PaginaAyuda />,
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
  {
    path: "/cuenta",
    element: (
      <CookieValidator>
        <ViewAccountPage />
      </CookieValidator>
    ),
  },
  {
    path: "/services",
    element: (
      <CookieValidator>
        <ServicesPage />
      </CookieValidator>
    ),
  },
  {
    path: "/services/educacion",
    element: (
      <CookieValidator>
        <ServicesEducacion />
      </CookieValidator>
    ),
  },
  {
    path: "/services/basicos",
    element: (
      <CookieValidator>
        <ServicesBasic />
      </CookieValidator>
    ),
  },
  {
    path: "/services/instituciones",
    element: (
      <CookieValidator>
        <ServicesInstitutions />
      </CookieValidator>
    ),
  },
  {
    path: "/services/donaciones",
    element: (
      <CookieValidator>
        <ServicesDonate />
      </CookieValidator>
    ),
  },
  {
    path: "/money-accounts",
    element: (
      <CookieValidator>
        <MoneyAccountsPage />
      </CookieValidator>
    ),
  },
  {
    path: "/my-accounts",
    element: (
      <CookieValidator>
        <MoneyAccounts />
      </CookieValidator>
    ),
  },
  {
    path: "/my-favorite-accounts",
    element: (
      <CookieValidator>
        <FavoriteAccountsPage />
      </CookieValidator>
    ),
  },
  {
    path: "/register",
    element: (
      <Register />
    ),
  },
  {
    path: "/admin-options",
    element: (
      <CookieValidator>
        <AdminOptionCards />
      </CookieValidator>
    ),
  },
  {
    path: "/admin/generate-wallet",
    element: (
      <CookieValidator>
        <GenerateAccount />
      </CookieValidator>
    ),
  },
  {
    path: "/admin/get-users",
    element: (
      <CookieValidator>
        <UsersTableAccount/>
      </CookieValidator>
    ),
  },
  {
    path: "/admin/get-users-info",
    element: (
      <CookieValidator>
        <UsersTable/>
      </CookieValidator>
    ),
  },
  {
    path: "/admin/edit-user/:id",
    element: (
      <CookieValidator>
        <EditAcountAdmin/>
      </CookieValidator>
    ),
  },
  {
    path: "/admin/user-transactions/",
    element: (
      <CookieValidator>
        <UsersTableTransaction/>
      </CookieValidator>
    ),
  },
  {
    path: "/admin/deposits/",
    element: (
      <CookieValidator>
        <TableOfTransactions/>
      </CookieValidator>
    ),
  },
  {
    path: "/admin/deposits/edit/:uid",
    element: (
      <CookieValidator>
        <EditTransaction/>
      </CookieValidator>
    ),
  },
  {
    path: "/service-form",
    element: (
      <CookieValidator>
        <ServiceFormPage />
      </CookieValidator>
    )
  },
  {
    path: "/service-form/edit/:id",
    element: (
      <CookieValidator>
        <ServiceFormEdit/>
      </CookieValidator>
    )
  }
];
