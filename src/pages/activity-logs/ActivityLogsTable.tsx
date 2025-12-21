import type { Column } from "../../components/table/Table";
import Table from "../../components/table/Table"
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import formatDate from "../../utils/formatDate";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";

type ActivityLog = {
    activity: string;
    remarks: string;
    branch: string;
    datetime: string;
};

const activityLogColumns: Column<ActivityLog>[] = [
    { key: "activity", label: "Activity" },
    { key: "remarks", label: "Remarks" },
    { key: "branch", label: "Branch" },
    { key: "datetime", label: "Datetime", render: (value) => formatDate(value) },
];

export default function ActivityLogsTable() {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, branchParams, setBranchParams } = useGetByDateRange('/api/activity-logs');

    if (loading) return <Loading />;

    const activityItems = data.data?.activities || [];

    const activityLogs: ActivityLog[] = activityItems.map(
        (item: Record<string, any>) => ({
            activity: item.activity,
            remarks: item.remarks || '',
            branch: item?.branch?.branchName || "",
            datetime: item.createdAt,
        })
    );

    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Activity" />
                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={activityLogColumns} rows={activityLogs} />

            {error && <ErrorModal error={error} closeError={closeError} />}
        </>
    )
}