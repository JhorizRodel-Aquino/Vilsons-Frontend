import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import ActivityLogsContent from "./ActivityLogsContent";

export default function ActivityLogsPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Activity Logs'} />
                   
                    <PageContent>
                        <ActivityLogsContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}