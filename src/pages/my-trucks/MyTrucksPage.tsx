import PageHeading from "../../components/PageHeading";
import PageContent from "../../components/PageContent";
import MyTrucksSection from "./MyTrucksSection";

export default function MyTrucksPage() {
    return (
        <>
            <PageHeading title={'Trucks'} />

            <PageContent useCard={true}>
                <MyTrucksSection />
            </PageContent>
        </>
    )
}