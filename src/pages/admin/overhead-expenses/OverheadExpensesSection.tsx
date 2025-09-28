
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import OverheadExpensesTable from "./OverheadExpensesTable";


export default function OverheadExpensesSection() {

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Overhead Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Bill'} onClick={() => console.log('clicked')} variant="primary" />
            </SectionHeading>

            <OverheadExpensesTable />
        </> 
    )
}