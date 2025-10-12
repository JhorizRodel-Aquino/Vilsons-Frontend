import { useCallback, useState } from "react";
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import TransactionsTable from "./TransactionsTable";
import TransactionsModal, { type FormData } from "./TransactionsModal";

export default function TransactionsSection() {
        const [selectedId, setSelectedId] = useState<string>('');
        const [presetData, setPresetData] = useState<FormData>({ referenceNumber: '', jobOrderCode: '', senderName: '', amount: null, mop: '' });
        const [reloadFlag, setReloadFlag] = useState(false);
        const [showModal, setShowModal] = useState<'create' | 'edit' | null>(null)
    
        const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Transactions'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Income'} onClick={() => {setPresetData({ referenceNumber: '', jobOrderCode: '', senderName: '', amount: null, mop: '' }); setShowModal('create')}} variant="primary" />
            </SectionHeading>

            <TransactionsTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal}/>

            {showModal && <TransactionsModal setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData}  />}
        </>
    )
}