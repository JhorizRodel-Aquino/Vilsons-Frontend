import { Routes, Route } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

import DashboardPage from "./pages/dashboard/DashboardPage";
import JobOrdersPage from "./pages/job-orders/JobOrdersPage";
import OtherIncomePage from "./pages/other-income/OtherIncomePage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import RevenueAndProfitPage from "./pages/revenue-and-profit/RevenueAndProfitPage";
import OperationalExpensesPage from "./pages/operational-expenses/OperationalExpensesPage";
import OverheadExpensesPage from "./pages/overhead-expenses/OverheadExpensesPage";
import TrucksPage from "./pages/trucks/TrucksPage";
import ActivityLogsPage from "./pages/activity-logs/ActivityLogsPage";
import UsersPage from "./pages/users/UsersPage";
import RolesAndPermissionsPage from "./pages/roles-and-permissions/RolesAndPermissionsPage";
import MyAccountPage from "./pages/my-account/MyAccountPage";
import ApprovalLogsPage from "./pages/approval-logs/ActivityLogsPage";
import BranchesPage from "./pages/branches/BranchesPage";

import CustomerDetailsPage from "./pages/customers/details/CustomerDetailsPage";
import ContractorDetailsPage from "./pages/contractors/details/ContractorDetailsPage";
import JobOrderDetailsPage from "./pages/job-orders/details/JobOrderDetailsPage";
import TruckDetailsPage from "./pages/trucks/details/TruckDetailsPage";
import UserDetailsPage from "./pages/users/details/UserDetailsPage";

import AppLayout from "./components/AppLayout";
import Sidebar from "./components/sidebar/Sidebar";
import ContentLayout from "./components/ContentLayout";
import Header from "./components/Header";
import Main from "./components/Main";
import Loading from "./components/Loading";

import usePermissions from "./hooks/usePermissions";
import { hasPermissions } from "./services/permissionService";

import "./App.css";
import AssignedOrdersPage from "./pages/assigned-orders/AssignedOrdersPage";
import ContractorPayrollPage from "./pages/contractor-payroll/ContractorPayrollPage";
import MyOrdersPage from "./pages/my-orders/MyOrdersPage";
import MyTransactionsPage from "./pages/my-transactions/MyTransactionsPage";
import MyTrucksPage from "./pages/my-trucks/MyTrucksPage";
import AssignedOrderDetailsPage from "./pages/assigned-orders/details/AssignedOrderDetailsPage";
import MyOrderDetailsPage from "./pages/my-orders/details/MyOrderDetailsPage";
import MyTruckDetailsSection from "./pages/my-trucks/details/MyTruckDetailsSection";

function MainLayout() {
  const { permissions, loading, reload } = usePermissions();
  const [reloadPermissionsFlag, setReloadPermissionsFlag] = useState(false);

  useEffect(() => {
    console.log("PERMISSIONS:", permissions);
  }, [permissions]);

  useEffect(() => {
    reload();
  }, [reloadPermissionsFlag]);

  const reloadPermissions = useCallback(() => {
    setReloadPermissionsFlag(prev => !prev);
  }, []);

  if (loading) return <Loading />;

  return (
    <AppLayout>
      <Sidebar />
      <ContentLayout>
        <Header />
        <Main>
          <Routes>
            {hasPermissions([
              "view_admin_dashboard_revenue",
              "view_admin_dashboard_profit",
              "view_admin_dashboard_expenses",
              "view_admin_dashboard_job_orders",
              "view_admin_dashboard_customer_balance",
            ]) && (
              <Route path="dashboard" element={<DashboardPage />} />
            )}

            <Route path="job-orders" element={<JobOrdersPage />} />


            {hasPermissions(["view_other_incomes"]) && (
              <Route path="other-income" element={<OtherIncomePage />} />
            )}

            {hasPermissions(["view_transactions"]) && (
              <Route path="transactions" element={<TransactionsPage />} />
            )}

            {hasPermissions(["view_revenue_profit"]) && (
              <Route
                path="revenue-and-profit"
                element={<RevenueAndProfitPage />}
              />
            )}

            {hasPermissions([
              "view_materials",
              "view_equipments",
              "view_labors",
            ]) && (
              <Route
                path="operational-expenses"
                element={<OperationalExpensesPage />}
              />
            )}

            {hasPermissions(["view_overheads"]) && (
              <Route
                path="overhead-expenses"
                element={<OverheadExpensesPage />}
              />
            )}

            {hasPermissions(["view_branches"]) && (
              <Route path="branches" element={<BranchesPage />} />
            )}

            {hasPermissions(["view_trucks"]) && (
              <Route path="trucks" element={<TrucksPage />} />
            )}

            {hasPermissions(["view_approval_logs"]) && (
              <Route path="approval-logs" element={<ApprovalLogsPage />} />
            )}

            {hasPermissions(["view_activity_logs"]) && (
              <Route path="activity-logs" element={<ActivityLogsPage />} />
            )}

            {hasPermissions(["view_users"]) && (
              <Route path="users" element={<UsersPage />} />
            )}

            {hasPermissions(["view_role_permissions"]) && (
              <Route
                path="roles-and-permissions"
                element={
                  <RolesAndPermissionsPage
                    reloadPermissions={reloadPermissions}
                  />
                }
              />
            )}

            {hasPermissions(["view_own_profile"]) && (
              <Route path="my-account" element={<MyAccountPage />} />
            )}

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
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Main>
      </ContentLayout>
    </AppLayout>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: "0.95rem" },
          success: {
            style: { background: "#22C55E", color: "#fff" },
          },
          error: {
            style: { background: "#EF4444", color: "#fff" },
          },
        }}
      />
    </>
  );
}

export default App;
