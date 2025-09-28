import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import UserTable from "./UsersTable";


export default function UserSection() {


    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Users'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add User'} onClick={() => console.log('clicked')} variant="primary" />
            </SectionHeading>

            <UserTable />
        </>
    )
}