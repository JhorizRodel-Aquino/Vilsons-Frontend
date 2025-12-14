import { useEffect, useState, type ReactElement } from "react";
import type { Status } from "../../config/statusConfig";
import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange"
import Table from "../../components/table/Table"
import StatusIndicator from "../../components/StatusIndicator";
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import Loading from "../../components/Loading";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import ErrorModal from "../../components/ErrorModal";
import { Link } from "react-router";
import Selection from "../../components/Selection";
import getStatuses from "../../utils/statusOptions";
import Button from "../../components/Button";
import usePostPutData from "../../hooks/usePostPutData";
import { getBranches } from "../../services/branchService";
import { hasPermissions } from "../../services/permissionService";
import { invalidateCache } from "../../hooks/useGetData";

type ActiveJobOrder = {
    jobNumber: ReactElement;
    status: Status;
    plateNumber: string;
    contractorCommission: number;
    action: ReactElement
};

const activeJobOrderColumns: Column<ActiveJobOrder>[] = [
    { key: "jobNumber", label: "Job Number", render: (value) => value as ReactElement },
    { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
    { key: "plateNumber", label: "Plate Number" },
    { key: "contractorCommission", label: "My Commission", render: (value) => formatPesoFromCents(value as number) },
    { key: "action", label: "Action", render: (value) => value as ReactElement },
];


export default function AssignedActiveOrdersTable() {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const statusOptions = [{ value: "", label: "All Statuses" }, ...getStatuses()];
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, statusParams, setStatusParams, branchParams, setBranchParams } = useGetByDateRange('/api/me/assigned-job-orders/group/active');
    const [selectedId, setSelectedId] = useState<string>('');
    const [action, setAction] = useState<'accept' | 'reject' | 'completed' | null>(null);
    const { error: approveError, closeError: closeApproveError, putData } = usePostPutData(`/api/me/assigned-job-orders/action/${action}`);

    useEffect(() => {
        const handleApproval = async () => {
            if (selectedId && action) {
                const success = await putData(selectedId);
                if (success) {
                    reload();

                    invalidateCache(`/api/me/assigned-job-orders/${selectedId}`);
                }
                // Reset states regardless of success/failure
                setSelectedId('');
                setAction(null);
            }
        };

        handleApproval();
    }, [selectedId, action]);


    if (loading) return <Loading />;

    const jobOrderItems = data.data?.jobOrders || [];

    const activeJobOrders: ActiveJobOrder[] = jobOrderItems.map(
        (item: Record<string, any>) => ({
            jobNumber: hasPermissions(['view_contractor_assigned_job_order_details']) ? <Link to={`/assigned-orders/${item.id}`}>{item.jobOrderCode}</Link> : item.jobOrderCode,
            status: item.status,
            plateNumber: item.plateNumber,
            contractorCommission: item.contractorCommission,
            action: item.status.toLowerCase() === 'pending' ?
                (hasPermissions(['handle_contractor_assigned_job_orders']) &&
                    <div className="flex gap-2">
                        <Button label="Accept" variant="primary" size="mini" onClick={() => { setSelectedId(item.id); setAction('accept') }} />
                        <Button label="Reject" variant="outline" size="mini" onClick={() => { setSelectedId(item.id); setAction('reject') }} />
                    </div>)
                : item.status.toLowerCase() === 'ongoing' &&
                (hasPermissions(['handle_contractor_assigned_job_orders']) &&
                    <Button label="Mark As Complete" variant="primary" size="mini" onClick={() => { setSelectedId(item.id); setAction('completed') }} />)
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

            <Table columns={activeJobOrderColumns} rows={activeJobOrders} />

            {error && <ErrorModal error={error!} closeError={closeError} />}

            {(error || approveError) && <ErrorModal error={(error || approveError)!} closeError={error ? closeError : closeApproveError} />

            }
        </>
    )
}