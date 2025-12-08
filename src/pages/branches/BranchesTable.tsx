import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import Table from "../../components/table/Table"
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import MonthYearFilter from "../../components/MonthYearFilter";
import Loading from "../../components/Loading";
import formatDate from "../../utils/formatDate";
import useMonthYearFilter from "../../hooks/useMonthYearFilter";
import ErrorModal from "../../components/ErrorModal";
import useGetByMonthYear from "../../hooks/useGetByMonthYear";
import { useEffect, useState, type ReactElement } from "react";
import Options from "../../components/Options";
import ConfirmModal from "../../components/ConfirmModal";
import useDeleteData from "../../hooks/useDeleteData";
import type { FormData } from "./BranchesModal";
import useGetData from "../../hooks/useGetData";

type Branches = {
    branch: string;
    address: string;
    datetime: string;
    options: ReactElement;
};

const branchesColumns: Column<Branches>[] = [
    { key: "branch", label: "Branch" },
    { key: "address", label: "Address" },
    { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type BranchesTableProps = { 
    setPresetData: (presets: FormData) => void, 
    reloadFlag: boolean, 
    setShowModal: (action: 'create' | 'edit' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
}

export default function BranchesTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId }: BranchesTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload} = useGetData('/api/branches');
    // const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api/branches');

    const handleEdit = async (item: any) => { 
        setSelectedId(item.id)
        setPresetData({branch: item.branchName, address: item.address } as FormData) 
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

    // useEffect(() => {
    //     if (!setShowDeleteModal) setSelectedId(null);
    // }, [setShowDeleteModal])

    if (loading) return <Loading />;

    const branchesItems = data.data?.branches || [];

    const branchess: Branches[] = branchesItems.map(
        (item: Record<string, any>) => ({
            branch: item.branchName,
            address: item.address,
            options:
                <Options 
                    onEdit={() => handleEdit(item)} 
                    onDelete={() => { setSelectedId(item.id); setShowDeleteModal(true) }} 
                />
                
        })
    );

    return (
        <>
            {/* <TableFilter>
                <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Income branch' />
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter> */}

            <Table columns={branchesColumns} rows={branchess} withOptions={true} />

            {(error || deleteError) ? 
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} /> 
                : showDeleteModal && 
                <ConfirmModal 
                    title="Delete Job Order" 
                    message="Are you sure you want to delete this job order?" 
                    onClose={() => {setShowDeleteModal(false)}} 
                    onConfirm={handleDelete} red={true} 
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}