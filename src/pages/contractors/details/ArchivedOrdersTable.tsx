import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";

type ArchivedOrder = {
    jobNumber: string;
    plateNumber: string;
    totalBill: number;
    contractorCommission: number;
    shopCommission: number;
};

const archivedOrderColumns: Column<ArchivedOrder>[] = [
    { key: "jobNumber", label: "Job Number" },
    { key: "plateNumber", label: "Plate Number" },
    { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    { key: "contractorCommission", label: "Commission", render: (value) => formatPesoFromCents(value as number) },
    { key: "shopCommission", label: "Shop Commission", render: (value) => formatPesoFromCents(value as number) },
];


export default function ArchivedOrdersTable({ data }: { data: [] }) {
    const archives = data || []
    const archivedOrders: ArchivedOrder[] = archives.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrderCode,
            plateNumber: item.plate,
            totalBill: item.totalBill,
            contractorCommission: item.contractorCommission,
            shopCommission: item.shopCommission,
        })
    );

    return (
        <Table columns={archivedOrderColumns} rows={archivedOrders} />
    )
}