import Details from "../../components/Details"
import SectionHeading from "../../components/SectionHeading"
import AssignedArchivedOrdersTable from "./AssignedArchivedOrdersTable"

export default function AssignedOrderDetailsSection() {


    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Archived Orders'} />
            </SectionHeading>

            <AssignedArchivedOrdersTable />
        </>
    )
}