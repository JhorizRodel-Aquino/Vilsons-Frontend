import SectionHeading from "../../components/SectionHeading"
import AssignedActiveOrdersTable from "./AssignedActiveOrdersTable"
import Details from "../../components/Details"

export default function AssignedActiveOrdersSection() {
    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Job Orders'} />
            </SectionHeading>

            <AssignedActiveOrdersTable />
        </>
    )
}