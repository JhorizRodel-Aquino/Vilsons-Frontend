import formatPesoFromCents from "../../../utils/formatPesoFromCents";

// export type RevenueAndProfitTableProps = {
//     totalRevenue: number;
//     serviceRevenue: number;
//     otherIncome: number;
//     totalExpenses: number;
//     operationalExpenses: number;
//     materialExpenses: number;
//     equipmentExpenses: number;
//     laborExpenses: number;
//     overheadExpenses: number;
//     grossProfit: number;  
// };


export type RevenueAndProfit = {
    category: string;
    amount: number
    depth?: number
}

// {
//     totalRevenue, 
//     serviceRevenue, 
//     otherIncome, 
//     totalExpenses, 
//     operationalExpenses, 
//     materialExpenses, 
//     equipmentExpenses, 
//     laborExpenses, 
//     overheadExpenses, 
//     grossProfit 
// }: RevenueAndProfitTableProps

export default function RevenueAndProfitTable({ rows }: { rows: RevenueAndProfit[] }) {

    return (
        <div className='px-[20px] divide-y divide-border grid gap-[20px]'>
            <table className='border-collapse w-full divide-y divide-border'>
                <thead>
                    <tr>
                        <th className="text-left">Category</th>
                        <th className="text-right">Amount</th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-border'>
                    {rows.map(row => (
                        <tr className={`hover:bg-gray ${row.depth === 0 ? 'bg-light-gray text-primary font-semibold uppercase' : row.depth === 1 ? 'capitalize' : 'text-darker capitalize'}`}>
                            <td style={{ paddingLeft: 16 * ((row.depth ?? 0) - 1) + 8 }}>{row.category}</td>
                            <td className="text-end">{formatPesoFromCents(row.amount)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* 
            {total !== undefined && rows.length > 0 && (
            <TableTotal total={10000000} />
            )}

            {rows.length <= 0 && <p className='text-center my-10 italic'>No Records</p>} */}
        </div>
    )
}