import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import PageTabs from "../../../components/PageTabs";
import { useState } from "react";
import MaterialExpensesSection from "./MaterialExpensesSection";
import EquipmentExpensesSection from "./EquipmentExpensesSection";
import LaborExpensesSection from "./LaborSection";

function OperationalExpensesPage() {
    const tabs = ['Materials', 'equipment', 'labor'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <>
            <PageHeading title={'Operational Expenses'} />

            <PageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

            <PageContent useCard={true}>
                {activeTab === tabs[0] && <MaterialExpensesSection />}
                {activeTab === tabs[1] && <EquipmentExpensesSection />}
                {activeTab === tabs[2] && <LaborExpensesSection />}
            </PageContent>
        </>
    )
}

export default OperationalExpensesPage;