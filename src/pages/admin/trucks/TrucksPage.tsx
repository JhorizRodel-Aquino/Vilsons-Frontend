import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import TrucksSection from "./TrucksSection";

export default function TrucksPage() {
    return (
        <>
            <PageHeading title={'Trucks'} />

            <PageContent useCard={true}>
                <TrucksSection />
            </PageContent>
        </>
    )
}