import type { Column } from "../../../components/table/Table";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import StatusFilter from "../../../components/StatusFilter"
import DateRange from "../../../components/DateRange"
import Table from "../../../components/table/Table"

export default function ActiveTabContent() {
    type JobOrder = { 
        jobNumber: string; 
        plateNumber: string; 
        contractor: string; 
        totalBill: number; 
        balance: number; 
    };

    const jobOrderColumns: Column<JobOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "plateNumber", label: "Plate Number" },
        { key: "contractor", label: "Contractor" },
        { key: "totalBill", label: "Total Bill" },
        { key: "balance", label: "Balance" },
    ] ;

    const jobOrders: JobOrder[] = [
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
        {jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000},
    ];

    return (
        <>
            <Info>
                <Details subtitle={'All Archived Job Orders'} modifiedDate="Aug 9, 2025" />
            </Info>

            <TableFilter>
                <SearchBar />

                <TableFilter.Group>
                    <DateRange />
                </TableFilter.Group>
            </TableFilter>

            <Table columns={jobOrderColumns} rows={jobOrders} />
        </>
    )
}