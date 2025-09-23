import { Routes, Route } from 'react-router'
import DashboardPage from './pages/Admin/dashboard/DashboardPage'
import JobOrdersPage from './pages/Admin/job_orders/JobOrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import OtherIncomePage from './pages/Admin/other_income/OtherIncomePage'
import TransactionsPage from './pages/Admin/transactions/TransactionsPage'
import OperationalExpensesPage from './pages/Admin/operational_expenses/OperationalExpensesPage'
import OverheadExpensesPage from './pages/Admin/overhead_expenses/OverheadExpensesPage'

function App() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/job-orders' element={<JobOrdersPage />} />
      <Route path='/other-income' element={<OtherIncomePage />} />
      <Route path='/transactions' element={<TransactionsPage />} />
      <Route path='/revenue-and-profit' element={<JobOrdersPage />} />
      <Route path='/operational-expenses' element={<OperationalExpensesPage />} />
      <Route path='/overhead-expenses' element={<OverheadExpensesPage />} />
      <Route path='/trucks' element={<JobOrdersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
