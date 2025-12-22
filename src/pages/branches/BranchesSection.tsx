
import { useCallback, useState } from "react";
import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import Button from "../../components/Button";
import BranchesTable from "./BranchesTable";
import BranchesModal, { type FormData } from "./BranchesModal";
import { hasPermissions } from "../../services/permissionService";
import formatDate from "../../utils/formatDate";

export default function BranchesSection() {
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetData, setPresetData] = useState<FormData>({ branch: '', address: '' });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Branches'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
                {hasPermissions(['create_branch']) &&
                    <Button label={'Add Branches'} onClick={() => { setPresetData({ branch: '', address: '' }); setShowModal('create') }} variant="primary" />}
            </SectionHeading>

            <BranchesTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} setLastUpdated={setLastUpdated} />

            {showModal && <BranchesModal setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} />}
        </>
    )
}