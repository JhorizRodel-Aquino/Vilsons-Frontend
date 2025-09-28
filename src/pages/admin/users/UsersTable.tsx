import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import DateRange from "../../../components/DateRange";

export default function UserTable() {
    type AllUser = {
        name: string;
        username: string;
        roles: string[];
        datetime: string;
    };

    const allUserColumns: Column<AllUser>[] = [
        { key: "name", label: "Name" },
        { key: "username", label: "User Name" },
        {
            key: "roles", label: "Roles",
            render: (roles) => (
                (roles as string[]).map((role, i) => (
                    <div key={i}>
                        {role}{i < roles.length - 1 && ","}
                    </div>
                ))
            )
        },
        { key: "datetime", label: "Datetime" },
    ];

    const allUsers: AllUser[] = [
        { name: 'Jhoriz Rodel Aquino', username: 'jrfa22', roles: ['Manager', 'Employee'], datetime: 'Jan 4, 2022 11:30 AM' },
        { name: 'Jhoriz Rodel Aquino', username: 'jrfa22', roles: ['Customer'], datetime: 'Jan 4, 2022 11:30 AM' },
        { name: 'Jhoriz Rodel Aquino', username: 'jrfa22', roles: ['Employee'], datetime: 'Jan 4, 2022 11:30 AM' },
        { name: 'Jhoriz Rodel Aquino', username: 'jrfa22', roles: ['Admin'], datetime: 'Jan 4, 2022 11:30 AM' },
        { name: 'Jhoriz Rodel Aquino', username: 'jrfa22', roles: ['Contractor'], datetime: 'Jan 4, 2022 11:30 AM' },
        { name: 'Jhoriz Rodel Aquino', username: 'jrfa22', roles: ['Customer'], datetime: 'Jan 4, 2022 11:30 AM' },
        { name: 'Jhoriz Rodel Aquino', username: 'jrfa22', roles: ['Cashier', 'Employee'], datetime: 'Jan 4, 2022 11:30 AM' },
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />
                <DateRange />
            </TableFilter>

            <Table columns={allUserColumns} rows={allUsers} />
        </>
    )
}