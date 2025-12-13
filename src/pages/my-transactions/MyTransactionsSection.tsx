import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import MyTransactionsTable from "./MyTransactionsTable";

export default function MyTransactionsSection() {
    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Transactions'} modifiedDate="Aug 9, 2025" />
            </SectionHeading>

            <MyTransactionsTable />
        </>
    )
}