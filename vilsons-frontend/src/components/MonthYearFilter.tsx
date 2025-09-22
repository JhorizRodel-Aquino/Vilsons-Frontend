import { useState } from 'react'
import Dropdown from './Dropdown'
import MonthYearPicker from './MonthYearPicker'
import YearPicker from './YearPicker'
import TableFilter from './TableFilter';

export default function MonthYearFilter() {
  const [option, setOption] = useState("monthly"); // default

  return (
    <TableFilter.Group>
        <Dropdown value={option} onChange={(e) => setOption(e.target.value)}>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
        </Dropdown>
        
        {option === "monthly" && <MonthYearPicker />}
        {option === "yearly" && <YearPicker />}
    </TableFilter.Group>
  )
}
