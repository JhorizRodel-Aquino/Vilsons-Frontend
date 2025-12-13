import SectionHeading from "../../components/SectionHeading"
import Button from "../../components/Button"
import ActiveOrdersTable from "./ActiveOrdersTable"
import JobOrderModal, { type FormData } from "./JobOrderModal"
import { useCallback, useState } from "react"
import Details from "../../components/Details"
import ChangeStatusModal from "./ChangeStatusModal"
import { getBranches } from "../../services/branchService"
import useBranchOptions from "../../hooks/useBranchOptions"

export default function JobOrdersActiveTabContent() {
    const { branchOptions } = useBranchOptions()
    const [invalidateData, setInvalidateData] = useState<Record<string, any>>({ customerId: '', contractorId: '', truckId: '' });
    const [selectedId, setSelectedId] = useState<string>('');
    const [selectedJobOrder, setSelectedJobOrder] = useState({ jobNumber: '', status: '' });
    const [presetData, setPresetData] = useState<FormData>({
        truckId: '', plate: '', make: '', model: '',
        customerId: '', name: '', username: '', phone: '', email: '',
        contractorId: '', description: '', labor: null, branchId: branchOptions.length > 0 ? branchOptions[0].value : ''
    });
    const [reloadFlag, setReloadFlag] = useState(false);

    const [showModal, setShowModal] = useState<'create' | 'edit' | 'status' | null>(null)

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Job Orders'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Job Orders'} onClick={() => {
                    setPresetData({
                        truckId: '', plate: '', make: '', model: '',
                        customerId: '', name: '', username: '', phone: '', email: '',
                        contractorId: '', description: '', labor: null, branchId: branchOptions.length > 0 ? branchOptions[0].value : ''
                    }); setShowModal('create')
                }} variant="primary" />
            </SectionHeading>

            <ActiveOrdersTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} setSelectedJobOrder={setSelectedJobOrder} setInvalidateData={setInvalidateData} />

            {(showModal === "create" || showModal === "edit") && <JobOrderModal branchOptions={branchOptions} setShowModal={setShowModal} presetData={presetData} onSuccess={reload} id={selectedId} action={showModal} />}

            {showModal === "status" && <ChangeStatusModal onSuccess={reload} setShowModal={setShowModal} id={selectedId} selectedJobOrder={selectedJobOrder} invalidateData={invalidateData} />}
        </>
    )
}