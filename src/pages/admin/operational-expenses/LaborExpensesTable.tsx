import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";
import useMonthYearFilter from "../../../hooks/useMonthYearFilter";
import ErrorModal from "../../../components/ErrorModal";
import Loading from "../../../components/Loading";
import formatDate from "../../../utils/formatDate";
import useGetByMonthYear from "../../../hooks/useGetByMonthYear";

export default function LaborExpensesTable() {
    const { data, loading, error, closeError, searchParams, setSearchParams, setMonthYearParams } = useGetByMonthYear('/api/labors');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    if (loading) return <Loading />;

    const laborExpenseItems = data.data?.laborPays || [];
    const total = data.data?.totalAmount || 0;

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
        { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
        { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
    ];

    const laborExpenses: LaborExpense[] = laborExpenseItems.map(
        (item: Record<string, any>) => ({
            name: item.fullName,
            laborType: item.type,
            salaryType: item.salaryType,
            datetime: item.createdAt,
            amount: item.amount,
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Laborer name'/>
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={laborExpenseColumns} rows={laborExpenses} total={total} />


            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}