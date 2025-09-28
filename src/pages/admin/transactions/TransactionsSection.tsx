
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TransactionsTable from "./TransactionsTable";


export default function TransactionsSection() {


    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Transactions'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Transaction'} onClick={() => console.log('clicked')} variant="primary" />
            </SectionHeading>

            <TransactionsTable />
        </>
    )
}