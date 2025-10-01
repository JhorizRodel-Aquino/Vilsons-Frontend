import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import LaborExpensesTable from "./LaborExpensesTable"
import LaborModal from "./LaborModal";

export default function LaborExpensesSection() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Labor Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Pay Laborer'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <LaborExpensesTable />
            
            {showCreateModal && <LaborModal setShowModal={setShowCreateModal}/>}
        </>
    )
}