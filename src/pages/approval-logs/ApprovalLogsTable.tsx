import type { Column } from "../../components/table/Table";
import Table from "../../components/table/Table"
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import formatDate from "../../utils/formatDate";
import parsePayloadToHTML from "../../utils/parsePayloadToHTML";
import { useEffect, useState, type ReactElement } from "react";
import Button from "../../components/Button";
import usePostData from "../../hooks/usePostData";
import usePostPutData from "../../hooks/usePostPutData";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";

type ApprovalLog = {
    tableName: string;
    actionType: string;
    payload: string;
    requestedByUser: string;
    // approvedByUser: string;
    status: string;
    datetime: string;
    action: ReactElement
};

const approvalLogColumns: Column<ApprovalLog>[] = [
    { key: "tableName", label: "Resource" },
    { key: "actionType", label: "Method", render: (value) => (value as string).charAt(0).toUpperCase() + (value as string).slice(1) },
    {
        key: "payload",
        label: "New Data",
        render: (value) => {
            const htmlContent = parsePayloadToHTML(value);
            return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
        }
    },
    { key: "datetime", label: "Requested On", render: (value) => value as ReactElement },
    { key: "requestedByUser", label: "Requested By" },
    // { key: "approvedByUser", label: "Approved By" },
    { key: "status", label: "Status", render: (value) => (value as string).charAt(0).toUpperCase() + (value as string).slice(1) },
    { key: "action", label: "Action", render: (value) => value as ReactElement },
];

export default function ApprovalLogsTable() {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, branchParams, setBranchParams } = useGetByDateRange('/api/approval-logs');
    const { error: approveError, closeError: approveCloseError, putData } = usePostPutData(`/api/approval-logs/${action}`);

    useEffect(() => {
        const handleApproval = async () => {
            if (selectedId && action) {
                const success = await putData(selectedId, { responseComment: '_' });
                if (success) {
                    reload();
                }
                // Reset states regardless of success/failure
                setSelectedId(null);
                setAction(null);
            }
        };

        handleApproval();
    }, [selectedId, action]);

    if (loading) return <Loading />;

    const approvalItems = data?.data || [];

    const approvalLogs: ApprovalLog[] = approvalItems.map(
        (item: Record<string, any>) => ({
            tableName: item.tableName,
            actionType: item.actionType,
            payload: item.payload,
            requestedByUser: item.requestedByUser,
            // approvedByUser: item.approvedByUser || '',
            status: item.status,
            datetime: <div>{formatDate(item.createdAt as string, "date")} <br /> {formatDate(item.createdAt as string, "time")}</div>,
            action: <div className="grid gap-2">
                <Button label="Accept" onClick={() => { setSelectedId(item.id); setAction('approve') }} />
                <Button label="Reject" variant="outline" onClick={() => { setSelectedId(item.id); setAction('reject') }} />
            </div>
        })
    );

    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Approval" />

                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={approvalLogColumns} rows={approvalLogs} />

            {(error || approveError) && <ErrorModal error={(error || approveError)!} closeError={error ? closeError : approveCloseError} />}
        </>
    )
}