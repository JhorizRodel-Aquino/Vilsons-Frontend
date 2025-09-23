import type { Column } from "../../../components/table/Table";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";
import TableTotal from "../../../components/TableTotal";

export default function OperationalExpensesLaborTabContent() {
    type LaborExpense = { 
        name: string; 
        laborType: string; 
        salaryType: string;
        datetime: string;
        amount: number;
    };

    const laborExpenseColumns: Column<LaborExpense>[] = [
        {key: "name", label: "Name"},
        {key: "laborType", label: "Labor Type"},
        {key: "salaryType", label: "Salary Type"},
        {key: "datetime", label: "Datetime"},
        {key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number)},
    ];

    const laborExpenses: LaborExpense[] = [
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
        {name: 'Jhoriz Rodel Aquino', laborType: 'Employee', salaryType: 'Employee', datetime: 'Jan 4, 2022 11:30 AM', amount: 10000000},
    ];

    return (
        <>
            <Info>
                <Details subtitle={'All Labor Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Pay Laborer'} onClick={() => console.log('clicked')} variant="primary" />
            </Info>

            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={laborExpenseColumns} rows={laborExpenses} setHR={true} />

            <TableTotal value={20002039} />
        </>
    )
}