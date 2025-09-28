import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";

export default function EquipmentExpensesTable() {
    type EquipmentExpense = {
        equipment: string;
        quantity: number;
        amount: number;
        totalAmount: number;
    };

    const equipmentExpenseColumns: Column<EquipmentExpense>[] = [
        { key: "equipment", label: "Equipment" },
        { key: "quantity", label: "Quantity" },
        { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
        { key: "totalAmount", label: "Total Amount", render: (value) => formatPesoFromCents(value as number) },
    ];

    const equipmentExpenses: EquipmentExpense[] = [
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
        { equipment: 'Welding Machine', quantity: 20, amount: 10000000, totalAmount: 10000000 },
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />
                <MonthYearFilter />
            </TableFilter>

            <Table columns={equipmentExpenseColumns} rows={equipmentExpenses} total={10000000} />
        </>
    )
}