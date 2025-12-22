import { useState } from "react";
import Details from "../../components/Details"
import SectionHeading from "../../components/SectionHeading"
import AssignedArchivedOrdersTable from "./AssignedArchivedOrdersTable"
import formatDate from "../../utils/formatDate";

export default function AssignedOrderDetailsSection() {
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Archived Orders'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>

            <AssignedArchivedOrdersTable setLastUpdated={setLastUpdated}/>
        </>
    )
}