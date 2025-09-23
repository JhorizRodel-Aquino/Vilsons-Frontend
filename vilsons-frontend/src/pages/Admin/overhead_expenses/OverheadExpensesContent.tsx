import type { Column } from "../../../components/StandardTable";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import StandardTable from "../../../components/StandardTable"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function OverheadExpenseContent() {
    type OverheadExpense = { 
        description: string; 
        datetime: string;
        amount: number
    };

    const overheadExpenseColumns: Column<OverheadExpense>[] = [
        {key: "description", label: "Description"},
        {key: "datetime", label: "Datetime"},
        {key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number)},
    ];

    const overheadExpenses: OverheadExpense[] = [
        {description: 'Meralco Electricity', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {description: 'Meralco Electricity', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {description: 'Meralco Electricity', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {description: 'Meralco Electricity', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {description: 'Meralco Electricity', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
    ];

    return (
        <>
            <Info>
                <Details subtitle={'All Overhead Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Bill'} onClick={() => console.log('clicked')} variant="primary" />
            </Info>

            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <StandardTable columns={overheadExpenseColumns} rows={overheadExpenses} total={10000000}/>
        </> 
    )
}