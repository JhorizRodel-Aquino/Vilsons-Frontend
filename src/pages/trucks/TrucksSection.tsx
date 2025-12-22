import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import TrucksTable from "./TrucksTable"
import { useCallback, useState } from "react"
import type { FormData } from "./TrucksModal";
import TrucksModal from "./TrucksModal";
import ChangeOwnerModal from "./ChangeOwnerModal";
import formatDate from "../../utils/formatDate";

export type SelectedCustomer = {
    name: string;
    username: string;
    id: string;
}

export default function TrucksSection() {
    const [invalidateData, setInvalidateData] = useState<Record<string, any>>({customerId: ''});
    const [selectedId, setSelectedId] = useState<string>('');
    const [selectedTruck, setSelectedTruck] = useState<{plate: string}>({plate: ''});
    const [presetData, setPresetData] = useState<FormData>({ plate: "", make: "", model: "" });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | 'change' | null>(null)
        const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Trucks'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>

            <TrucksTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} setSelectedTruck={setSelectedTruck} setInvalidateData={setInvalidateData} setLastUpdated={setLastUpdated}/>

            {(showModal === "create" || showModal === "edit") && <TrucksModal setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} />}
            {showModal === "change" && <ChangeOwnerModal setShowModal={setShowModal} onSuccess={reload} truckId={selectedId} selectedTruck={selectedTruck} invalidateData={invalidateData} />}
        </>
    )
}