import { useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import UserTable from "./UsersTable";
import UserModal from "./UserModal";

export default function UserSection() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Users'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add User'} onClick={() => setShowCreateModal(true)} variant="primary" />
            </SectionHeading>

            <UserTable />

            {showCreateModal && <UserModal setShowModal={setShowCreateModal}/>}
        </>
    )
}