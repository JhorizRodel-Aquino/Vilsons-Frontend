import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import OverheadExpensesSection from "./OverheadExpensesSection";

export default function OverheadExpensesPage() {
    return (
        <>
            <PageHeading title={'Overhead Expenses'} />

            <PageContent useCard={true}>
                <OverheadExpensesSection />
            </PageContent>
        </>
    )
}