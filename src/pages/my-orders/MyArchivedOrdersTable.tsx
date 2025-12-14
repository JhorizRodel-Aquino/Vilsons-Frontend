import { type ReactElement } from "react";
import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange"
import Table from "../../components/table/Table"
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import Loading from "../../components/Loading";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import ErrorModal from "../../components/ErrorModal";
import { Link } from "react-router";

    type ArchivedJobOrder = {
        jobNumber: string;
        plateNumber: string;
        contractor: ReactElement;
        totalBill: number;
        balance: number;
    };

    const archivedJobOrderColumns: Column<ArchivedJobOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "plateNumber", label: "Plate Number" },
        { key: "contractor", label: "Contractor", render: (value) => value as React.ReactElement },
        { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
        { key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number) },
    ];
    
export default function MyActiveOrdersTable() {
    const { data, loading, error, closeError, searchParams, setSearchParams, dateRangeParams, setDateRangeParams } = useGetByDateRange('/api/me/my-job-orders/group/archived');
    if (loading) return <Loading />;

    const jobOrderItems = data.data?.jobOrders || [];

    const archivedJobOrders: ArchivedJobOrder[] = jobOrderItems.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrderCode,
            plateNumber: item.plateNumber,
            contractor: <Link to={`/contractors/${item.contractorId}`}>{item.contractorName}</Link>,
            totalBill: item.totalBill,
            balance: item.totalBalance,
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Job#, Plate#, or Contractor" />
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={archivedJobOrderColumns} rows={archivedJobOrders} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}