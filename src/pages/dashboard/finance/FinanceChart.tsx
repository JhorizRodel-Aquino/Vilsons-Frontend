import { useEffect } from "react";
import Loading from "../../../components/Loading";
import ErrorModal from "../../../components/ErrorModal";
import useGetData from "../../../hooks/useGetData";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

type ChartRow = {
    label: string;
    revenue: number;
    profit: number;
};

function formatCurrencyFromCents(value: number) {
    const pesos = value / 100;
    return `₱${pesos.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function FinanceChart({ graphTypeParams, branchParams }: { graphTypeParams: string, branchParams: string }) {
    const { data, loading, error, closeError, refetch } = useGetData('/api/dashboard/revenue-profit-chart', {type: graphTypeParams, branch: branchParams});

    useEffect(() => {
        refetch();
    }, [graphTypeParams, branchParams]);

    if (loading) return <Loading />;
    if (error) return <ErrorModal error={error} closeError={closeError} />;

    const chartData: ChartRow[] = (data && data.data && Array.isArray(data.data.chart)) ? data.data.chart : [];

    return (
        <div style={{ width: "100%", height: 480 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis
                        tickFormatter={(v: number) => {
                            const pesos = v / 100;
                            const abs = Math.abs(pesos);
                            if (abs >= 1_000_000_000_000) return `₱${(pesos / 1_000_000_000_000).toFixed(1)}T`;
                            if (abs >= 1_000_000_000) return `₱${(pesos / 1_000_000_000).toFixed(1)}B`;
                            if (abs >= 1_000_000) return `₱${(pesos / 1_000_000).toFixed(1)}M`;
                            if (abs >= 1000) return `₱${(pesos / 1000).toFixed(1)}K`;
                            return `₱${pesos.toFixed(0)}`;
                        }}
                    />
                    <Tooltip formatter={(value: any) => (typeof value === "number" ? formatCurrencyFromCents(value) : value)} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#1976d2"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        connectNulls
                    />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        name="Profit"
                        stroke="#d32f2f"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        connectNulls
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}