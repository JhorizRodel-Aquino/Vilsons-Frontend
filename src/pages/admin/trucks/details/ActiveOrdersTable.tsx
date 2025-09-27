import StatusIndicator from "../../../../components/StatusIndicator";
import Table from "../../../../components/table/Table";
import type { Column } from "../../../../components/table/Table";
import type { Status } from "../../../../config/statusConfig";
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";

export default function ActiveOrdersTable() {
    type ActiveOrder = {
        jobNumber: string;
        owner: string;
        status: string;
        totalBill: number;
    };

    const activeOrderColumns: Column<ActiveOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "owner", label: "Owner" },
        { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
        { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    ];

    const activeOrders: ActiveOrder[] = [
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
        { jobNumber: 'JO-25-233', owner: 'ABD-322', status: 'ongoing', totalBill: 102000 },
    ];

    return (
        <Table columns={activeOrderColumns} rows={activeOrders} />
    )
}