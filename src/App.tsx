import { Outlet } from "react-router-dom";
import { Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import JobOrdersPage from './pages/job-orders/JobOrdersPage'
import OtherIncomePage from './pages/other-income/OtherIncomePage'
import TransactionsPage from './pages/transactions/TransactionsPage'
import RevenueAndProfitPage from './pages/revenue-and-profit/RevenueAndProfitPage'
import OperationalExpensesPage from './pages/operational-expenses/OperationalExpensesPage'
import OverheadExpensesPage from './pages/overhead-expenses/OverheadExpensesPage'
import TrucksPage from './pages/trucks/TrucksPage'
import ActivityLogsPage from './pages/activity-logs/ActivityLogsPage'
import UsersPage from './pages/users/UsersPage'
import RolesAndPermissionsPage from './pages/roles-and-permissions/RolesAndPermissionsPage'
import MyAccountPage from './pages/my-account/MyAccountPage'
import ContractorDetailsPage from './pages/contractors/details/ContractorDetailsPage'
import CustomerDetailsPage from './pages/customers/details/CustomerDetailsPage'
import JobOrderDetailsPage from './pages/job-orders/details/JobOrderDetailsPage'
import TruckDetailsPage from './pages/trucks/details/TruckDetailsPage'
import AppLayout from './components/AppLayout'
import Sidebar from './components/sidebar/Sidebar'
import ContentLayout from './components/ContentLayout'
import Header from './components/Header'
import Main from './components/Main'
import './App.css'
import { Toaster } from "react-hot-toast";
import UserDetailsPage from "./pages/users/details/UserDetailsPage";
import ApprovalLogsPage from "./pages/approval-logs/ActivityLogsPage";
import BranchesPage from "./pages/branches/BranchesPage";
import usePermissions from "./hooks/usePermissions";
import Loading from "./components/Loading";
import ErrorModal from "./components/ErrorModal";
import { useEffect } from "react";
import { hasPermissions } from "./services/permissionService";

function MainLayout() {
  return (
    <AppLayout>
      <Sidebar />
      <ContentLayout>
        <Header />
        <Main>
          {/* Nested routes render here */}
          <Outlet />
        </Main>
      </ContentLayout>
    </AppLayout>
  )
}

function App() {
  const { permissions, loading, error, closeError } = usePermissions()

  useEffect(() => {
    console.log("PERMISSIONS", permissions)
  }, [permissions])

  if (loading) return <Loading />

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage closeError={closeError} />} />

        {/* Admin routes */}
        <Route path="/" element={<MainLayout />}>
          {/* Main Pages */}
          <Route index element={<DashboardPage />} />
          {hasPermissions(['admin_dashboard_revenue', 'admin_dashboard_profit', 'admin_dashboard_expenses', 'admin_dashboard_job_orders', 'admin_dashboard_customer_balance']) &&
            <Route path='/dashboard' element={<DashboardPage />} />}

          {hasPermissions(['view_job_orders']) &&
            <Route path='/job-orders' element={<JobOrdersPage />} />}

          {hasPermissions(['view_other_incomes']) &&
            <Route path='/other-income' element={<OtherIncomePage />} />}

          {hasPermissions(['view_transactions']) &&
            <Route path='/transactions' element={<TransactionsPage />} />}

          {hasPermissions(['view_revenue_profit']) &&
            <Route path='/revenue-and-profit' element={<RevenueAndProfitPage />} />}

          {hasPermissions(['view_materials', 'view_equipments', 'view_labors']) &&
            <Route path='/operational-expenses' element={<OperationalExpensesPage />} />}

          {hasPermissions(['view_overheads']) &&
            <Route path='/overhead-expenses' element={<OverheadExpensesPage />} />}

          {hasPermissions(['view_branches']) &&
            <Route path='/branches' element={<BranchesPage />} />}

          {hasPermissions(['view_trucks']) &&
            <Route path='/trucks' element={<TrucksPage />} />}

          {hasPermissions(['view_approval_logs']) &&
            <Route path='/approval-logs' element={<ApprovalLogsPage />} />}

          {hasPermissions(['view_activity_logs']) &&
            <Route path='/activity-logs' element={<ActivityLogsPage />} />}

          {hasPermissions(['view_users']) &&
            <Route path='/users' element={<UsersPage />} />}

          {hasPermissions(['view_roles']) &&
            <Route path='/roles-and-permissions' element={<RolesAndPermissionsPage />} />}

          {hasPermissions(['view_own_profile']) &&
            <Route path='/my-account' element={<MyAccountPage />} />}

          {/* Details Pages */}
          <Route path="/customers/:id" element={<CustomerDetailsPage />} />
          <Route path="/contractors/:id" element={<ContractorDetailsPage />} />
          <Route path="/job-orders/:id" element={<JobOrderDetailsPage />} />
          <Route path="/trucks/:id" element={<TruckDetailsPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>


      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '0.95rem',
          },
          success: {
            style: {
              background: '#22C55E',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }}
      />

      {error && <ErrorModal closeError={closeError} />}
    </>
  );
}

export default App
