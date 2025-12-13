import PageHeading from "../../components/PageHeading";
import PageContent from "../../components/PageContent";
import MyTransactionsSection from "./MyTransactionsSection";

export default function MyTransactionsPage() {
    return (
        <>
            <PageHeading title={'MyTransactions'} />

            <PageContent useCard={true}>
                <MyTransactionsSection />
            </PageContent>
        </>
    )
}