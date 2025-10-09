
import { useCallback, useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import OtherIncomeTable from "./OtherIncomeTable";
import OtherIncomeModal from "./OtherIncomeModal";

export default function OtherIncomeSection() {
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false)

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Other Income'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Income'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <OtherIncomeTable reloadFlag={reloadFlag} />
            

            {showCreateModal && <OtherIncomeModal setShowModal={setShowCreateModal} onSuccess={reload}/>}
        </> 
    )
}