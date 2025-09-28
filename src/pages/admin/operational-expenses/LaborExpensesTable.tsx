import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function LaborExpensesTable() {
    type LaborExpense = {
        name: string;
        laborType: string;
        salaryType: string;
        datetime: string;
        amount: number;
    };

    const laborExpenseColumns: Column<LaborExpense>[] = [
        { key: "name", label: "Name" },
        { key: "laborType", label: "Labor Type" },
        { key: "salaryType", label: "Salary Type" },
        { key: "datetime", label: "Datetime" },
        { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
    ];

    const laborExpenses: LaborExpense[] = [
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
        { name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000 },
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={laborExpenseColumns} rows={laborExpenses} total={10000000} />
        </>
    )
}