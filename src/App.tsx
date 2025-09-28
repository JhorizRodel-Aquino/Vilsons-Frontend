import { Routes, Route } from 'react-router'
import DashboardPage from './pages/admin/dashboard/DashboardPage'
import JobOrdersPage from './pages/admin/job-orders/JobOrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import OtherIncomePage from './pages/admin/other-income/OtherIncomePage'
import TransactionsPage from './pages/admin/transactions/TransactionsPage'
import RevenueAndProfitPage from './pages/admin/revenue-and-profit/RevenueAndProfitPage'
import OperationalExpensesPage from './pages/admin/operational-expenses/OperationalExpensesPage'
import OverheadExpensesPage from './pages/admin/overhead-expenses/OverheadExpensesPage'
import TrucksPage from './pages/admin/trucks/TrucksPage'
import ActivityLogsPage from './pages/admin/activity-logs/ActivityLogsPage'
import UsersPage from './pages/admin/users/UsersPage'
import RolesAndPermissionsPage from './pages/admin/roles-and-permissions/RolesAndPermissionsPage'
import MyAccountPage from './pages/admin/my-account/MyAccountPage'
import ContractorDetailsPage from './pages/admin/contractors/details/ContractorDetailsPage'
import CustomerDetailsPage from './pages/admin/customers/details/CustomerDetailsPage'
import JobOrderDetailsPage from './pages/admin/job-orders/details/JobOrderDetailsPage'
import TruckDetailsPage from './pages/admin/trucks/details/TruckDetailsPage'
import './App.css'


function App() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/job-orders' element={<JobOrdersPage />} />
      <Route path='/other-income' element={<OtherIncomePage />} />
      <Route path='/transactions' element={<TransactionsPage />} />
      <Route path='/revenue-and-profit' element={<RevenueAndProfitPage />} />
      <Route path='/operational-expenses' element={<OperationalExpensesPage />} />
      <Route path='/overhead-expenses' element={<OverheadExpensesPage />} />
      <Route path='/trucks' element={<TrucksPage />} />
      <Route path='/activity-logs' element={<ActivityLogsPage />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path='/roles-and-permissions' element={<RolesAndPermissionsPage />} />
      <Route path='/my-account' element={<MyAccountPage />} />
   
      <Route path="/customer" element={<CustomerDetailsPage />} />
      <Route path="/contractor" element={<ContractorDetailsPage />} />
      <Route path="/job-orders/id" element={<JobOrderDetailsPage />} />
      <Route path="/contractor" element={<ContractorDetailsPage />} />
      <Route path="/trucks/id" element={<TruckDetailsPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
