import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import UsersSection from "./UsersSection";

export default function UsersPage() {
    return (
        <>
            <PageHeading title={'All Users'} />

            <PageContent useCard={true}>
                <UsersSection />
            </PageContent>
        </>
    )
}