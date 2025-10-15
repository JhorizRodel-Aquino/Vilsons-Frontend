import { useCallback, useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import LaborExpensesTable from "./LaborExpensesTable"
import LaborModal, { type FormDataContractor, type FormDataEmployee, type PayComponents } from "./LaborModal";
import getBranches from "../../../utils/branchOptions";

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
    const branchOptions = getBranches()
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetDataContractor, setPresetDataContractor] = useState<FormDataContractor>({ userId: '', amount: null, branchId: branchOptions && branchOptions[0].value });
    const [presetDataEmployee, setPresetDataEmployee] = useState<FormDataEmployee>({ userId: '', branchId: branchOptions && branchOptions[0].value, payComponents: [] });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)
    const [selectedContractor, setSelectedContractor] = useState<SelectedContractor>({ name: '', username: '', id: '', balance: 0 })
    const [selectedEmployee, setSelectedEmployee] = useState<SelectedEmployee>({ name: '', username: '', id: '', payComponents: [] })

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Labor Expenses'} modifiedDate="Aug 9, 2025" />
                <Button
                    label={'Pay Laborer'}
                    onClick={() => {
                        setPresetDataContractor({ userId: '', amount: null, type: "regular", branchId: branchOptions && branchOptions[0].value });
                        setPresetDataEmployee({ userId: '', branchId: branchOptions && branchOptions[0].value, payComponents: [] })
                        setShowModal('create')
                    }}
                    variant="primary" />
            </SectionHeading>

            <LaborExpensesTable reloadFlag={reloadFlag} presetDataContractor={presetDataContractor} setPresetDataContractor={setPresetDataContractor} presetDataEmployee={presetDataEmployee} setPresetDataEmployee={setPresetDataEmployee} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} activeTab={activeTab} setActiveTab={setActiveTab} setSelectedContractor={setSelectedContractor} setSelectedEmployee={setSelectedEmployee} />

            {showModal && <LaborModal branchOptions={branchOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetDataContractor={presetDataContractor} presetDataEmployee={presetDataEmployee} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} selectedContractor={selectedContractor} setSelectedContractor={setSelectedContractor} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} />}
        </>
    )
}