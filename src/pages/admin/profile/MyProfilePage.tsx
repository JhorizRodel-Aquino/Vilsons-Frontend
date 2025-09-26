import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import AppLayout from "../../../components/AppLayout";
import MyProfileContent from "./MyProfileContent";
import PageContent from "../../../components/PageContent";

export default function MyProfilePage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'My Profile'} />
                    
                    <PageContent>
                        <MyProfileContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}