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
import { useEffect } from "react";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";
type Transaction = {
    referenceNumber: string;
    jobNumber: string;
    senderName: string;
    datetime: string;
    paymentMode: string;
    amount: number;
};

const transactionColumns: Column<Transaction>[] = [
    { key: "referenceNumber", label: "Reference Number" },
    { key: "jobNumber", label: "Job Number" },
    { key: "senderName", label: "Sender Name" },
    { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    { key: "paymentMode", label: "Payment Mode" },
    { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
];

// type MyTransactionsTableProps = {
//     setPresetData: (presets: FormData) => void,
//     reloadFlag: boolean,
//     setShowModal: (action: 'create' | 'edit' | null) => void;
//     selectedId: string;
//     setSelectedId: (id: string) => void;
// }

export default function MyTransactionsTable({setLastUpdated}: {setLastUpdated: (date: string | undefined) => void; }) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const { data, loading, error, closeError, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/me/customer/transactions');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);

        useEffect(() => {
        if (data && data.lastUpdatedAt) {
            setLastUpdated(data?.lastUpdatedAt);
        }
    }, [data, setLastUpdated]);

    if (loading) return <Loading />;

    const transactionItems = data.data?.transactions || [];
    const total = data.data?.totalTransactions || 0;

    const transactions: Transaction[] = transactionItems.map(
        (item: Record<string, any>) => ({
            referenceNumber: item.referenceNumber || 'no ref number',
            jobNumber: item.jobOrderCode,
            senderName: item.senderName,
            datetime: item.createdAt,
            paymentMode: item.mop,
            amount: item.amount,
        })
    );


    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Reference#, Job#, or Sender' />
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