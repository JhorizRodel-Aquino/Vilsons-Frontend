import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function OtherIncomeTable() {
        type OtherIncome = { 
        datetime: string; 
        description: string; 
        amount: number; 
    };

    const otherIncomeColumns: Column<OtherIncome>[] = [
        {key: "datetime", label: "Datetime"},
        {key: "description", label: "Description"},
        {key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number)},

    ] ;

    const otherIncomes: OtherIncome[] = [
        {datetime: 'Jan 4, 2022 11:30 AM', description: '1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal 1kg of metal', amount: 102000},
        {datetime: 'Jan 4, 2022 11:30 AM', description: '1kg of metal', amount: 102000},
        {datetime: 'Jan 4, 2022 11:30 AM', description: '1kg of metal', amount: 102000},
        {datetime: 'Jan 4, 2022 11:30 AM', description: '1kg of metal', amount: 102000},
        {datetime: 'Jan 4, 2022 11:30 AM', description: '1kg of metal', amount: 102000},
        {datetime: 'Jan 4, 2022 11:30 AM', description: '1kg of metal', amount: 102000},
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={otherIncomeColumns} rows={otherIncomes} total={10000000} />
        </>
    )
}