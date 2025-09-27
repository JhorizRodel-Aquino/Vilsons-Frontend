import { useState } from "react";
import Detail from "../../../../components/Detail"
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";
import ActiveOrdersTable from "./ActiveOrdersTable";
import ArchivedOrdersTable from "./ArchivedOrdersTable";



export default function ContractorDetailsContent() {
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
                            <Detail label='Active Orders' value={23} align="center" variant="flipped" highlight={activeTab === tabs[0]} />
                        </button>
                        <button className={`p-[10px] ${activeTab === tabs[1] && 'bg-light-primary border-primary rounded-[10px]'}`}
                            onClick={() => setActiveTab(tabs[1])}
                        >
                            <Detail label='Archived Orders' value={23} align="center" variant="flipped" highlight={activeTab === tabs[1]} />
                        </button>
                    </section>

                    <section className="card">
                        <Detail label='Total Balance' value={formatPesoFromCents(10000)} align="center" variant="flipped" />
                    </section>

                    {/* <section className="card">
                        <Detail label='Date Joined' value={'Aug 6, 2003'} align="center" variant="flipped" />
                    </section> */}

                    <section className="card w-full">
                        <h2 className="font-bold text-primary mb-5">Contact Information</h2>
                        <div className="grid gap-5">
                            <Detail label='Email Address' value={'james@gmail.com'} />
                            <Detail label='Phone Number' value={'0932434253'} />
                        </div>
                    </section>

                    {/* <section className="card w-full">
                        <h2 className="font-bold text-primary mb-5">Additional Information</h2>
                        <div className="grid gap-5">
                            <Detail label='Description' value={'Reliable logistics and transportation services with 15+ years of experience in the industry. '} />
                            <Detail label='Date Joined' value={'Aug 6, 2003'} />
                        </div>
                    </section> */}
                </div>

            </div>

        </>


    )
}