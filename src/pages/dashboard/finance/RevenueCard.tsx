import { useEffect } from "react";
import Loading from "../../../components/Loading";
import useGetByMonthYear, { type MonthYearParams } from "../../../hooks/useGetByMonthYear";
import FinanceCard from "./FinanceCard";

export default function RevenueCard({ monthYearParams, branchParams } : {monthYearParams: MonthYearParams, branchParams: string}) {
    const {data, loading, error, closeError, refetch, reload, setMonthYearParams, setBranchParams} = useGetByMonthYear('/api/dashboard/revenue');

    useEffect(() => {
        setMonthYearParams(monthYearParams)
        setBranchParams(branchParams)
    }, [monthYearParams, branchParams])

    console.log({data});

    loading && <Loading />

    return (
            <FinanceCard label={'Revenue'} iconName={'peso'} value={data?.data?.totalRevenue} delta={+12.5} />
    );
}