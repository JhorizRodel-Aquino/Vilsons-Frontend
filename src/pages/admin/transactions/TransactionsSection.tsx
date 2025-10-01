import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TransactionsTable from "./TransactionsTable";
import TransactionModal from "./TransactionsModal";

export default function TransactionsSection() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Transactions'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Transaction'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <TransactionsTable />

            {showCreateModal && <TransactionModal setShowModal={setShowCreateModal}/>}
        </>
    )
}