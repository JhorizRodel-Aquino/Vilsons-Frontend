import { Routes, Route } from 'react-router'
import DashboardPage from './pages/Admin/dashboard/DashboardPage'
import JobOrdersPage from './pages/Admin/job-orders/JobOrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import OtherIncomePage from './pages/Admin/other-income/OtherIncomePage'
import TransactionsPage from './pages/Admin/transactions/TransactionsPage'
import RevenueAndProfitPage from './pages/Admin/revenue-and-profit/RevenueAndProfitPage'
import OperationalExpensesPage from './pages/Admin/operational-expenses/OperationalExpensesPage'
import OverheadExpensesPage from './pages/Admin/overhead-expenses/OverheadExpensesPage'
import TrucksPage from './pages/Admin/trucks/TrucksPage'
import ActivityLogsPage from './pages/Admin/activity-logs/ActivityLogsPage'
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
