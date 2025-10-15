import type React from "react";
import Options from "../../../../components/Options";
import StatusIndicator from "../../../../components/StatusIndicator";
import Table from "../../../../components/table/Table";
import type { Column } from "../../../../components/table/Table";
import type { Status } from "../../../../config/statusConfig";
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";
import type { ReactElement } from "react";

type ActiveOrder = {
    jobNumber: string;
    plateNumber: string;
    status: string;
    totalBill: number;
    contractorCommission: number;
    shopCommission: number;
    options: ReactElement;
};

const activeOrderColumns: Column<ActiveOrder>[] = [
    { key: "jobNumber", label: "Job Number" },
    { key: "plateNumber", label: "Plate Number" },
    { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
    { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    { key: "contractorCommission", label: "Commission", render: (value) => formatPesoFromCents(value as number) },
    { key: "shopCommission", label: "Shop Commission", render: (value) => formatPesoFromCents(value as number) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

export default function ActiveOrdersTable({ data }: { data: [] }) {

    const actives = data || []

    const activeOrders: ActiveOrder[] = actives.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrderCode,
            plateNumber: item.plate,
            status: item.status,
            totalBill: item.totalBill,
            contractorCommission: item.contractorCommission,
            shopCommission: item.shopCommission,
            options:
                <Options
                // onEdit={() => handleEdit(item)}
                // onDelete={() => { setSelectedId(item.id); setShowDeleteModal(true) }}
                />
        })
    );

    return (
        <Table columns={activeOrderColumns} rows={activeOrders} withOptions={true} />
    )
}