import { useEffect } from "react";
import Loading from "../../../components/Loading";
import useGetByMonthYear, { type MonthYearParams } from "../../../hooks/useGetByMonthYear";
import useGetData from "../../../hooks/useGetData";
import FinanceCard from "./FinanceCard";

export default function ProfitCard({ monthYearParams, branchParams } : {monthYearParams: MonthYearParams, branchParams: string}) {
    const { data, loading, error, closeError, refetch, reload, setMonthYearParams, setBranchParams } = useGetByMonthYear('/api/dashboard/profit');

    useEffect(() => {
        setMonthYearParams(monthYearParams)
        setBranchParams(branchParams)
    }, [monthYearParams, branchParams])

    console.log({ data });

    loading && <Loading />

    return (
        <FinanceCard label={'Profit'} iconName={'rising'} value={data?.data?.grossProfit} delta={+12.5} />
    );
}