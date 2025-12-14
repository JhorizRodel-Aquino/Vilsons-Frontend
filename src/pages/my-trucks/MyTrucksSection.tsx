import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import MyTrucksTable from "./MyTrucksTable"

export type SelectedCustomer = {
    name: string;
    username: string;
    id: string;
}

export default function TrucksSection() {
    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Trucks'} modifiedDate="Aug 9, 2025" />
            </SectionHeading>

            <MyTrucksTable/>
        </>
    )
}