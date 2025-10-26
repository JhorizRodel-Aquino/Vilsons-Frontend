import type { Column } from "../../../components/table/Table";
import Table from "../../../components/table/Table"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange";
import useGetByDateRange from "../../../hooks/useGetByDateRange";
import Loading from "../../../components/Loading";
import ErrorModal from "../../../components/ErrorModal";
import formatDate from "../../../utils/formatDate";

type ActivityLog = {
    activity: string;
    datetime: string;
};

const activityLogColumns: Column<ActivityLog>[] = [
    { key: "activity", label: "Activity" },
    { key: "datetime", label: "Datetime", render: (value) => formatDate(value) },
];

export default function ActivityLogsTable() {
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams } = useGetByDateRange('/api/activity-logs');

    if (loading) return <Loading />;

    const activityItems = data.data?.activities || [];

    const activityLogs: ActivityLog[] = activityItems.map(
        (item: Record<string, any>) => ({
            activity: item.activity,
            datetime: item.createdAt,
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Activity" />
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={activityLogColumns} rows={activityLogs} />

            {error && <ErrorModal error={error} closeError={closeError} />}
        </>
    )
}