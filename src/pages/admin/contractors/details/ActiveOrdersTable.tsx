import StatusIndicator from "../../../../components/StatusIndicator";
import Table from "../../../../components/table/Table";
import type { Column } from "../../../../components/table/Table";
import type { Status } from "../../../../config/statusConfig";
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";

export default function ActiveOrdersTable() {
    type ActiveOrder = {
        jobNumber: string;
        plateNumber: string;
        status: string;
        totalBill: number;
        contractorCommission: number;
        shopCommission: number;
    };

    const activeOrderColumns: Column<ActiveOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "plateNumber", label: "Plate Number" },
        { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
        { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
        { key: "contractorCommission", label: "Commission", render: (value) => formatPesoFromCents(value as number) },
        { key: "shopCommission", label: "Shop Commission", render: (value) => formatPesoFromCents(value as number) },
    ];

    const activeOrders: ActiveOrder[] = [
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', status: 'ongoing', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    ];

    return (
        <Table columns={activeOrderColumns} rows={activeOrders} />
    )
}