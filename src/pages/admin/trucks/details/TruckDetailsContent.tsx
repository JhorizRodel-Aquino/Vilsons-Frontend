import { useState } from "react";
import Detail from "../../../../components/Detail"
import ActiveOrdersTable from "./ActiveOrdersTable";
import ArchivedOrdersTable from "./ArchivedOrdersTable";
import Button from "../../../../components/Button";



export default function TruckDetailsContent() {
    const tabs = ['active', 'archived'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <>
            <div className="grid gap-[20px] grid-cols-[3fr_1fr] overflow-y-hidden thin-scrollbar">
                <section className="grid card p-0 overflow-y-auto thin-scrollbar">
                    {activeTab === tabs[0] && <ActiveOrdersTable />}
                    {activeTab === tabs[1] && <ArchivedOrdersTable />}
                </section>
                
                <div className="grid gap-[20px] content-start overflow-y-auto thin-scrollbar">
                    <section className="card grid grid-cols-2 p-0">
                        <button className={`p-[10px] ${activeTab === tabs[0] && 'bg-light-primary border-primary rounded-[10px]'}`} 
                            onClick={() => setActiveTab(tabs[0])}
                        >
                            <Detail label='Active Orders' value={23} align="center" variant="flipped" />
                        </button>
                        <button className={`p-[10px] ${activeTab === tabs[1] && 'bg-light-primary border-primary rounded-[10px]'}`} 
                            onClick={() => setActiveTab(tabs[1])}
                        >
                            <Detail label='Archived Orders' value={23} align="center" variant="flipped" />
                        </button>
                    </section>

                    <section className="card w-full">
                        <div className="flex justify-between items-center  mb-5">
                            <h2 className="font-bold text-primary">History of Ownership</h2>
                            <Button label="Transfer" variant="outline" size="mini" onClick={console.log} />
                        </div>
                      
                        <div className="grid gap-5">
                            <Detail label='Jun 18, 2025 - Current' value={'KVDG CORP.'} />
                            <Detail label='Jun 18 2023 -Jun 17 2025' value={'JRFA Inc.'} />
                        </div>
                    </section>
                </div>
           
            </div>

        </>

        
    )
}