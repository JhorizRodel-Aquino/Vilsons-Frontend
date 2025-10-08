import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";
import useGetOverheadExpenses from "../../../hooks/overhead-expenses/useGetOverheadExpenses";
import useMonthYearFilter from "../../../hooks/useMonthYearFilter";
import ErrorModal from "../../../components/ErrorModal";
import Loading from "../../../components/Loading";
import formatDate from "../../../utils/formatDate";

export default function OverheadExpensesTable() {
    const { data, loading, error, closeError, setMonthYearParams } = useGetOverheadExpenses();
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    if (loading) return <Loading />;

    const overheadExpenseItems = data.data?.overheads || [];
    const total = data.data?.totalAmount || 0;

    type OverheadExpense = {
        description: string;
        datetime: string;
        amount: number
    };

    const overheadExpenseColumns: Column<OverheadExpense>[] = [
        { key: "description", label: "Description" },
        { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
        { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
    ];

    const overheadExpenses: OverheadExpense[] = overheadExpenseItems.map(
        (item: Record<string, any>) => ({
            description: item.description,
            datetime: item.createdAt,
            amount: item.amount
        })
    );

    return (
        <>
            <TableFilter>
                {/* <SearchBar /> */}
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={overheadExpenseColumns} rows={overheadExpenses} total={total} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}