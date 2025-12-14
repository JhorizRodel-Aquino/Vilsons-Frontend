import { useEffect } from "react";
import Loading from "../../../components/Loading";
import FinanceCard from "./FinanceCard";
import useGetByMonthYear, { type MonthYearParams } from "../../../hooks/useGetByMonthYear";


export default function ContractorOwnBalanceCard({ monthYearParams, branchParams } : {monthYearParams: MonthYearParams, branchParams: string}) {
    const { data, loading, error, closeError, refetch, reload, setMonthYearParams, setBranchParams } = useGetByMonthYear('/api/me/contractor-balance');

    console.log({ data });

    useEffect(() => {
        setMonthYearParams(monthYearParams)
        setBranchParams(branchParams)
    }, [monthYearParams, branchParams])

    loading && <Loading />

    return (
        <FinanceCard label={'Balance'} iconName={'balance'} value={data?.data?.totalBalance} delta={12.5} />
    );
}