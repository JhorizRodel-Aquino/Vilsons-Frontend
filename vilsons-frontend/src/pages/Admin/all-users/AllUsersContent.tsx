import type { Column } from "../../../components/table/Table";
import Info from "../../../components/Info"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import DateRange from "../../../components/DateRange";

export default function AllUserContent() {
    type AllUser = { 
        name: string; 
        username: string; 
        role: string; 
        datetime: string; 
    };

    const allUserColumns: Column<AllUser>[] = [
        {key: "name", label: "Name"},
        {key: "username", label: "User Name"},
        {key: "role", label: "Role"},
        {key: "datetime", label: "Datetime"},
    ] ;

    const allUsers: AllUser[] = [
        {name: 'Jhoriz Rodel Aquino', username: 'jrfa22', role: 'Admin', datetime: 'Jan 4, 2022 11:30 AM'},
        {name: 'Jhoriz Rodel Aquino', username: 'jrfa22', role: 'Customer', datetime: 'Jan 4, 2022 11:30 AM'},
        {name: 'Jhoriz Rodel Aquino', username: 'jrfa22', role: 'Employee', datetime: 'Jan 4, 2022 11:30 AM'},
        {name: 'Jhoriz Rodel Aquino', username: 'jrfa22', role: 'Contractor', datetime: 'Jan 4, 2022 11:30 AM'},
        {name: 'Jhoriz Rodel Aquino', username: 'jrfa22', role: 'Contractor', datetime: 'Jan 4, 2022 11:30 AM'},
        {name: 'Jhoriz Rodel Aquino', username: 'jrfa22', role: 'Customer', datetime: 'Jan 4, 2022 11:30 AM'},
        {name: 'Jhoriz Rodel Aquino', username: 'jrfa22', role: 'Employee', datetime: 'Jan 4, 2022 11:30 AM'},
    ];

    return (
        <>
            <Info>
                <Details subtitle={'All Users'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add User'} onClick={() => console.log('clicked')} variant="primary" />
            </Info>

            <TableFilter>
                <SearchBar />
                <DateRange />
            </TableFilter>

            <Table columns={allUserColumns} rows={allUsers}/>
        </>
    )
}