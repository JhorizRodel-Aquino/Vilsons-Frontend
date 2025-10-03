import SectionHeading from "../../../components/SectionHeading"
import Button from "../../../components/Button"
import ActiveOrdersTable from "./ActiveOrdersTable"
import JobOrderModal from "./JobOrderModal"
import { useState } from "react"

export default function JobOrdersActiveTabContent() {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    return (
        <>
            <SectionHeading>
                <div>
                    <h2 className="text-darker font-bold">All Archived Job Orders</h2>
                    <p className="text-dark font-medium">Last Updated: Aug 9, 2025</p>
                </div>
                <Button label={'Create Job Order'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <ActiveOrdersTable setShowEditModal={setShowEditModal}/>

            {showCreateModal && <JobOrderModal setShowModal={setShowCreateModal}/>}
            {showEditModal && <JobOrderModal setShowModal={setShowEditModal}/>}
        </>
    )
}