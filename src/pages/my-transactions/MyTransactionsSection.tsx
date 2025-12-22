import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import MyTransactionsTable from "./MyTransactionsTable";
import { useState } from "react";
import formatDate from "../../utils/formatDate";

export default function MyTransactionsSection() {
        const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Transactions'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>

            <MyTransactionsTable setLastUpdated={setLastUpdated} />
        </>
    )
}