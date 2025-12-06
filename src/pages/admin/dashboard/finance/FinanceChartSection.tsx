import { useState } from "react";
import Selection from "../../../../components/Selection";
import FinanceChart from "./FinanceChart";
import getBranches from "../../../../utils/branchOptions";
import TableFilter from "../../../../components/TableFilter";

export default function FinanceChartSection() {
    const branchOptions = getBranches()
    const [graphTypeParams, setGraphTypeParams] = useState<string>('monthly');
    const [branchParams, setBranchParams] = useState<string>('');

    return (
        <section className='flex flex-col border-all rounded-[15px] bg-light gap-5 p-5 h-full max-h-[700px]'>
            <TableFilter>
                <TableFilter.Group>
                <h2 className='text-base font-medium text-darker'>Revenue and Profit Trends</h2>
                <Selection options={[
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                ]} value={graphTypeParams} onChange={(e) => setGraphTypeParams(e.target.value)} />
                </TableFilter.Group>

                <Selection
                    options={branchOptions}
                    value={branchParams}
                    onChange={(e) => setBranchParams(e.target.value)}
                />
            </TableFilter>

            <div className='flex-1 flex items-center'>
                <FinanceChart graphTypeParams={graphTypeParams} branchParams={branchParams} />
            </div>
        </section>
    )
}