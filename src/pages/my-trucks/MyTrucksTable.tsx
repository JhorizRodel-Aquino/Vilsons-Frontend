import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange";
import Table from "../../components/table/Table"
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import formatDate from "../../utils/formatDate";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import { useEffect, type ReactElement } from "react";
import { Link } from "react-router";

type Truck = {
    plateNumber: string;
    make: string;
    model: string;
    engine: string;
    owner: string;
    dateAdded: string;
    options: ReactElement;
};

const truckColumns: Column<Truck>[] = [
    { key: "plateNumber", label: "Plate Number", render: (value) => value as React.ReactElement },
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "engine", label: "Engine" },
    { key: "dateAdded", label: "Date Added", render: (isoDate) => formatDate(isoDate as string, 'date') },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

// type TrucksTableProps = {
//     setPresetData: (presets: FormData) => void,
//     reloadFlag: boolean,
//     setShowModal: (action: 'create' | 'edit' | "change" | null) => void;
//     selectedId: string;
//     setSelectedId: (id: string) => void;
//     setSelectedTruck: (truck: { plate: string }) => void;
//     setInvalidateData: (data: Record<string, any>) => void;
// }

export default function MyTrucksTable({ setLastUpdated }: { setLastUpdated: (date: string | undefined) => void; }) {
    const { data, loading, error, closeError, searchParams, setSearchParams, dateRangeParams, setDateRangeParams } = useGetByDateRange('/api/me/my-trucks');

    useEffect(() => {
        if (data && data.lastUpdatedAt) {
            setLastUpdated(data?.lastUpdatedAt);
        }
    }, [data, setLastUpdated]);

    if (loading) return <Loading />;

    const truckItems = data.data?.trucks || [];

    const trucks: Truck[] = truckItems.map(
        (item: Record<string, any>) => ({
            plateNumber: <Link to={`/my-trucks/${item.id}`}>{item.plate}</Link>,
            make: item.make,
            model: item.model,
            engine: item.engine || '',
            dateAdded: item.createdAt,
        })
    );


    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Truck Make, Model" />
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={truckColumns} rows={trucks} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}
