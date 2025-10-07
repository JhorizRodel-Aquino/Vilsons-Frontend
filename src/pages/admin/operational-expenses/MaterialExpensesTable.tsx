import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";
import useGetMaterialExpenses from "../../../hooks/material-expenses/useGetMaterialExpenses";
import useMonthYearFilter from "../../../hooks/useMonthYearFilter";
import ErrorModal from "../../../components/ErrorModal";
import Loading from "../../../components/Loading";
import { useEffect } from "react";

export default function MaterialExpensesTable() {
    const { data, loading, error, closeError, setMonthYearParams } = useGetMaterialExpenses();
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    if (loading) return <Loading />;

    const materialExpenseItems = data.data?.materials || [];
    const total = data.data?.totalAmount || 0;


    type MaterialExpense = {
        jobNumber: string;
        plateNumber: string;
        material: string;
        quantity: number;
        amount: number;
        totalAmount: number;
    };

    const materialExpenseColumns: Column<MaterialExpense>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "plateNumber", label: "Plate Number" },
        { key: "material", label: "Material" },
        { key: "quantity", label: "Quantity" },
        { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
        { key: "totalAmount", label: "Total Amount", render: (value) => formatPesoFromCents(value as number) },
    ];

    const materialExpenses: MaterialExpense[] = materialExpenseItems.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrder.jobOrderCode,
            plateNumber: item.jobOrder.truck.plate,
            material: item.materialName,
            quantity: item.quantity,
            amount: item.price,
            totalAmount: item.totalAmount
        })
    );

    
    useEffect(() => {
        console.log(total)
    }, [total])

    return (
        <>
            <TableFilter>
                <SearchBar />
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={materialExpenseColumns} rows={materialExpenses} total={total} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}