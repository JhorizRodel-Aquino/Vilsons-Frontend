import type { ReactElement } from "react";
import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange"
import Table from "../../../components/table/Table"
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import Options from "../../../components/Options";

export default function ArchivedOrdersTable() {
    type ArchivedJobOrder = {
        jobNumber: string;
        plateNumber: string;
        contractor: string;
        totalBill: number;
        balance: number;
        options: ReactElement
    };

    const archivedJobOrderColumns: Column<ArchivedJobOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "plateNumber", label: "Plate Number" },
        { key: "contractor", label: "Contractor" },
        { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
        { key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number) },
        { key: "options", label: "", render: (value) => value as React.ReactElement },
    ];

    const archivedJobOrders: ArchivedJobOrder[] = [
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, options: <Options onDelete={() => {}} /> },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, options: <Options onDelete={() => {}} /> },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, options: <Options onDelete={() => {}} /> },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, options: <Options onDelete={() => {}} /> },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, options: <Options onDelete={() => {}} /> },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, options: <Options onDelete={() => {}} /> },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, options: <Options onDelete={() => {}} /> },
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />
                <DateRange />
            </TableFilter>
            
            <Table columns={archivedJobOrderColumns} rows={archivedJobOrders} />
        </>
    )
}