import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import MaterialExpensesTable from "./MaterialExpensesTable"
import { useState } from "react";
import formatDate from "../../utils/formatDate";

export default function MaterialExpensesSection() {
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Material Expenses'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>

            <MaterialExpensesTable setLastUpdated={setLastUpdated}/>
        </>
    )
}