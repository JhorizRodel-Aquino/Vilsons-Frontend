import { useEffect, useState, type ReactElement } from "react";
import type { Status } from "../../config/statusConfig";
import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange"
import Table from "../../components/table/Table"
import StatusIndicator from "../../components/StatusIndicator";
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import Options from "../../components/Options";
import Icon from "../../components/Icon";
import ConfirmModal from "../../components/ConfirmModal";
import Loading from "../../components/Loading";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import ErrorModal from "../../components/ErrorModal";
import { Link } from "react-router";
import type { FormData, Material } from "./JobOrderModal";
import { get } from "../../services/apiService";
import useDeleteData from "../../hooks/useDeleteData";
import Selection from "../../components/Selection";
import getStatuses from "../../utils/statusOptions";
import Button from "../../components/Button";
import usePostPutData from "../../hooks/usePostPutData";
import { getBranches } from "../../services/branchService";
import { hasPermissions } from "../../services/permissionService";

type ActiveJobOrder = {
    jobNumber: ReactElement;
    status: Status;
    plateNumber: string;
    contractor: ReactElement;
    totalBill: number;
    balance: number;
    action: ReactElement
    options: ReactElement
};

const activeJobOrderColumns: Column<ActiveJobOrder>[] = [
    { key: "jobNumber", label: "Job Number", render: (value) => value as ReactElement },
    { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
    { key: "plateNumber", label: "Plate Number" },
    { key: "contractor", label: "Contractor", render: (value) => value as React.ReactElement },
    { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    { key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number) },
    { key: "action", label: "Action", render: (value) => value as ReactElement },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type ActiveOrdersTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | 'status' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    setSelectedJobOrder: ({ }: { jobNumber: string, status: string }) => void;
    setInvalidateData: (data: Record<string, any>) => void;
    setLastUpdated: (date: string | undefined) => void;
}

export default function ActiveOrdersTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId, setSelectedJobOrder, setInvalidateData, setLastUpdated }: ActiveOrdersTableProps) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const statusOptions = [{ value: "", label: "All Statuses" }, ...getStatuses()];
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, statusParams, setStatusParams, branchParams, setBranchParams } = useGetByDateRange('/api/job-orders/group/active');
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/job-orders');

    const [action, setAction] = useState<'accept' | 'reject' | 'released' | 'completed' | null>(null);
    const { error: approveError, closeError: closeApproveError, putData } = usePostPutData(`/api/job-orders/${action}`);

    useEffect(() => {
        if (data && data.lastUpdatedAt) {
            setLastUpdated(data?.lastUpdatedAt);
        }
    }, [data, setLastUpdated]);

    useEffect(() => {
        const handleApproval = async () => {
            if (selectedId && action) {
                const success = await putData(selectedId, { responseComment: '_' });
                if (success) {
                    reload();
                }
                // Reset states regardless of success/failure
                setSelectedId('');
                setAction(null);
            }
        };

        handleApproval();
    }, [selectedId, action]);

    const handleEdit = async (item: any) => {
        setSelectedId(item.id)
        const jobOrder = (await get({ route: `/api/job-orders/${item.id}` })).data
        console.log(jobOrder)
        setPresetData({
            truckId: jobOrder.truckId, plate: jobOrder.plate, make: jobOrder.make, model: jobOrder.model,
            customerId: jobOrder.customerId, name: jobOrder.customerName, username: jobOrder.customerUsername,
            contractorId: jobOrder.contractorId, contractorName: jobOrder.contractorName, contractorUsername: jobOrder.contractorUsername,
            description: jobOrder.description, labor: jobOrder.labor / 100 || null,
            materials: jobOrder.materials.map((mat: Material) => ({ id: mat.id, materialName: mat.materialName, quantity: mat.quantity, price: mat.price! / 100 })), remarks: ""
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
            jobNumber: hasPermissions(['view_job_order_details']) ? <Link to={`/job-orders/${item.id}`}>{item.jobOrderCode}</Link> : item.jobOrderCode,
            status: item.status,
            plateNumber: item.plateNumber,
            contractor: hasPermissions(['view_contractor_details']) ? <Link to={`/contractors/${item.contractorId}`}>{item.contractorName}</Link> : item.contractorName,
            totalBill: item.totalBill,
            balance: item.balance,
            action: item.status.toLowerCase() === 'completed' ?
                (hasPermissions(['handle_completed_job_orders']) &&
                    <div className="flex gap-2">
                        <Button label="Accept" variant="primary" size="mini" onClick={() => { setSelectedId(item.id); setAction('accept') }} />
                        <Button label="Reject" variant="outline" size="mini" onClick={() => { setSelectedId(item.id); setAction('reject') }} />
                    </div>)
                : item.status.toLowerCase() === 'forrelease' ?
                    (hasPermissions(['handle_completed_job_orders']) &&
                        <Button label="Released" variant="primary" size="mini" onClick={() => { setSelectedId(item.id); setAction('released') }} />)
                    : item.status.toLowerCase() === 'ongoing' ?
                        (hasPermissions(['handle_completed_job_orders']) &&
                            <Button label="Mark as Completed" variant="primary" size="mini" onClick={() => { setSelectedId(item.id); setAction('completed') }} />)
                        : <></>,
            options:
                <Options
                    onEdit={hasPermissions(['edit_job_order']) ? () => handleEdit(item) : undefined}
                    onDelete={hasPermissions(['delete_job_order']) ? () => { setSelectedId(item.id); setShowDeleteModal(true) } : undefined}
                >
                    {hasPermissions(['change_job_order_status']) && <button onClick={() => {
                        setSelectedId(item.id)
                        setShowModal('status')
                        setSelectedJobOrder({ jobNumber: item.jobOrderCode, status: (item.status as string) })
                        setInvalidateData({ customerId: item.customerId, contractorId: item.contractorId, truckId: item.truckId });
                    }}>
                        <Icon name="edit" size={20} />Change Status
                    </button>}
                </Options>
        })
    );



    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Job#, Plate#, or Contractor" />

                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>

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

            {(error || deleteError || approveError) ?
                <ErrorModal error={(error || deleteError || approveError)!} closeError={error ? closeError : deleteError ? closeDeleteError : closeApproveError} />
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