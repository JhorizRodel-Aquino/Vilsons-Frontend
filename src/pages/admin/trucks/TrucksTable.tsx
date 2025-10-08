import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange";
import Table from "../../../components/table/Table"
import useGetTrucks from "../../../hooks/trucks/useGetTrucks";
import Loading from "../../../components/Loading";
import ErrorModal from "../../../components/ErrorModal";
import formatDate from "../../../utils/formatDate";

export default function TrucksTable() {
    const { data, loading, error, closeError, searchParams, setSearchParams, dateRangeParams, setDateRangeParams } = useGetTrucks();
    if (loading) return <Loading />;

    const truckItems = data.data?.trucks || [];

    type Truck = {
        plateNumber: string;
        make: string;
        model: string;
        owner: string;
        dateAdded: string;
    };

    const truckColumns: Column<Truck>[] = [
        { key: "plateNumber", label: "Plate Number" },
        { key: "make", label: "Make" },
        { key: "model", label: "Model" },
        { key: "owner", label: "Owner" },
        { key: "dateAdded", label: "Date Added", render: (isoDate) => formatDate(isoDate as string) },
    ];

    const trucks: Truck[] = truckItems.map(
        (item: Record<string, any>) => ({
            plateNumber: item.plate,
            make: item.make,
            model: item.model,
            owner: item.customerFullName,
            dateAdded: item.createdAt
        })
    );


    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams}/>
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={truckColumns} rows={trucks} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}
