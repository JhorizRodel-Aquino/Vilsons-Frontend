import { Routes, Route } from 'react-router'
import DashboardPage from './pages/Admin/dashboard/DashboardPage'
import JobOrdersPage from './pages/Admin/job_orders/JobOrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'
import OtherIncomePage from './pages/Admin/other_income/OtherIncomePage'
import TransactionsPage from './pages/Admin/transactions/TransactionsPage'

function App() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/job-orders' element={<JobOrdersPage />} />
      <Route path='/other-income' element={<OtherIncomePage />} />
      <Route path='/transactions' element={<TransactionsPage />} />
      <Route path='/revenue-and-profit' element={<JobOrdersPage />} />
      <Route path='/operational-expenses' element={<JobOrdersPage />} />
      <Route path='/overhead-expenses' element={<JobOrdersPage />} />
      <Route path='/trucks' element={<JobOrdersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
