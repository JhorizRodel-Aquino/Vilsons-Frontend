import type { Status } from "../../../config/statusConfig";
import type { Column } from "../../../components/table/Table";
import StatusIndicator from "../../../components/StatusIndicator";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import StatusFilter from "../../../components/StatusFilter"
import DateRange from "../../../components/DateRange"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';

export default function ActiveTabContent() {
    type JobOrder = { 
        jobNumber: string; 
        status: Status;
        plateNumber: string; 
        contractor: string; 
        totalBill: number; 
        balance: number; 
    };

    const jobOrderColumns: Column<JobOrder>[] = [
        {key: "jobNumber", label: "Job Number"},
        {key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} />},
        {key: "plateNumber", label: "Plate Number"},
        {key: "contractor", label: "Contractor"},
        {key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number)},
        {key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number)},
    ] ;

    const jobOrders: JobOrder[] = [
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
            <Info>
                <Details subtitle={'All Active Job Orders'} modifiedDate="Aug 9, 2025" />
                <Button label={'Create Job Order'} onClick={() => console.log('clicked')} variant="primary" />
            </Info>

            <TableFilter>
                <SearchBar />

                <TableFilter.Group>
                    <StatusFilter />
                    <DateRange />
                </TableFilter.Group>
            </TableFilter>

            <Table columns={jobOrderColumns} rows={jobOrders} />
        </>
    )
}