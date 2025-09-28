import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import TrucksTable from "./TrucksTable"


export default function TrucksSection() {
    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Trucks'} modifiedDate="Aug 9, 2025" />
            </SectionHeading>

            <TrucksTable />
        </>
    )
}