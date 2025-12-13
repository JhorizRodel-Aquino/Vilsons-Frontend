import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";

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

export default function ArchivedOrdersTable({ data }: { data: [] }) {
    const archives = data || []

    const archivedOrders: ArchivedOrder[] = archives.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrderCode,
            owner: item.customerFullName,
            totalBill: item.totalBill,
        })
    );

    return (
        <Table columns={archivedOrderColumns} rows={archivedOrders} />
    )
}