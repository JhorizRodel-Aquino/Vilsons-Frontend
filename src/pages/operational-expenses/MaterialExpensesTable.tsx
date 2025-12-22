import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import Table from "../../components/table/Table"
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import MonthYearFilter from "../../components/MonthYearFilter";
import useMonthYearFilter from "../../hooks/useMonthYearFilter";
import ErrorModal from "../../components/ErrorModal";
import Loading from "../../components/Loading";
import useGetByMonthYear from "../../hooks/useGetByMonthYear";
import { getBranches } from "../../services/branchService";
import Selection from "../../components/Selection";
import { useEffect } from "react";

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

export default function MaterialExpensesTable({ setLastUpdated }: { setLastUpdated: (date: string | undefined) => void }) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const { data, loading, error, closeError, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/materials');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    useEffect(() => {
        if (data && data.lastUpdatedAt) {
            setLastUpdated(data?.lastUpdatedAt);
        }
    }, [data, setLastUpdated]);

    if (loading) return <Loading />;

    const materialExpenseItems = data.data?.materials || [];
    const total = data.data?.totalMaterialsAmount || 0;

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

    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Material Name or Job#' />
                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={materialExpenseColumns} rows={materialExpenses} total={total} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}