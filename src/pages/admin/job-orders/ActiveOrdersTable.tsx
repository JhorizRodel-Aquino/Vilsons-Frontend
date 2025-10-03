import { useState, type ReactElement } from "react";
import type { Status } from "../../../config/statusConfig";
import type { Column } from "../../../components/table/Table";
import TableFilter from "../../../components/TableFilter"
import SearchBar from "../../../components/SearchBar"
import StatusFilter from "../../../components/StatusFilter"
import DateRange from "../../../components/DateRange"
import Table from "../../../components/table/Table"
import StatusIndicator from "../../../components/StatusIndicator";
import formatPesoFromCents from '../../../utils/formatPesoFromCents';
import Options from "../../../components/Options";
import Icon from "../../../components/Icon";
import ConfirmModal from "../../../components/ConfirmModal";

export default function ActiveOrdersTable({ setShowEditModal }: {setShowEditModal: (show: boolean) => void;} ) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    type ActiveJobOrder = {
        jobNumber: string;
        status: Status;
        plateNumber: string;
        contractor: string;
        totalBill: number;
        balance: number;
        options: ReactElement
    };

    const activeJobOrderColumns: Column<ActiveJobOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
        { key: "plateNumber", label: "Plate Number" },
        { key: "contractor", label: "Contractor" },
        { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
        { key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number) },
        { key: "options", label: "", render: (value) => value as React.ReactElement },
    ];

    const activeJobOrders: ActiveJobOrder[] = [
        { jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, 
            options: 
            <Options onEdit={() => {setShowEditModal(true)}} onDelete={() => {setShowDeleteModal(true)}}> 
                <button><Icon name="edit" />Change Status</button>
            </Options> },
        { jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, 
            options: 
            <Options onEdit={() => {setShowEditModal(true)}} onDelete={() => {setShowDeleteModal(true)}}> 
                <button>Change Status</button>
            </Options> },
        { jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, 
            options: 
            <Options onEdit={() => {setShowEditModal(true)}} onDelete={() => {setShowDeleteModal(true)}}> 
                <button>Change Status</button>
            </Options> },
        { jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, 
            options: 
            <Options onEdit={() => {setShowEditModal(true)}} onDelete={() => {setShowDeleteModal(true)}}> 
                <button>Change Status</button>
            </Options> },
        { jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, 
            options: 
            <Options onEdit={() => {setShowEditModal(true)}} onDelete={() => {setShowDeleteModal(true)}}> 
                <button>Change Status</button>
            </Options> },
        { jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, 
            options: 
            <Options onEdit={() => {setShowEditModal(true)}} onDelete={() => {setShowDeleteModal(true)}}> 
                <button>Change Status</button>
            </Options> },
        { jobNumber: 'JO-25-233', status: 'completed', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000, 
            options: 
            <Options onEdit={() => {setShowEditModal(true)}} onDelete={() => {setShowDeleteModal(true)}}> 
                <button>Change Status</button>
            </Options> },
    ];

    return (
        <>
            <TableFilter>
                <SearchBar />

                <TableFilter.Group>
                    <StatusFilter />
                    <DateRange />
                </TableFilter.Group>
            </TableFilter>

            <Table columns={activeJobOrderColumns} rows={activeJobOrders} />
            
            {showDeleteModal && <ConfirmModal title="Delete Job Order" message="Are you sure you want to delete this job order?" setShowModal={setShowDeleteModal} onConfirm={() => {}} red={true}/>}
        </>
    )
}