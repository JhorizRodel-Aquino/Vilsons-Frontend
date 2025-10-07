import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import MonthYearFilter from "../../../components/MonthYearFilter";
import useGetEquipmentExpenses from "../../../hooks/equipment-expenses/useGetEquipmentExpenses";
import useMonthYearFilter from "../../../hooks/useMonthYearFilter";
import ErrorModal from "../../../components/ErrorModal";
import Loading from "../../../components/Loading";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";

export default function EquipmentExpensesTable() {
    const { data, loading, error, closeError, setMonthYearParams } = useGetEquipmentExpenses();
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    if (loading) return <Loading />;

    const equipmentExpenseItems = data.data?.equipments || [];
    const total = data.data?.totalEquipmentsAmount || 0;

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

    const equipmentExpenses: EquipmentExpense[] = equipmentExpenseItems.map(
        (item: Record<string, any>) => ({
            equipment: item.equipmentName,
            quantity: item.quantity,
            amount: item.price,
            totalAmount: item.totalAmount
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar />
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={equipmentExpenseColumns} rows={equipmentExpenses} total={total} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}