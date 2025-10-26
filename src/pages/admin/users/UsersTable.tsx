import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import Table from "../../../components/table/Table"
import DateRange from "../../../components/DateRange";
import Loading from "../../../components/Loading";
import useGetByDateRange from "../../../hooks/useGetByDateRange";
import ErrorModal from "../../../components/ErrorModal";
import formatDate from "../../../utils/formatDate";
import { useEffect, useState, type ReactElement } from "react";
import useDeleteData from "../../../hooks/useDeleteData";
import type { FormData } from "./UsersModal";
import ConfirmModal from "../../../components/ConfirmModal";
import Options from "../../../components/Options";
import { Link } from "react-router";

type AllUser = {
    name: string;
    username: ReactElement;
    roles: (Record<string, any>)[];
    branches: (Record<string, any>)[];
    datetime: string;
    options: ReactElement;
};

const allUserColumns: Column<AllUser>[] = [
    { key: "name", label: "Name" },
    { key: "username", label: "User Name", render: (value) => value as React.ReactElement },
    {
        key: "roles", label: "Roles",
        render: (roles) => (
            <div className="grid gap-2 items-start justify-items-start">
                {roles && (roles as (Record<string, any>)[]).map((role, i) => (
                    <span className="font-medium px-2 py-1 bg-gray rounded-[8px] w-auto" key={i}>
                        {role.roleName}
                    </span>
                ))}
            </div>
        )
    },
    {
        key: "branches", label: "Branches",
        render: (branches) => (
            <div className="grid gap-2 items-start justify-items-start">
                {branches && (branches as (Record<string, any>)[]).map((branch, i) => (
                    <span className="font-medium px-2 py-1 bg-gray rounded-[8px] w-auto" key={i}>
                        {branch.branchName}
                    </span>
                ))}
            </div>
        )
    },
    { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type UsersTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
}


export default function UsersTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId }: UsersTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, searchParams, setSearchParams, dateRangeParams, setDateRangeParams, reload } = useGetByDateRange('/api/users');
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/users');

    const handleEdit = async (item: any) => {
        setSelectedId(item.id);

        const roleIds = (item.roles || []).map((r: any) => r.id);
        const branchIds = (item.branches || []).map((b: any) => b.id);

        setPresetData({
            name: item.fullName,
            username: item.username,
            email: item.email,
            phone: item.phone,
            roles: roleIds,
            branches: branchIds,

            commission: item.commission * 100
        } as FormData);

        setShowModal("edit");
    };

    const handleDelete = async () => {
        if (!selectedId) return
        const success = await deleteData(selectedId);
        if (success) {
            reload();
            setShowDeleteModal(false)
        }
    }

    useEffect(() => {
        reload()
    }, [reloadFlag])

    if (loading) return <Loading />;

    const userItems = data.data?.users || [];

    const allUsers: AllUser[] = userItems.map(
        (item: Record<string, any>) => ({
            name: item.fullName,
            username: <Link to={`/users/${item.id}`}>{item.username}</Link>,
            roles: item.roles,
            branches: item.branches,
            datetime: item.createdAt,
            options:
                <Options
                    onEdit={() => handleEdit(item)}
                    onDelete={() => { setSelectedId(item.id); setShowDeleteModal(true) }}
                />
        })
    );

    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Truck make or model" />
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={allUserColumns} rows={allUsers} withOptions={true} />

            {(error || deleteError) ?
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
                : showDeleteModal &&
                <ConfirmModal
                    title="Delete User"
                    message="Are you sure you want to delete this user?"
                    onClose={() => { setShowDeleteModal(false) }}
                    onConfirm={handleDelete} red={true}
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}