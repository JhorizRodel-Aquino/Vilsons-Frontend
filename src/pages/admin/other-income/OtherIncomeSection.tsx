
import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import OtherIncomeTable from "./OtherIncomeTable";
import OtherIncomeModal from "./OtherIncomeModal";

export default function OtherIncomeSection() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Other Income'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Income'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <OtherIncomeTable />

            {showCreateModal && <OtherIncomeModal setShowModal={setShowCreateModal}/>}
        </> 
    )
}