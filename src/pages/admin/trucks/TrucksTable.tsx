import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange";
import Table from "../../../components/table/Table"

export default function TrucksTable() {
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
        { key: "dateAdded", label: "Date Added" },
    ];

    const trucks: Truck[] = [
        { make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022' },
        { make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022' },
        { make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022' },
        { make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022' },
        { make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022' },
        { make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022' },
        { make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022' },
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />
                <DateRange />
            </TableFilter>

            <Table columns={truckColumns} rows={trucks} />
        </>
    )
}