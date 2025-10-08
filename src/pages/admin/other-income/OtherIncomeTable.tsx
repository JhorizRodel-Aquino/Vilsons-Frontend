import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import MonthYearFilter from "../../../components/MonthYearFilter";
import useGetOtherIncomes from "../../../hooks/other-income/useGetOtherIncomes";
import Loading from "../../../components/Loading";
import formatDate from "../../../utils/formatDate";
import useMonthYearFilter from "../../../hooks/useMonthYearFilter";
import ErrorModal from "../../../components/ErrorModal";

export default function OtherIncomeTable() {
    const { data, loading, error, closeError, setMonthYearParams } = useGetOtherIncomes();
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    if (loading) return <Loading />;

    const otherIncomeItems = data.data?.otherIncome || [];
    const total = data.data?.totalAmount || 0;

    type OtherIncome = {
        datetime: string;
        description: string;
        amount: number;
    };

    const otherIncomeColumns: Column<OtherIncome>[] = [
        { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string)},
        { key: "description", label: "Description" },
        { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },

    ];

    const otherIncomes: OtherIncome[] = otherIncomeItems.map(
        (item: Record<string, any>) => ({
            datetime: item.createdAt,
            description: item.description,
            amount: item.amount
        })
    );

    return (
        <>
            <TableFilter>
                {/* <SearchBar /> */}
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={otherIncomeColumns} rows={otherIncomes} total={total} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}