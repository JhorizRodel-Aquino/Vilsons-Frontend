import { useState } from "react";
import Selection from "../../../components/Selection";
import FinanceChart from "./FinanceChart";

export default function FinanceChartSection({branchParams}: {branchParams: string}) {

    const [graphTypeParams, setGraphTypeParams] = useState<string>('monthly');


    return (
        <section className='flex flex-col border-all rounded-[15px] bg-light gap-5 p-5 h-full max-h-[700px]'>
            <div className="flex items-center gap-5">
                <h2 className='text-base font-medium text-darker'>Revenue and Profit Trends</h2>
                <Selection options={[
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                ]} value={graphTypeParams} onChange={(e) => setGraphTypeParams(e.target.value)} />
            </div>

            <div className='flex-1 flex items-center'>
                <FinanceChart graphTypeParams={graphTypeParams} branchParams={branchParams} />
            </div>
        </section>
    )
}