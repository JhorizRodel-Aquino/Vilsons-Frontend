import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import MyTrucksTable from "./MyTrucksTable"
import { useState } from "react";
import formatDate from "../../utils/formatDate";

export type SelectedCustomer = {
    name: string;
    username: string;
    id: string;
}

export default function TrucksSection() {
        const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Trucks'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>

            <MyTrucksTable setLastUpdated={setLastUpdated} />
        </>
    )
}