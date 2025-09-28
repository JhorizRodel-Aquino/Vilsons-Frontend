import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import RolesAndPermissionsSection from "./RolesAndPermissionsSection";

export default function RolesAndPermissionsPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Roles And Permissions'} />
                   
                    <PageContent useCard={true}>
                        <RolesAndPermissionsSection />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}