import type { Column } from "../../components/table/Table";
import TableFilter from "../../components/TableFilter"
import SearchBar from "../../components/SearchBar"
import Table from "../../components/table/Table"
import formatPesoFromCents from '../../utils/formatPesoFromCents';
import MonthYearFilter from "../../components/MonthYearFilter";
import useMonthYearFilter from "../../hooks/useMonthYearFilter";
import ErrorModal from "../../components/ErrorModal";
import Loading from "../../components/Loading";
import formatDate from "../../utils/formatDate";
import useGetByMonthYear from "../../hooks/useGetByMonthYear";
import useDeleteData from "../../hooks/useDeleteData";
import { type FormData, type PayComponents } from "./LaborModal";
import { useEffect, useState, type ReactElement } from "react";
import Options from "../../components/Options";
import ConfirmModal from "../../components/ConfirmModal";
import type { SelectedContractor, SelectedEmployee } from "./LaborExpensesSection";
import { get } from "../../services/apiService";
import Selection from "../../components/Selection";
import { getBranches } from "../../services/branchService";
import { hasPermissions } from "../../services/permissionService";

type LaborExpense = {
    name: string;
    branch: string;
    laborType: string;
    salaryType: string;
    datetime: string;
    amount: number;
    options: ReactElement;
};

const laborExpenseColumns: Column<LaborExpense>[] = [
    { key: "name", label: "Name" },
    { key: "branch", label: "Branch" },
    { key: "laborType", label: "Labor Type" },
    { key: "salaryType", label: "Salary Type" },
    { key: "datetime", label: "Datetime", render: (isoDate) => formatDate(isoDate as string) },
    { key: "amount", label: "Amount", render: (value) => formatPesoFromCents(value as number) },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

type LaborTableProps = {
    setPresetData: (presets: FormData) => void,
    reloadFlag: boolean,
    setShowModal: (action: 'create' | 'edit' | null) => void;
    selectedId: string;
    setSelectedId: (id: string) => void;
    setActiveTab: (tab: string) => void;
    presetData: FormData;
    setPreSelectedContractor: (preSelected: Record<string, any> | null) => void;
    setPreSelectedEmployee: (preSelected: Record<string, any> | null) => void;
    setLastUpdated: (date: string | undefined) => void;
}

export default function LaborExpensesTable({ setPresetData, reloadFlag, setShowModal, selectedId, setSelectedId, setActiveTab, setPreSelectedContractor, setPreSelectedEmployee,setLastUpdated }: LaborTableProps) {
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const [laborType, setLaborType] = useState<"contractor" | "employee">("contractor");
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const { data, loading, error, closeError, reload, searchParams, setSearchParams, setMonthYearParams, branchParams, setBranchParams } = useGetByMonthYear('/api/labors');
    const { options, option, setOption, monthYear, setMonthYear, year, setYear } = useMonthYearFilter(setMonthYearParams);
    const {
        loading: deleteLoading,
        error: deleteError,
        closeError: closeDeleteError,
        deleteData,
    } = useDeleteData('/api');

    const handleEdit = async (item: any, laborType: "contractor" | "employee") => {
        setSelectedId(item.id)
        if (laborType === "contractor") {
            setActiveTab(laborType);

            const contractor = (await get({ route: `/api/contractors/${item.contractorId}` })).data
            console.log(contractor.user.fullName)
            setPresetData({ userId: item.userId, amount: item.amount / 100, type: item.salaryType, branchId: item.branchId, userConnectingRoleIds: [{ role: laborType, id: item.contractorId }], remarks: "" } as FormData)
            setPreSelectedContractor({ name: contractor.user.fullName, username: contractor?.user?.username, id: item.userId, balance: contractor?.jobOrderSummary?.totalBalance } as SelectedContractor)
        } else {
            setActiveTab(laborType);

            const employee = (await get({ route: `/api/employees/${item.employeeId}` })).data
            console.log("employee", employee)
            const payComponents = item.payComponents.map((comp: PayComponents) => ({ ...comp, amount: comp.amount / 100 }))
            setPresetData({ userId: item.userId, payComponents: payComponents, branchId: item.branchId, userConnectingRoleIds: [{ role: laborType, id: item.employeeId }], remarks: "" } as FormData)
            setPreSelectedEmployee({ name: employee.user.fullName, username: employee.user.username, id: item.userId, payComponents: payComponents } as SelectedEmployee)
        }

        setShowModal('edit');
    }

    const handleDelete = async () => {
        if (!selectedId) return
        const success = laborType === "contractor" ? await deleteData(`contractor-pays/${selectedId}`) : await deleteData(`employee-pays/${selectedId}`);
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

    const laborExpenseItems = data.data?.laborPays || [];
    const total = data.data?.totalAmount || 0;

    const laborExpenses: LaborExpense[] = laborExpenseItems.map(
        (item: Record<string, any>) => ({
            name: item.fullName,
            branch: item.branch.branchName,
            laborType: item.type,
            salaryType: item.salaryType,
            datetime: item.createdAt,
            amount: item.amount,
            options:
                <Options
                    onEdit={hasPermissions(['edit_labor']) ? () => handleEdit(item, item.type) : undefined}
                    onDelete={hasPermissions(['delete_labor']) ? () => { setLaborType(item.type); setSelectedId(item.id); setShowDeleteModal(true) } : undefined}
                />
        })
    );

    return (
        <>
            <TableFilter>
                <TableFilter.Group>
                    <SearchBar search={searchParams} setSearch={setSearchParams} placeholder='Laborer Name' />
                    <Selection
                        options={branchOptions}
                        value={branchParams}
                        onChange={(e) => setBranchParams(e.target.value)}
                    />
                </TableFilter.Group>
                <MonthYearFilter options={options} option={option} setOption={setOption} monthYear={monthYear} year={year} setMonthYear={setMonthYear} setYear={setYear} />
            </TableFilter>

            <Table columns={laborExpenseColumns} rows={laborExpenses} total={total} withOptions={true} />

            {(error || deleteError) ?
                <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
                : showDeleteModal &&
                <ConfirmModal
                    title="Delete Labor"
                    message="Are you sure you want to delete this labor?"
                    onClose={() => { setShowDeleteModal(false) }}
                    onConfirm={handleDelete} red={true}
                    disabledButtons={deleteLoading}
                    onProgressLabel={deleteLoading ? 'Deleting...' : ''}
                />
            }
        </>
    )
}