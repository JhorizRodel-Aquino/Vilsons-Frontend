import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import LaborExpensesTable from "./LaborExpensesTable"

export default function LaborExpensesSection() {

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Labor Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Pay Laborer'} onClick={() => console.log('clicked')} variant="primary" />
            </SectionHeading>

            <LaborExpensesTable />
        </>
    )
}