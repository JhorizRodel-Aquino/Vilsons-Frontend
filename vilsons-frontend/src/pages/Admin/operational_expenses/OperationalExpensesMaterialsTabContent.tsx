import type { Column } from "../../../components/StandardTable";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import StandardTable from "../../../components/StandardTable"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function OperationalExpensesMaterialsTabContent() {
    type MaterialExpense = { 
        jobNumber: string; 
        plateNumber: string; 
        material: string; 
        quantity: number;
        amount: number;
        totalAmount: number;
    };

    const materialExpenseColumns: Column<MaterialExpense>[] = [
        {key: "jobNumber", label: "Job Number"},
        {key: "plateNumber", label: "Plate Number"},
        {key: "material", label: "Material"},
        {key: "quantity", label: "Quantity"},
        {key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number)},
        {key: "totalAmount", label: "Total Amount", render: (value) => formatPesoFromCents(value as number)},
    ];

    const materialExpenses: MaterialExpense[] = [
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', material: 'Aluminum Bars', quantity: 20, amount: 10000000, totalAmount: 10000000},
    ];

    return (
        <>
            <Info>
                <Details subtitle={'All Material Expenses'} modifiedDate="Aug 9, 2025" />
            </Info>

            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <StandardTable columns={materialExpenseColumns} rows={materialExpenses} total={10000000}/>
        </>
    )
}