import Details from "../../components/Details"
import SectionHeading from "../../components/SectionHeading"
import MyArchivedOrdersTable from "./MyArchivedOrdersTable"

export default function MyArchivedOrdersSection() {
    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Archived Orders'} />
            </SectionHeading>

            <MyArchivedOrdersTable />
        </>
    )
}