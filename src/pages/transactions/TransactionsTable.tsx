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
import ConfirmModal from "../../components/ConfirmModal";
import { useEffect, useState, type ReactElement } from "react";
import useDeleteData from "../../hooks/useDeleteData";
import type { FormData } from "./TransactionsModal";
import Options from "../../components/Options";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";
import { hasPermissions } from "../../services/permissionService";

type Transaction = {
    referenceNumber: string;
    jobNumber: string;
    senderName: string;
    datetime: string;
    paymentMode: string;
    amount: number;
    options: ReactElement;
};

const transactionColumns: Column<Transaction>[] = [
    { key: "referenceNumber", label: "Reference Number" },
    { key: "jobNumber", label: "Job Number" },
    { key: "senderName", label: "Sender Name" },
    { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    { key: "paymentMode", label: "Payment Mode" },
    { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type TransactionsTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    setLastUpdated: (date: string | undefined) => void;
}

export default function TransactionsTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId, setLastUpdated }: TransactionsTableProps) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/transactions');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/transactions');

    const handleEdit = async (item: any) => {
        setSelectedId(item.id)
        // const jobOrder = (await get({ route: `/api/job-orders?search=${item.jobOrderCode}` })).data.jobOrders[0];
        setPresetData({ referenceNumber: item.referenceNumber, jobOrderCode: item.jobOrderCode, senderName: item.senderName, amount: item.amount / 100, mop: item.mop, plateNumber: item.jobOrder.truck.plate, customerId: item.jobOrder.customerId, contractorId: item.jobOrder.contractorId, truckId: item.jobOrder.truckId, jobOrderId: item.jobOrder.id, remarks: "" } as FormData)
        setShowModal('edit');
    }

    const handleDelete = async () => {
        if (!selectedId) return
        const success = await deleteData(selectedId);
        if (success) {
            reload();
            setShowDeleteModal(false)
        }
    }

    useEffect(() => {
        reload()
    }, [reloadFlag])

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
            referenceNumber: item.referenceNumber || '',
            jobNumber: item.jobOrderCode,
            senderName: item.senderName,
            datetime: item.createdAt,
            paymentMode: item.mop,
            amount: item.amount,
            options:
                <Options
                    onEdit={hasPermissions(['edit_transaction']) ? () => handleEdit(item) : undefined}
                    onDelete={hasPermissions(['delete_transaction']) ? () => { setSelectedId(item.id); setShowDeleteModal(true) } : undefined}
                />
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

            <Table columns={transactionColumns} rows={transactions} total={total} withOptions={true} />

            {(error || deleteError) ?
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
                : showDeleteModal &&
                <ConfirmModal
                    title="Delete Transaction"
                    message="Are you sure you want to delete this transaction?"
                    onClose={() => { setShowDeleteModal(false) }}
                    onConfirm={handleDelete} red={true}
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}