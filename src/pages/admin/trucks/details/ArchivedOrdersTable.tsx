import Table from "../../../../components/table/Table";
import type { Column } from "../../../../components/table/Table";
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";

export default function ArchivedOrdersTable() {
    type ArchivedOrder = {
        jobNumber: string;
        owner: string;
        totalBill: number;
    };

    const archivedOrderColumns: Column<ArchivedOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "owner", label: "Owner" },
        { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    ];

    const archivedOrders: ArchivedOrder[] = [
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', totalBill: 102000 },
    ];


    return (
        <Table columns={archivedOrderColumns} rows={archivedOrders} />
    )
}