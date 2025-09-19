import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import PageTabs from "../../../components/PageTabs";
import { useState } from "react";
import ActiveTabContent from "./ActiveTabContent";
import ArchivedTabContent from "./ArchivedTabContent";

function JobOrdersPage() {
    const tabs = ['active', 'archived'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Job Orders'} />

                    <PageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                   
                    <PageContent>
                        {activeTab === tabs[0] && <ActiveTabContent />}
                        {activeTab === tabs[1] && <ArchivedTabContent />}
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}

export default JobOrdersPage;