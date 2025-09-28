import type { Column } from "../../../components/table/Table";
import Table from "../../../components/table/Table"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange";

export default function ActivityLogsTable() {
    type ActivityLog = {
        activity: string;
        datetime: string;
    };

    const activityLogColumns: Column<ActivityLog>[] = [
        { key: "activity", label: "Activity" },
        { key: "datetime", label: "Datetime" },
    ];

    const activityLogs: ActivityLog[] = [
        { activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM' },
        { activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM' },
        { activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM' },
        { activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM' },
        { activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM' },
        { activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM' },
        { activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM' },
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />
                <DateRange />
            </TableFilter>

            <Table columns={activityLogColumns} rows={activityLogs} />
        </>
    )
}