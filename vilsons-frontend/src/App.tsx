import { Routes, Route } from 'react-router'
import DashboardPage from './pages/Admin/dashboard/DashboardPage'
import JobOrdersPage from './pages/Admin/job_orders/JobOrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/job-orders' element={<JobOrdersPage />} />
      <Route path='/other-income' element={<JobOrdersPage />} />
      <Route path='/transactions' element={<JobOrdersPage />} />
      <Route path='/revenue-and-profit' element={<JobOrdersPage />} />
      <Route path='/operational-expenses' element={<JobOrdersPage />} />
      <Route path='/overhead-expenses' element={<JobOrdersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
