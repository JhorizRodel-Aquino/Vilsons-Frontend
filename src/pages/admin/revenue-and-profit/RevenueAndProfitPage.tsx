import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import RevenueAndProfitSection from "./RevenueAndProfitSection"

export default function RevenueAndProfitPage() {
    return (
        <>
            <PageHeading title={'Revenue and Profit'} />

            <PageContent useCard={true}>
                <RevenueAndProfitSection />
            </PageContent>
        </>
    )
}