import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import PageTabs from "../../../components/PageTabs";
import { useState } from "react";
import OperationalExpensesMaterialsTabContent from "./OperationalExpensesMaterialsTabContent";
import OperationalExpensesEquipmentTabContent from "./OperationalExpensesEquipmentTabContent";
import OperationalExpensesLaborTabContent from "./OperationalExpensesLaborTabContent";

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
                   
                    <PageContent>
                        {activeTab === tabs[0] && <OperationalExpensesMaterialsTabContent />}
                        {activeTab === tabs[1] && <OperationalExpensesEquipmentTabContent />}
                        {activeTab === tabs[2] && <OperationalExpensesLaborTabContent />}
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}

export default OperationalExpensesPage;