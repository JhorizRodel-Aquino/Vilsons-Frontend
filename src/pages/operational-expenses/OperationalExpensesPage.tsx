import PageHeading from "../../components/PageHeading";
import PageContent from "../../components/PageContent";
import Tabs from "../../components/Tabs";
import { useMemo, useState } from "react";
import MaterialExpensesSection from "./MaterialExpensesSection";
import EquipmentExpensesSection from "./EquipmentExpensesSection";
import LaborExpensesSection from "./LaborExpensesSection";
import { hasPermissions } from "../../services/permissionService";

const OperationalExpensesPage = () => {
    // 1️⃣ Define tabs with permissions + components
    const TAB_CONFIG = useMemo(
        () => [
            {
                key: "materials",
                label: "Materials",
                permission: ['view_materials'],
                component: <MaterialExpensesSection />,
            },
            {
                key: "equipment",
                label: "Equipment",
                permission: ['view_equipments'],
                component: <EquipmentExpensesSection />,
            },
            {
                key: "labor",
                label: "Labor",
                permission: ['view_labors'],
                component: <LaborExpensesSection />,
            },
        ],
        []
    );

    // 2️⃣ Filter tabs by permission
    const allowedTabs = useMemo(
        () => TAB_CONFIG.filter(tab => hasPermissions(tab.permission)),
        [TAB_CONFIG]
    );

    // 3️⃣ Safe active tab initialization
    const [activeTabKey, setActiveTabKey] = useState(
        allowedTabs[0].key
    );

    // 4️⃣ Get active tab config
    const activeTab = allowedTabs.find(tab => tab.key === activeTabKey);

    return (
        <>
            <PageHeading title="Operational Expenses" />

            {/* 6️⃣ Render permission-based tabs */}
            <Tabs
                tabs={allowedTabs.map(tab => tab.label)}
                activeTab={activeTab!.label}
                setActiveTab={(label: string) => {
                    const selectedTab = allowedTabs.find(tab => tab.label === label);
                    if (selectedTab) setActiveTabKey(selectedTab.key);
                }}
            />

            {/* 7️⃣ Render guarded section */}
            <PageContent useCard={true}>
                {activeTab && hasPermissions(activeTab.permission) && (
                    activeTab.component
                )}
            </PageContent>
        </>
    );
};

export default OperationalExpensesPage;
