import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import Table from "../../components/table/Table"
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import MonthYearFilter from "../../components/MonthYearFilter";
import Loading from "../../components/Loading";
import useMonthYearFilter from "../../hooks/useMonthYearFilter";
import ErrorModal from "../../components/ErrorModal";
import useGetByMonthYear from "../../hooks/useGetByMonthYear";
import formatDate from "../../utils/formatDate";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";
import { useEffect } from "react";
type Transaction = {
    salaryType: string;
    datetime: string;
    amount: number;
};

const transactionColumns: Column<Transaction>[] = [
    { key: "salaryType", label: "Salary Type" },
    { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
];

export default function ContractorPayrollTable({ setBalance, setLastUpdated }: { setBalance: (balance: number) => void; setLastUpdated: (date: string | undefined) => void }) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const { data, loading, error, closeError, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/me/contractor/finances');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

    useEffect(() => {
        setBalance(totalBalance)
    }, [data])

    useEffect(() => {
        if (data && data.lastUpdatedAt) {
            setLastUpdated(data?.lastUpdatedAt);
        }
    }, [data, setLastUpdated]);

    if (loading) return <Loading />;

    const transactionItems = data.data?.labors || [];
    const totalBalance = data.data?.totalBalance || 0;
    const total = data.data?.totalLabor || 0;

    const transactions: Transaction[] = transactionItems.map(
        (item: Record<string, any>) => ({
            salaryType: item.type,
            datetime: item.createdAt,
            amount: item.amount,
        })
    );


    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Salary Type' />
                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={transactionColumns} rows={transactions} total={total} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}