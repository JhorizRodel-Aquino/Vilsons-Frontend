import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import TransactionsSection from "./TransactionsSection";

export default function TransactionsPage() {
    return (
        <>
            <PageHeading title={'Transactions'} />

            <PageContent useCard={true}>
                <TransactionsSection />
            </PageContent>
        </>
    )
}