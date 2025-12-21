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
import usePostPutData from "../../hooks/usePostPutData";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";
import { hasPermissions } from "../../services/permissionService";
import Field from "../../components/Field";
import { toastWarning } from "../../utils/toastWarning";

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
    const [remarks, setRemarks] = useState("")
    const [showRejectModal, setShowRejectModal] = useState(false)
    // const [action, setAction] = useState<'approve' | 'reject' | null>(null);
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, branchParams, setBranchParams } = useGetByDateRange('/api/approval-logs');
    const { error: approveError, closeError: approveCloseError, putData, loading: approveLoading } = usePostPutData(`/api/approval-logs`);

    const handleApproval = async (action: "approve" | "reject", id: string | null) => {
        if (!remarks && action === "reject") {
            toastWarning("Remarks is required")
            return
        }
        if (action === "approve") setRemarks("")

        if (id) {
            const success = await putData(`${action}/${id}`, { responseComment: action === "reject" ? remarks : "" });
            if (success) {
                reload();
                setRemarks("")
                setShowRejectModal(false)
                setSelectedId(null); 
            }
            // Reset states regardless of success/failure
            
        }
    };



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
            action: hasPermissions(['handle_approval_logs']) &&
                <div className="grid gap-2">
                    <Button label="Accept" onClick={() => { handleApproval("approve", item.id); }} />
                    <Button label="Reject" variant="outline" onClick={() => { setSelectedId(item.id); setShowRejectModal(true) }} />
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

            {(error || approveError) ? <ErrorModal error={(error || approveError)!} closeError={error ? closeError : approveCloseError} />
                : showRejectModal &&
                <>
                    <form className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">Reject Action</h2>
                            <Button.X onClick={() => setShowRejectModal(false)} disabled={approveLoading} />
                        </div>

                        <div className="fields grid gap-5">
                            <fieldset className="card">
                                <h4 className="text-lg font-bold mb-3">Remarks</h4>
                                <Field.TextArea
                                    id="remarks"
                                    value={remarks}
                                    onChange={(e) => {
                                        setRemarks(e.target.value);
                                    }}
                                />
                            </fieldset>
                        </div>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={() => setShowRejectModal(false)} disabled={approveLoading} />
                            <Button variant="primary" label={approveLoading ? "Rejecting..." : "Reject"} onClick={() => {handleApproval("reject", selectedId)}} disabled={approveLoading} />
                        </div>
                    </form>
                    <div className="backdrop"></div>
                </>
            }
        </>
    )
}