import type { Column } from "../../../components/table/Table";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function OtherIncomeContent() {
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
            <Info>
                <Details subtitle={'All Other Income'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Other Income'} onClick={() => console.log('clicked')} variant="primary" />
            </Info>

            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={otherIncomeColumns} rows={otherIncomes} total={10000000} />
        </>
    )
}