import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import PageTabs from "../../../components/PageTabs";
import { useState } from "react";
import MaterialExpensesSection from "./MaterialExpensesSection";
import EquipmentExpensesSection from "./EquipmentExpensesSection";
import LaborExpensesSection from "./LaborSection";

function OperationalExpensesPage() {
    const tabs = ['Materials', 'equipment', 'labor'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Operational Expenses'} />

                    <PageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                   
                    <PageContent useCard={true}>
                        {activeTab === tabs[0] && <MaterialExpensesSection />}
                        {activeTab === tabs[1] && <EquipmentExpensesSection />}
                        {activeTab === tabs[2] && <LaborExpensesSection />}
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}

export default OperationalExpensesPage;