import type { Column } from "../../../components/StandardTable";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange"
import StandardTable from "../../../components/StandardTable"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';

export default function JobOrdersActiveTabContent() {
    type ArchivedJobOrder = { 
        jobNumber: string; 
        plateNumber: string; 
        contractor: string; 
        totalBill: number; 
        balance: number; 
    };

    const archivedJobOrderColumns: Column<ArchivedJobOrder>[] = [
        {key: "jobNumber", label: "Job Number"},
        {key: "plateNumber", label: "Plate Number"},
        {key: "contractor", label: "Contractor"},
        {key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number)},
        {key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number)},
    ] ;

    const archivedJobOrders: ArchivedJobOrder[] = [
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
                <DateRange />
            </TableFilter>

            <StandardTable columns={archivedJobOrderColumns} rows={archivedJobOrders} />
        </>
    )
}