import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import OtherIncomeSection from "./OtherIncomeSection";

export default function OtherIncomePage() {
    return (
        <>
            <PageHeading title={'Other Income'} />

            <PageContent useCard={true}>
                <OtherIncomeSection />
            </PageContent>
        </>
    )
}