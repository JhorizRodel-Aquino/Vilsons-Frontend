import type { Status } from "../../../config/statusConfig";
import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import StatusFilter from "../../../components/StatusFilter"
import DateRange from "../../../components/DateRange"
import Table from "../../../components/table/Table"
import StatusIndicator from "../../../components/StatusIndicator";
import formatPesoFromCents from '../../../utils/formatPesoFromCents';

export default function ActiveOrdersTable() {
    type ActiveJobOrder = { 
        jobNumber: string; 
        status: Status;
        plateNumber: string; 
        contractor: string; 
        totalBill: number; 
        balance: number; 
    };

    const activeJobOrderColumns: Column<ActiveJobOrder>[] = [
        {key: "jobNumber", label: "Job Number"},
        {key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} />},
        {key: "plateNumber", label: "Plate Number"},
        {key: "contractor", label: "Contractor"},
        {key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number)},
        {key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number)},
    ] ;

    const activeJobOrders: ActiveJobOrder[] = [
        {jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />

                <TableFilter.Group>
                    <StatusFilter />
                    <DateRange />
                </TableFilter.Group>
            </TableFilter>

            <Table columns={activeJobOrderColumns} rows={activeJobOrders} />
        </>
    )
}