import Detail from "../../../../components/Detail"
import type { Column } from "../../../../components/table/Table";
import formatPesoFromCents from "../../../../utils/formatPesoFromCents";
import Table from "../../../../components/table/Table";


export default function ContractorSinglePageContent() {
    type ArchivedJobOrder = {
        jobNumber: string;
        plateNumber: string;
        contractor: string;
        totalBill: number;
        balance: number;
    };

    const archivedJobOrderColumns: Column<ArchivedJobOrder>[] = [
        { key: "jobNumber", label: "Job Number" },
        { key: "plateNumber", label: "Plate Number" },
        { key: "contractor", label: "Contractor" },
        { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
        { key: "balance", label: "Balance", render: (value) => formatPesoFromCents(value as number) },
    ];

    const archivedJobOrders: ArchivedJobOrder[] = [
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000 },
        { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', contractor: 'Jhoriz Rodel', totalBill: 102000, balance: 30000 },

    ];
    return (
        <>
            {/* <div className="grid gap-[20px] grid-cols-[2fr_1fr] overflow-y-hidden thin-scrollbar">
                <section className="grid card p-0 overflow-y-auto thin-scrollbar">
                    <Table columns={archivedJobOrderColumns} rows={archivedJobOrders} />
                </section>

                <div className="grid gap-[20px] content-start">
                    <section className="card flex justify-around">
                        <Detail label='Active Orders' value={23} align="center" variant="flipped" />
                        <Detail label='Archived Orders' value={23} align="center" variant="flipped" />
                    </section>

                    <section className="card flex justify-center">
                        <Detail label='Total Balance' value={formatPesoFromCents(10000)} align="center" variant="flipped" />
                    </section>

                    <section className="card flex justify-center">
                        <Detail label='Trucks Owned' value={4} align="center" variant="flipped" />
                    </section>

                    <section className="card w-full">
                        <h2 className="font-bold text-primary mb-5">Personal Information</h2>
                        <div className="grid gap-5">
                            <Detail label='Email Address' value={'james@gmail.com'} />
                            <Detail label='Phone Number' value={'0932434253'} />
                        </div>
                    </section>
                </div>
            </div> */}

            <div className="grid gap-[20px] grid-cols-[2fr_1fr] overflow-y-hidden thin-scrollbar">
                <section className="grid card p-0 overflow-y-auto thin-scrollbar">
                    <Table columns={archivedJobOrderColumns} rows={archivedJobOrders} />
                </section>
                
                <div className="grid gap-[20px] content-start overflow-y-auto thin-scrollbar">
                    <section className="card flex justify-around">
                        <Detail label='Active Orders' value={23} align="center" variant="flipped" />
                        <Detail label='Archived Orders' value={23} align="center" variant="flipped" />
                    </section>

                    <section className="card flex justify-center">
                        <Detail label='Total Balance' value={formatPesoFromCents(10000)} align="center" variant="flipped" />
                    </section>

                    <section className="card flex justify-center">
                        <Detail label='Trucks Owned' value={4} align="center" variant="flipped" />
                    </section>

                    <section className="card w-full">
                        <h2 className="font-bold text-primary mb-5">Contact Information</h2>
                        <div className="grid gap-5">
                            <Detail label='Email Address' value={'james@gmail.com'} />
                            <Detail label='Phone Number' value={'0932434253'} />
                        </div>
                    </section>
                </div>
           
            </div>

        </>

        
    )
}