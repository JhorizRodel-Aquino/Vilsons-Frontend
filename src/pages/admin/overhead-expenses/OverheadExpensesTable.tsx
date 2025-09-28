import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function OverheadExpensesTable() {
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
            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={overheadExpenseColumns} rows={overheadExpenses} total={10000000} />
        </>
    )
}