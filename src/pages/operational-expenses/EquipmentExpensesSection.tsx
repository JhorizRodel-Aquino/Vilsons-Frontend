import { useCallback, useState } from "react";
import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import Button from "../../components/Button";
import EquipmentExpensesTable from "./EquipmentExpensesTable";
import EquipmentModal, { type FormData } from "./EquipmentModal";
import useBranchOptions from "../../hooks/useBranchOptions";
import formatDate from "../../utils/formatDate";

export default function EquipmentExpensesSection() {
    const { branchOptions } = useBranchOptions()
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetData, setPresetData] = useState<FormData>({ equipment: "", quantity: 1, amount: null, branchId: branchOptions.length > 0 ? branchOptions[0].value : '' });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Equipment Expenses'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
                <Button type="button" label={'Add Equipment'} onClick={() => { setPresetData({ equipment: "", quantity: 1, amount: null, branchId: branchOptions.length > 0 ? branchOptions[0].value : '' }); setShowModal('create') }} variant="primary" />
            </SectionHeading>

            <EquipmentExpensesTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} setLastUpdated={setLastUpdated} />

            {showModal && <EquipmentModal branchOptions={branchOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} />}
        </>
    )
}