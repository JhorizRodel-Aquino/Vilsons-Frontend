import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import Table from "../../components/table/Table"
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import MonthYearFilter from "../../components/MonthYearFilter";
import Loading from "../../components/Loading";
import formatDate from "../../utils/formatDate";
import useMonthYearFilter from "../../hooks/useMonthYearFilter";
import ErrorModal from "../../components/ErrorModal";
import useGetByMonthYear from "../../hooks/useGetByMonthYear";
import { useEffect, useState, type ReactElement } from "react";
import Options from "../../components/Options";
import ConfirmModal from "../../components/ConfirmModal";
import useDeleteData from "../../hooks/useDeleteData";
import type { FormData } from "./OtherIncomeModal";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";
import { hasPermissions } from "../../services/permissionService";

type OtherIncome = {
    datetime: string;
    description: string;
    branch: string;
    amount: number;
    options: ReactElement;
};

const otherIncomeColumns: Column<OtherIncome>[] = [
    { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    { key: "description", label: "Description" },
    { key: "branch", label: "Branch" },
    { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type OtherIncomeTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    setLastUpdated: (date: string | undefined) => void;
}

export default function OtherIncomeTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId, setLastUpdated }: OtherIncomeTableProps) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/other-incomes');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/other-incomes');

    const handleEdit = async (item: any) => {
        setSelectedId(item.id)
        setPresetData({ description: item.description, amount: item.amount / 100, branchId: item.branchId, remarks: "" } as FormData)
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

    // useEffect(() => {
    //     if (!setShowDeleteModal) setSelectedId(null);
    // }, [setShowDeleteModal])

    if (loading) return <Loading />;

    const otherIncomeItems = data.data?.otherIncome || [];
    const total = data.data?.totalAmount || 0;

    const otherIncomes: OtherIncome[] = otherIncomeItems.map(
        (item: Record<string, any>) => ({
            datetime: item.createdAt,
            description: item.description,
            branch: item.branch.branchName,
            amount: item.amount,
            options:
                <Options
                    onEdit={hasPermissions(['edit_other_income']) ? () => handleEdit(item) : undefined}
                    onDelete={hasPermissions(['delete_other_income']) ? () => { setSelectedId(item.id); setShowDeleteModal(true) } : undefined}
                />

        })
    );

    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Income Description' />
                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={otherIncomeColumns} rows={otherIncomes} total={total} withOptions={true} />

            {(error || deleteError) ?
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
                : showDeleteModal &&
                <ConfirmModal
                    title="Delete Job Order"
                    message="Are you sure you want to delete this job order?"
                    onClose={() => { setShowDeleteModal(false) }}
                    onConfirm={handleDelete} red={true}
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}