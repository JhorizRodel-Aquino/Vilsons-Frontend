import { useEffect, useState, type ReactElement } from "react";
import type { Status } from "../../../config/statusConfig";
import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange"
import Table from "../../../components/table/Table"
import StatusIndicator from "../../../components/StatusIndicator";
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import Options from "../../../components/Options";
import Icon from "../../../components/Icon";
import ConfirmModal from "../../../components/ConfirmModal";
import Loading from "../../../components/Loading";
import useGetByDateRange from "../../../hooks/useGetByDateRange";
import ErrorModal from "../../../components/ErrorModal";
import { Link } from "react-router";
import type { FormData, Material } from "./JobOrderModal";
import { get } from "../../../services/apiService";
import useDeleteData from "../../../hooks/useDeleteData";
import Selection from "../../../components/Selection";
import getStatuses from "../../../utils/statusOptions";

type ActiveJobOrder = {
    jobNumber: string;
    status: Status;
    plateNumber: string;
    contractor: ReactElement;
    totalBill: number;
    balance: number;
    options: ReactElement
};

const activeJobOrderColumns: Column<ActiveJobOrder>[] = [
    { key: "jobNumber", label: "Job Number" },
    { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
    { key: "plateNumber", label: "Plate Number" },
    { key: "contractor", label: "Contractor", render: (value) => value as React.ReactElement },
    { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    { key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type EquipmentTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | 'change' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    setSelectedJobOrder: ({ }: { jobNumber: string, status: string }) => void;
}

export default function ActiveOrdersTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId, setSelectedJobOrder }: EquipmentTableProps) {
    const statusOptions = [{value: "", label: "All Statuses"}, ...getStatuses()];
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, statusParams, setStatusParams } = useGetByDateRange('/api/job-orders/group/active');
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/job-orders');

    const handleEdit = async (item: any) => {
        setSelectedId(item.id)
        const jobOrder = (await get({ route: `/api/job-orders/${item.id}` })).data
        console.log(jobOrder)
        setPresetData({
            truckId: jobOrder.truckId, plate: jobOrder.plate, make: jobOrder.make, model: jobOrder.model,
            customerId: jobOrder.customerId, name: jobOrder.customerName, username: jobOrder.customerUsername,
            contractorId: jobOrder.contractorId, contractorName: jobOrder.contractorName, contractorUsername: jobOrder.contractorUsername,
            description: jobOrder.description, labor: jobOrder.labor / 100 || null,
            materials: jobOrder.materials.map((mat: Material) => ({id: mat.id, materialName: mat.materialName, quantity: mat.quantity, price: mat.price! / 100}))
        } as FormData)
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

    if (loading) return <Loading />;

    const jobOrderItems = data.data?.jobOrders || [];

    const activeJobOrders: ActiveJobOrder[] = jobOrderItems.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrderCode,
            status: item.status,
            plateNumber: item.plateNumber,
            contractor: <Link to={`/contractors/${item.contractorId}`}>{item.contractorName}</Link>,
            totalBill: item.totalBill,
            balance: item.balance,
            options:
                <Options
                    onEdit={() => handleEdit(item)}
                    onDelete={() => { setSelectedId(item.id); setShowDeleteModal(true) }}
                >
                    <button onClick={() => {
                        setSelectedId(item.id)
                        setShowModal('change')
                        setSelectedJobOrder({ jobNumber: item.jobOrderCode, status: (item.status as string).toLowerCase() })
                    }}>
                        <Icon name="edit" />Change Status
                    </button>
                </Options>
        })
    );


    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Job#, Plate#, or Contractor" />

                <TableFilter.Group>
                    <Selection
                        options={statusOptions}
                        value={statusParams}
                        onChange={(e) => setStatusParams(e.target.value)}
                    />
                    <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
                </TableFilter.Group>
            </TableFilter>

            <Table columns={activeJobOrderColumns} rows={activeJobOrders} withOptions={true} />

            {error && <ErrorModal error={error!} closeError={closeError} />}

            {(error || deleteError) ?
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
                : showDeleteModal &&
                <ConfirmModal
                    title="Delete Job Order"
                    message="Are you sure you want to delete this job orders?"
                    onClose={() => { setShowDeleteModal(false) }}
                    onConfirm={handleDelete} red={true}
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}