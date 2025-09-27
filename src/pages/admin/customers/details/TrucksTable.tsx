import Table from "../../../../components/table/Table";
import type { Column } from "../../../../components/table/Table";

export default function TrucksTable() {
    type Truck = { 
        plateNumber: string; 
        make: string;
        model: string; 

        dateAdded: string;
    };

    const truckColumns: Column<Truck>[] = [
        {key: "plateNumber", label: "Plate Number"},
        {key: "make", label: "Make"},
        {key: "model", label: "Model"},
        {key: "dateAdded", label: "Date Added"},
    ];

    const trucks: Truck[] = [
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', dateAdded: 'Jan 4, 2022'},
        {make: 'Toyota', plateNumber: 'ABD-322', model: 'Innova', dateAdded: 'Jan 4, 2022'},
    ];

    return (
        <Table columns={truckColumns} rows={trucks} />
    )
}