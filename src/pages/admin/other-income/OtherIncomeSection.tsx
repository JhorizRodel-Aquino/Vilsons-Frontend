
import { useCallback, useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import OtherIncomeTable from "./OtherIncomeTable";
import OtherIncomeModal, { type FormData } from "./OtherIncomeModal";
import decodeToken from "../../../utils/decodeToken";


export default function OtherIncomeSection() {
    const decoded = decodeToken()
    const branches = decoded?.UserInfo?.branches;
    const branchOptions = branches?.map(branchItem => ({ value: branchItem.branchId, label: branchItem.branchName }));
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetData, setPresetData] = useState<FormData>({ description: '', amount: null, branchId: branchOptions && branchOptions[0].value });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Other Income'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Income'} onClick={() => {setPresetData({ description: '', amount: null, branchId: branchOptions && branchOptions[0].value }); setShowModal('create')}} variant="primary" />
            </SectionHeading>

            <OtherIncomeTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} />

            {showModal && <OtherIncomeModal branchOptions={branchOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData}  />}
        </>
    )
}