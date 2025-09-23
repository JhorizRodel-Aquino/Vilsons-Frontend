import type { Column } from "../../../components/StandardTable";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import DateRange from "../../../components/DateRange";
import Table from "../../../components/StandardTable"

export default function TrucksContent() {
    type Truck = { 
        plateNumber: string; 
        make: string;
        model: string; 
        owner: string;
        dateAdded: string;
    };

    const truckColumns: Column<Truck>[] = [
        {key: "plateNumber", label: "Plate Number"},
        {key: "make", label: "Make"},
        {key: "model", label: "Model"},
        {key: "owner", label: "Owner"},
        {key: "dateAdded", label: "DateAdded"},
    ];

    const trucks: Truck[] = [
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', owner: 'Venice Transport', dateAdded: 'Jan 4, 2022'},
    ];

    return (
        <>
            <Info>
                <Details subtitle={'All Trucks'} modifiedDate="Aug 9, 2025" />
            </Info>

            <TableFilter>
                <SearchBar />
                <DateRange />
            </TableFilter>

            <Table columns={truckColumns} rows={trucks} />
        </>
    )
}