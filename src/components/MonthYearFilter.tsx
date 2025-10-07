import Dropdown from './Dropdown'
import MonthYearPicker from './MonthYearPicker'
import YearPicker from './YearPicker'
import TableFilter from './TableFilter';

type MonthYearFilterProps = { 
  options: string[], 
  option: string, 
  setOption: (option: string) => void, 
  monthYear: string, 
  year: string, 
  setMonthYear: (monthYear: string) => void, 
  setYear: (year: string) => void
}

export default function MonthYearFilter({ options, option, setOption, monthYear, year, setMonthYear, setYear }: MonthYearFilterProps) {
  return (
    <TableFilter.Group>
        <Dropdown options={options} value={option} setValue={setOption}/>
        
        {option === options[0] && <MonthYearPicker value={monthYear} onChange={setMonthYear} />}
        {option === options[1] && <YearPicker value={year} onChange={setYear}/>}
    </TableFilter.Group>
  )
}
