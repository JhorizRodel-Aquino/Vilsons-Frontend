import { useState } from "react";
import Details from "../../components/Details"
import SectionHeading from "../../components/SectionHeading"
import formatDate from "../../utils/formatDate"
import ArchivedOrdersTable from "./ArchivedOrdersTable"

export default function JobOrdersActiveTabContent() {
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Archived Job Orders'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>


            <ArchivedOrdersTable setLastUpdated={setLastUpdated} />
        </>
    )
}