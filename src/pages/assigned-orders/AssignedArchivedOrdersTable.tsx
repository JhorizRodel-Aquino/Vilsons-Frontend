import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange"
import Table from "../../components/table/Table"
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import Loading from "../../components/Loading";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import ErrorModal from "../../components/ErrorModal";
import { useEffect } from "react";

type ArchivedJobOrder = {
    jobNumber: string;
    plateNumber: string;
    contractorCommission: number;
};

const archivedJobOrderColumns: Column<ArchivedJobOrder>[] = [
    { key: "jobNumber", label: "Job Number" },
    { key: "plateNumber", label: "Plate Number" },
    { key: "contractorCommission", label: "My Commission", render: (value) => formatPesoFromCents(value as number) }
];

export default function AssignedArchivedOrdersTable({ setLastUpdated }: { setLastUpdated: (date: string | undefined) => void }) {
    const { data, loading, error, closeError, searchParams, setSearchParams, dateRangeParams, setDateRangeParams } = useGetByDateRange('/api/me/assigned-job-orders/group/archived');
    
    useEffect(() => {
        if (data && data.lastUpdatedAt) {
            setLastUpdated(data?.lastUpdatedAt);
        }
    }, [data, setLastUpdated]);

    if (loading) return <Loading />;

    const jobOrderItems = data.data?.jobOrders || [];

    const archivedJobOrders: ArchivedJobOrder[] = jobOrderItems.map(
        (item: Record<string, any>) => ({
            jobNumber: item.jobOrderCode,
            plateNumber: item.plateNumber,
            contractorCommission: item.contractorCommission,
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Job#, Plate#" />
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={archivedJobOrderColumns} rows={archivedJobOrders} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}