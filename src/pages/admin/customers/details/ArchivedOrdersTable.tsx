import Table from "../../../../components/table/Table";
import type { Column } from "../../../../components/table/Table";
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";

export default function ArchivedOrdersTable() {
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

    const archivedOrders: ArchivedOrder[] = [
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    ];

    return (
        <Table columns={archivedOrderColumns} rows={archivedOrders} />
    )
}