import { useCallback, useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TransactionsTable from "./TransactionsTable";
import TransactionsModal, { type FormData } from "./TransactionsModal";
import getBranches from "../../../utils/branchOptions";

export default function TransactionsSection() {
    const branchOptions = getBranches()
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetData, setPresetData] = useState<FormData>({ referenceNumber: '', jobOrderCode: '', senderName: '', amount: null, mop: '', branchId: branchOptions && branchOptions[0].value });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Transactions'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Transaction'} onClick={() => { setPresetData({ referenceNumber: '', jobOrderCode: '', senderName: '', amount: null, mop: '', branchId: branchOptions && branchOptions[0].value }); setShowModal('create') }} variant="primary" />
            </SectionHeading>

            <TransactionsTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} />

            {showModal && <TransactionsModal setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} branchOptions={branchOptions} />}
        </>
    )
}