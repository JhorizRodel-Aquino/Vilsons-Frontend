import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import MaterialExpensesTable from "./MaterialExpensesTable"

export default function MaterialExpensesSection() {


    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Material Expenses'} modifiedDate="Aug 9, 2025" />
            </SectionHeading>

            <MaterialExpensesTable />
        </>
    )
}