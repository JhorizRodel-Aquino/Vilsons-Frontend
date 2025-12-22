import { useCallback, useState } from "react";
import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import Button from "../../components/Button";
import OverheadExpensesTable from "./OverheadExpensesTable";
import OverheadModal, { type FormData } from "./OverheadModal";
import useBranchOptions from "../../hooks/useBranchOptions";
import { hasPermissions } from "../../services/permissionService";
import formatDate from "../../utils/formatDate";


export default function OverheadExpensesSection() {
    const { branchOptions } = useBranchOptions()
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetData, setPresetData] = useState<FormData>({ description: "", amount: null, branchId: branchOptions.length > 0 ? branchOptions[0].value : '' });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Overhead Expenses'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
                {hasPermissions(['create_overhead']) &&
                    <Button label={'Add Overhead'} onClick={() => { setPresetData({ description: "", amount: null, branchId: branchOptions.length > 0 ? branchOptions[0].value : '' }); setShowModal('create') }} variant="primary" />}
            </SectionHeading>

            <OverheadExpensesTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} setLastUpdated={setLastUpdated}/>

            {showModal && <OverheadModal branchOptions={branchOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} />}
        </>
    )
}