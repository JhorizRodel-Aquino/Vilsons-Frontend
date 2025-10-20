import { useState } from "react";
import Detail from "../../../../components/Detail"
import ActiveOrdersTable from "./ActiveOrdersTable";
import ArchivedOrdersTable from "./ArchivedOrdersTable";
import Button from "../../../../components/Button";
import formatDate from "../../../../utils/formatDate";
import ChangeOwnerModal from "../ChangeOwnerModal";



export default function TruckDetailsContent({ data, reload }: { data: Record<string, any>, reload: () => void }) {
    const tabs = ['active', 'archived'];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const owners = data.owners || [];
    const [showModal, setShowModal] = useState<string | null>(null)

    return (
        <>
            <div className="grid gap-[20px] grid-cols-[3fr_1fr] overflow-y-hidden thin-scrollbar">
                <section className="grid card p-0 overflow-y-auto thin-scrollbar">
                    {activeTab === tabs[0] && <ActiveOrdersTable data={data?.jobOrders?.active} />}
                    {activeTab === tabs[1] && <ArchivedOrdersTable data={data?.jobOrders?.archived} />}
                </section>

                <div className="grid gap-[20px] content-start overflow-y-auto thin-scrollbar">
                    <section className="card grid grid-cols-2 p-0">
                        <button className={`p-[10px] ${activeTab === tabs[0] && 'bg-light-primary border-primary rounded-[10px]'}`}
                            onClick={() => setActiveTab(tabs[0])}
                        >
                            <Detail label='Active Orders' value={data?.jobOrderSummary?.activeCount} align="center" variant="flipped" />
                        </button>
                        <button className={`p-[10px] ${activeTab === tabs[1] && 'bg-light-primary border-primary rounded-[10px]'}`}
                            onClick={() => setActiveTab(tabs[1])}
                        >
                            <Detail label='Archived Orders' value={data?.jobOrderSummary?.archivedCount} align="center" variant="flipped" />
                        </button>
                    </section>

                    <section className="card w-full">
                        <div className="flex justify-between items-center  mb-5">
                            <h2 className="font-bold text-primary">History of Ownership</h2>
                            <Button label="Change" variant="outline" size="mini" onClick={() => setShowModal("change")} />
                        </div>

                        <div className="grid gap-5">
                            {owners.map((owner: any, i: any) => (
                                <div  key={i}>
                                <Detail label={`${formatDate(owner.startDate, "date")} - ${owner.endDate ? formatDate(owner.endDate, "date") : 'Current'}`} value={owner.fullName} />
                                <p className=" -mt-1 text-sm text-darker">@{owner.username}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {showModal === "change" && <ChangeOwnerModal setShowModal={setShowModal} onSuccess={reload} truckId={data.id} selectedTruck={{plate: data.plate}}/>}

        </>


    )
}