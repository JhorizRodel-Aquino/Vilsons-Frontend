import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import AllUsersContent from "./AllUsersContent";

export default function AllUsersPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'All Users'} />
                   
                    <PageContent>
                        <AllUsersContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}