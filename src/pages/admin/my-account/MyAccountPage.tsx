import PageHeading from "../../../components/PageHeading";
import MyAccountSection from "./MyAccountSection";
import PageContent from "../../../components/PageContent";

export default function MyProfilePage() {
    return (
        <>
            <PageHeading title={'My Profile'} />

            <PageContent>
                <MyAccountSection />
            </PageContent>
        </>
    )
}