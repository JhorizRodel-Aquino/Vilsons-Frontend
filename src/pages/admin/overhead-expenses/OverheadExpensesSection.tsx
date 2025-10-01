import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import OverheadExpensesTable from "./OverheadExpensesTable";
import OverheadModal from "./OverheadModal";


export default function OverheadExpensesSection() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Overhead Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Bill'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <OverheadExpensesTable />

            {showCreateModal && <OverheadModal setShowModal={setShowCreateModal}/>}
        </> 
    )
}