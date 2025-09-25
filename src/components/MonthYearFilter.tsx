import { useState } from 'react'
import Dropdown from './Dropdown'
import MonthYearPicker from './MonthYearPicker'
import YearPicker from './YearPicker'
import TableFilter from './TableFilter';

export default function MonthYearFilter() {
  const options = ['Monthly', 'Yearly']
  const [option, setOption] = useState(options[0]); // default

  return (
    <TableFilter.Group>
        <Dropdown options={options} value={option} setValue={setOption}/>
        
        {option === options[0] && <MonthYearPicker />}
        {option === options[1] && <YearPicker />}
    </TableFilter.Group>
  )
}
