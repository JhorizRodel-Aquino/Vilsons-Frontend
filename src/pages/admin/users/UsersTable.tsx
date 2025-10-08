import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import DateRange from "../../../components/DateRange";
import Loading from "../../../components/Loading";
import useGetByDateRange from "../../../hooks/useGetByDateRange";
import ErrorModal from "../../../components/ErrorModal";
import formatDate from "../../../utils/formatDate";

export default function UserTable() {
    const { data, loading, error, closeError, searchParams, setSearchParams, dateRangeParams, setDateRangeParams } = useGetByDateRange('/api/users');
    if (loading) return <Loading />;

    const userItems = data.data?.users || [];

    type AllUser = {
        name: string;
        username: string;
        roles: (Record<string, any>)[];
        datetime: string;
    };

    const allUserColumns: Column<AllUser>[] = [
        { key: "name", label: "Name" },
        { key: "username", label: "User Name" },
        {
            key: "roles", label: "Roles",
            render: (roles) => (
                roles && (roles as (Record<string, any>)[]).map((role, i) => (
                    <div className="capitalize" key={i}>
                        {role.roleName}{i < roles.length - 1 && ","}
                    </div>
                ))
            )
        },
        { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    ];

    const allUsers: AllUser[] = userItems.map(
        (item: Record<string, any>) => ({
            name: item.fullName,
            username: item.userName,
            roles: item.roles,
            datetime: item.createdAt,
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Truck make or model" />
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={allUserColumns} rows={allUsers} />

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}