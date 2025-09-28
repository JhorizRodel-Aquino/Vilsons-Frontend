import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import PageTabs from "../../../components/PageTabs";
import { useState } from "react";
import ActiveOrdersSection from "./ActiveOrdersSection";
import ArchivedOrdersSection from "./ArchivedOrdersSection";

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
                   
                    <PageContent useCard={true} scroll={false}>
                        {activeTab === tabs[0] && <ActiveOrdersSection />}
                        {activeTab === tabs[1] && <ArchivedOrdersSection />}
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}

export default JobOrdersPage;