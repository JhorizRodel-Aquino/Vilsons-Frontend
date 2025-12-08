import StatusIndicator from "../../../components/StatusIndicator";
import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import type { Status } from "../../../config/statusConfig";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";

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

export default function ActiveOrdersTable({ data }: { data: [] }) {
    const actives = data || []

    const activeOrders: ActiveOrder[] = actives.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrderCode,
            owner: item.customerFullName,
            status: item.status,
            totalBill: item.totalBill,
        })
    );

    return (
        <Table columns={activeOrderColumns} rows={activeOrders} />
    )
}