import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import Tabs from "../../../components/Tabs";
import { useState } from "react";
import ActiveOrdersSection from "./ActiveOrdersSection";
import ArchivedOrdersSection from "./ArchivedOrdersSection";

function JobOrdersPage() {
    const tabs = ['active', 'archived'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <>
            <PageHeading title={'Job Orders'} />

            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            <PageContent useCard={true} scroll={false}>
                {activeTab === tabs[0] && <ActiveOrdersSection />}
                {activeTab === tabs[1] && <ArchivedOrdersSection />}
            </PageContent>
        </>
    )
}

export default JobOrdersPage;