import { useCallback, useState } from "react";
import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import Button from "../../components/Button";
import LaborExpensesTable from "./LaborExpensesTable"
import LaborModal, { type FormData, type PayComponents } from "./LaborModal";
import useBranchOptions from "../../hooks/useBranchOptions";
import formatDate from "../../utils/formatDate";

export type SelectedContractor = {
    name: string;
    username: string;
    id: string;
    balance: number;
}

export type SelectedEmployee = {
    name: string;
    username: string;
    id: string;
    payComponents: PayComponents[];
}

export default function LaborExpensesSection() {
    const tabs = ['contractor', 'employee'];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const { branchOptions } = useBranchOptions()
    const [selectedId, setSelectedId] = useState<string>('');

    const [preSelectedContractor, setPreSelectedContractor] = useState<Record<string, any> | null>(null);
    const [preSelectedEmployee, setPreSelectedEmployee] = useState<Record<string, any> | null>(null);

    const [presetData, setPresetData] = useState<FormData>({ userId: '', branchId: branchOptions.length > 0 ? branchOptions[0].value : '', payComponents: [] });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);


    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Labor Expenses'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
                <Button
                    label={'Pay Laborer'}
                    onClick={() => {
                        setPresetData({ userId: '', branchId: branchOptions.length > 0 ? branchOptions[0].value : '', payComponents: [], type: 'regular' })
                        setShowModal('create')
                    }}
                    variant="primary" />
            </SectionHeading>

            <LaborExpensesTable reloadFlag={reloadFlag} setPresetData={setPresetData} presetData={presetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} setActiveTab={setActiveTab} setPreSelectedContractor={setPreSelectedContractor} setPreSelectedEmployee={setPreSelectedEmployee} setLastUpdated={setLastUpdated} />

            {showModal && <LaborModal branchOptions={branchOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} preSelectedContractor={preSelectedContractor} preSelectedEmployee={preSelectedEmployee} />}
        </>
    )
}