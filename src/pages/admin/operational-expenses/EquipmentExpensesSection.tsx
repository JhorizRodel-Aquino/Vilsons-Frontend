import { useCallback, useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import EquipmentExpensesTable from "./EquipmentExpensesTable";
import EquipmentModal, { type FormData } from "./EquipmentModal";
import getBranches from "../../../utils/branchOptions";

export default function EquipmentExpensesSection() {
    const branchOptions = getBranches()
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetData, setPresetData] = useState<FormData>({ equipment: "", quantity: 1, amount: null, branchId: branchOptions && branchOptions[0].value });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Equipment Expenses'} modifiedDate="Aug 9, 2025" />
                <Button type="button" label={'Add Equipment'} onClick={() => { setPresetData({ equipment: "", quantity: 1, amount: null, branchId: branchOptions && branchOptions[0].value }); setShowModal('create') }} variant="primary" />
            </SectionHeading>

            <EquipmentExpensesTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} />

            {showModal && <EquipmentModal branchOptions={branchOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} />}
        </>
    )
}