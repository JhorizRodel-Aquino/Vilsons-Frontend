import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import EquipmentExpensesTable from "./EquipmentExpensesTable";
import EquipmentModal from "./EquipmentModal";

export default function EquipmentExpensesSection() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Equipment Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Equipment'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <EquipmentExpensesTable />

            {showCreateModal && <EquipmentModal setShowModal={setShowCreateModal}/>}
        </>
    )
}