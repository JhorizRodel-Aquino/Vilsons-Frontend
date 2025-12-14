import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback, type ReactElement } from "react";
import { Toaster } from "react-hot-toast";

// Pages
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import JobOrdersPage from "./pages/job-orders/JobOrdersPage";
import OtherIncomePage from "./pages/other-income/OtherIncomePage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import RevenueAndProfitPage from "./pages/revenue-and-profit/RevenueAndProfitPage";
import OperationalExpensesPage from "./pages/operational-expenses/OperationalExpensesPage";
import OverheadExpensesPage from "./pages/overhead-expenses/OverheadExpensesPage";
import BranchesPage from "./pages/branches/BranchesPage";
import TrucksPage from "./pages/trucks/TrucksPage";
import ActivityLogsPage from "./pages/activity-logs/ActivityLogsPage";
import ApprovalLogsPage from "./pages/approval-logs/ActivityLogsPage";
import UsersPage from "./pages/users/UsersPage";
import RolesAndPermissionsPage from "./pages/roles-and-permissions/RolesAndPermissionsPage";
import MyAccountPage from "./pages/my-account/MyAccountPage";
import CustomerDetailsPage from "./pages/customers/details/CustomerDetailsPage";
import ContractorDetailsPage from "./pages/contractors/details/ContractorDetailsPage";
import JobOrderDetailsPage from "./pages/job-orders/details/JobOrderDetailsPage";
import TruckDetailsPage from "./pages/trucks/details/TruckDetailsPage";
import UserDetailsPage from "./pages/users/details/UserDetailsPage";

// Components
import AppLayout from "./components/AppLayout";
import Sidebar from "./components/sidebar/Sidebar";
import ContentLayout from "./components/ContentLayout";
import Header from "./components/Header";
import Main from "./components/Main";
import Loading from "./components/Loading";

// Services / hooks
import usePermissions from "./hooks/usePermissions";
import { hasPermissions } from "./services/permissionService";
import AssignedOrdersPage from "./pages/assigned-orders/AssignedOrdersPage";
import MyOrdersPage from "./pages/my-orders/MyOrdersPage";
import AssignedOrderDetailsPage from "./pages/assigned-orders/details/AssignedOrderDetailsPage";
import MyOrderDetailsPage from "./pages/my-orders/details/MyOrderDetailsPage";
import MyTransactionsPage from "./pages/my-transactions/MyTransactionsPage";
import MyTruckDetailsSection from "./pages/my-trucks/details/MyTruckDetailsSection";
import ContractorPayrollPage from "./pages/contractor-payroll/ContractorPayrollPage";
import MyTrucksPage from "./pages/my-trucks/MyTrucksPage";

// ProtectedRoute
const ProtectedRoute = ({
  requiredPermissions,
  permissions,
  children,
}: {
  requiredPermissions?: string[];
  permissions: any[];
  children: ReactElement;
}) => {
  if (!permissions) return null;
  if (!requiredPermissions || requiredPermissions.length === 0) return children;

  const allowed = hasPermissions(requiredPermissions);
  if (!allowed) return <Navigate to="/not-authorized" replace />;
  return children;
};

// MainLayout
const MainLayout = () => {
  const { permissions, loading, reload } = usePermissions();
  const [reloadFlag, setReloadFlag] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  useEffect(() => { reload() }, [reloadFlag]);
  const reloadPermissions = useCallback(() => setReloadFlag((prev) => !prev), []);

  const toggleSidebar = useCallback(() => setOpenSidebar(prev => !prev), []);


  if (loading || !permissions) return <Loading />;

  return (
    <AppLayout>
      <Sidebar openSidebar={openSidebar} />
      <ContentLayout>
        <Header toggleSidebar={toggleSidebar} />
        <Main>
          <Routes>
            {/* Dashboard */}
            <Route
              index
              element={
                <ProtectedRoute
                  requiredPermissions={[
                    'view_admin_dashboard_revenue',
                    'view_admin_dashboard_profit',
                    'view_admin_dashboard_expenses',
                    'view_admin_dashboard_job_orders',
                    'view_admin_dashboard_customer_balance',
                    'view_contractor_dashboard_balance',
                    'view_customer_dashboard_balance',
                    'view_contractor_dashboard_job_orders',
                    'view_customer_dashboard_job_orders'
                  ]}
                  permissions={permissions}
                >
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute
                  requiredPermissions={[
                    'view_admin_dashboard_revenue',
                    'view_admin_dashboard_profit',
                    'view_admin_dashboard_expenses',
                    'view_admin_dashboard_job_orders',
                    'view_admin_dashboard_customer_balance',
                    'view_contractor_dashboard_balance',
                    'view_customer_dashboard_balance',
                    'view_contractor_dashboard_job_orders',
                    'view_customer_dashboard_job_orders'
                  ]}
                  permissions={permissions}
                >
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Other Pages */}
            <Route
              path="job-orders"
              element={
                <ProtectedRoute requiredPermissions={["view_job_orders"]} permissions={permissions}>
                  <JobOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="other-income"
              element={
                <ProtectedRoute requiredPermissions={["view_other_incomes"]} permissions={permissions}>
                  <OtherIncomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="transactions"
              element={
                <ProtectedRoute requiredPermissions={["view_transactions"]} permissions={permissions}>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="revenue-and-profit"
              element={
                <ProtectedRoute requiredPermissions={["view_revenue_profit"]} permissions={permissions}>
                  <RevenueAndProfitPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="operational-expenses"
              element={
                <ProtectedRoute
                  requiredPermissions={["view_materials", "view_equipments", "view_labors"]}
                  permissions={permissions}
                >
                  <OperationalExpensesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="overhead-expenses"
              element={
                <ProtectedRoute requiredPermissions={["view_overheads"]} permissions={permissions}>
                  <OverheadExpensesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="branches"
              element={
                <ProtectedRoute requiredPermissions={["view_branches"]} permissions={permissions}>
                  <BranchesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="trucks"
              element={
                <ProtectedRoute requiredPermissions={["view_trucks"]} permissions={permissions}>
                  <TrucksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="activity-logs"
              element={
                <ProtectedRoute requiredPermissions={["view_activity_logs"]} permissions={permissions}>
                  <ActivityLogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="approval-logs"
              element={
                <ProtectedRoute requiredPermissions={["view_approval_logs"]} permissions={permissions}>
                  <ApprovalLogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="users"
              element={
                <ProtectedRoute requiredPermissions={["view_users"]} permissions={permissions}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="roles-and-permissions"
              element={
                <ProtectedRoute requiredPermissions={["view_role_permissions"]} permissions={permissions}>
                  <RolesAndPermissionsPage reloadPermissions={reloadPermissions} />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-account"
              element={
                <ProtectedRoute requiredPermissions={["view_own_profile"]} permissions={permissions}>
                  <MyAccountPage />
                </ProtectedRoute>
              }
            />

            <Route path="assigned-orders" element={<AssignedOrdersPage />} />
            <Route path="payroll" element={<ContractorPayrollPage />} />
            <Route path="my-orders" element={<MyOrdersPage />} />
            <Route path="my-transactions" element={<MyTransactionsPage />} />
            <Route path="my-trucks" element={<MyTrucksPage />} />

            {/* Details Pages */}
            <Route path="customers/:id" element={<CustomerDetailsPage />} />
            <Route path="contractors/:id" element={<ContractorDetailsPage />} />
            <Route path="job-orders/:id" element={<JobOrderDetailsPage />} />
            <Route path="trucks/:id" element={<TruckDetailsPage />} />
            <Route path="users/:id" element={<UserDetailsPage />} />

            <Route path="assigned-orders/:id" element={<AssignedOrderDetailsPage />} />
            <Route path="my-orders/:id" element={<MyOrderDetailsPage />} />
            <Route path="my-trucks/:id" element={<MyTruckDetailsSection />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Main>
      </ContentLayout>
    </AppLayout>
  );
};

// Main App
export default function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Main Layout */}
        <Route path="/*" element={<MainLayout />} />

        {/* fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: "0.95rem" },
          success: { style: { background: "#22C55E", color: "#fff" } },
          error: { style: { background: "#EF4444", color: "#fff" } },
        }}
      />
    </>
  );
}
