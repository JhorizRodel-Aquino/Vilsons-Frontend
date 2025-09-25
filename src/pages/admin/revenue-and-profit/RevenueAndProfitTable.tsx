import formatPesoFromCents from "../../../utils/formatPesoFromCents";

export type RevenueAndProfit = {
    category: string;
    amount: number
    depth?: number
}

export default function RevenueAndProfitTable({ rows }: { rows: RevenueAndProfit[] }) {

    return (
        <div className="table-section">
            <div className='table-container'>
                <table className="sticky top-0">
                    <thead className="border-b">
                        <tr>
                            <th className="text-start">Category</th>
                            <th className="text-end">Amount</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='table-container main'>
                <table>
                    <tbody className='divide-y divide-border'>
                        {rows.map((row, i) => (
                            <tr key={i} className={`hover:bg-gray ${row.depth === 0 ? 'bg-light-gray text-primary font-semibold uppercase sticky top-0' : row.depth === 1 ? 'capitalize' : 'text-darker capitalize'}`}>
                                <td style={{ paddingLeft: 16 * ((row.depth ?? 0) - 1) + 8 }}>{row.category}</td>
                                <td className="text-end">{formatPesoFromCents(row.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {rows.length <= 0 && <p className='text-center my-10 italic'>No Records</p>}
            </div>
        </div>
    )
}