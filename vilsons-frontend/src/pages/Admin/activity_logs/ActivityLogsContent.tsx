import type { Column } from "../../../components/StandardTable";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange";
import StandardTable from "../../../components/StandardTable"

export default function ActivityLogsContent() {
    type ActivityLog = { 
        activity: string;
        datetime: string;
    };

    const activityLogColumns: Column<ActivityLog>[] = [
        {key: "activity", label: "Activity"},
        {key: "datetime", label: "Datetime"},
    ];

    const activityLogs: ActivityLog[] = [
        {activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM'},
        {activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM'},
        {activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM'},
        {activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM'},
        {activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM'},
        {activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM'},
        {activity: 'Admin Kinlie created a new job order JO-00233', datetime: 'Jan 4, 2022 11:30 AM'},
    ];

    return (
        <>
            <Info>
                <Details subtitle={'All Activities'} modifiedDate="Aug 9, 2025" />
            </Info>

            <TableFilter>
                <SearchBar />
                <DateRange />
            </TableFilter>

            <StandardTable columns={activityLogColumns} rows={activityLogs} />
        </>
    )
}