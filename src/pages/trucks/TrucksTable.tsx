import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import DateRange from "../../components/DateRange";
import Table from "../../components/table/Table"
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import formatDate from "../../utils/formatDate";
import useGetByDateRange from "../../hooks/useGetByDateRange";
import { useEffect, useState, type ReactElement } from "react";
import Options from "../../components/Options";
import { Link } from "react-router";
import useDeleteData from "../../hooks/useDeleteData";
import ConfirmModal from "../../components/ConfirmModal";
import type { FormData } from "./TrucksModal";
import Icon from "../../components/Icon";
import { hasPermissions } from "../../services/permissionService";

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
    { key: "owner", label: "Owner", render: (value) => value as React.ReactElement },
    { key: "dateAdded", label: "Date Added", render: (isoDate) => formatDate(isoDate as string, 'date') },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type TrucksTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | "change" | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    setSelectedTruck: (truck: { plate: string }) => void;
    setInvalidateData: (data: Record<string, any>) => void;
    setLastUpdated: (date: string | undefined) => void;
}


export default function TrucksTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId, setSelectedTruck, setInvalidateData, setLastUpdated }: TrucksTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, dateRangeParams, setDateRangeParams } = useGetByDateRange('/api/trucks');
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/trucks');

    const handleEdit = async (item: any) => {
        setSelectedId(item.id)
        setPresetData({ plate: item.plate, make: item.make, model: item.model, engine: item.engine, remarks: "" } as FormData)
        setShowModal('edit');
    }

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

    useEffect(() => {
        if (data && data.lastUpdatedAt) {
            setLastUpdated(data?.lastUpdatedAt);
        }
    }, [data, setLastUpdated]);

    if (loading) return <Loading />;

    const truckItems = data.data?.trucks || [];

    const trucks: Truck[] = truckItems.map(
        (item: Record<string, any>) => ({
            plateNumber: <Link to={`/trucks/${item.id}`}>{item.plate}</Link>,
            make: item.make,
            model: item.model,
            engine: item.engine || '',
            owner: <Link to={`/customers/${item.customerId}`}>{item.customerFullName}</Link>,
            dateAdded: item.createdAt,
            options:
                <Options
                    onEdit={hasPermissions(['edit_truck']) ? () => handleEdit(item) : undefined}
                    onDelete={hasPermissions(['delete_truck']) ? () => { setSelectedId(item.id); setShowDeleteModal(true) } : undefined}
                >
                    <button
                        onClick={() => {
                            setSelectedId(item.id);
                            setSelectedTruck({ plate: item.plate });
                            setShowModal("change")
                            setInvalidateData({ customerId: item.customerId })
                        }}
                    >
                        <Icon name="users" />Change Owner
                    </button>
                </Options>

        })
    );


    return (
        <>
            <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder="Truck Make, Model" />
                <DateRange dateRange={dateRangeParams} setDateRange={setDateRangeParams} />
            </TableFilter>

            <Table columns={truckColumns} rows={trucks} withOptions={true} />

            {(error || deleteError) ?
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
                : showDeleteModal &&
                <ConfirmModal
                    title="Delete Truck"
                    message="Are you sure you want to delete this truck?"
                    onClose={() => { setShowDeleteModal(false) }}
                    onConfirm={handleDelete} red={true}
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}
