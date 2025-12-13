import SectionHeading from "../../components/SectionHeading"
import MyActiveOrdersTable from "./MyActiveOrdersTable"
import Details from "../../components/Details"

export default function MyActiveOrdersSection() {
    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Job Orders'} />
            </SectionHeading>

            <MyActiveOrdersTable />
        </>
    )
}