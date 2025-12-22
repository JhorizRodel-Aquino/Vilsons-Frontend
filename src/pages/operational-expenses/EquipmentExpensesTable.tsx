import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import Table from "../../components/table/Table"
import MonthYearFilter from "../../components/MonthYearFilter";
import useMonthYearFilter from "../../hooks/useMonthYearFilter";
import ErrorModal from "../../components/ErrorModal";
import Loading from "../../components/Loading";
import formatPesoFromCents from "../../utils/formatPesoFromCents";
import useGetByMonthYear from "../../hooks/useGetByMonthYear";
import useDeleteData from "../../hooks/useDeleteData";
import type { FormData } from "./EquipmentModal";
import ConfirmModal from "../../components/ConfirmModal";
import Options from "../../components/Options";
import { useEffect, useState, type ReactElement } from "react";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";
import { hasPermissions } from "../../services/permissionService";

type EquipmentExpense = {
    equipment: string;
    branch: string;
    quantity: number;
    amount: number;
    totalAmount: number;
    options: ReactElement;
};

const equipmentExpenseColumns: Column<EquipmentExpense>[] = [
    { key: "equipment", label: "Equipment" },
    { key: "branch", label: "Branch" },
    { key: "quantity", label: "Quantity" },
    { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
    { key: "totalAmount", label: "Total Amount", render: (value) => formatPesoFromCents(value as number) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },

];

type EquipmentTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    setLastUpdated: (date: string | undefined) => void;
}

export default function EquipmentExpensesTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId, setLastUpdated }: EquipmentTableProps) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/equipments');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/equipments');

    const handleEdit = async (item: any) => {
        setSelectedId(item.id)
        setPresetData({ equipment: item.equipmentName, quantity: item.quantity, amount: item.price / 100, branchId: item.branchId, remarks: "" } as FormData)
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

    const equipmentExpenseItems = data.data?.equipments || [];
    const total = data.data?.totalEquipmentsAmount || 0;

    const equipmentExpenses: EquipmentExpense[] = equipmentExpenseItems.map(
        (item: Record<string, any>) => ({
            equipment: item.equipmentName,
            branch: item.branch.branchName,
            quantity: item.quantity,
            amount: item.price,
            totalAmount: item.totalAmount,
            options:
                <Options
                    onEdit={hasPermissions(['edit_equipment']) ? () => handleEdit(item) : undefined}
                    onDelete={hasPermissions(['edit_equipment']) ? () => { setSelectedId(item.id); setShowDeleteModal(true) } : undefined}
                />
        })
    );

    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Equipment Name' />

                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>

                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={equipmentExpenseColumns} rows={equipmentExpenses} total={total} withOptions={true} />

            {(error || deleteError) ?
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
                : showDeleteModal &&
                <ConfirmModal
                    title="Delete Equipment"
                    message="Are you sure you want to delete this equipment?"
                    onClose={() => { setShowDeleteModal(false) }}
                    onConfirm={handleDelete} red={true}
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}