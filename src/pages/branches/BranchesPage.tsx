import PageHeading from "../../components/PageHeading";
import PageContent from "../../components/PageContent";
import BranchesSection from "./BranchesSection";

export default function BranchesPage() {
    return (
        <>
            <PageHeading title={'Branches'} />

            <PageContent useCard={true}>
                <BranchesSection />
            </PageContent>
        </>
    )
}