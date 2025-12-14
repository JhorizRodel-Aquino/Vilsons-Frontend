import { useEffect } from "react";
import Loading from "../../../components/Loading";
import useGetData from "../../../hooks/useGetData";
import FinanceCard from "./FinanceCard";
import useGetByMonthYear, { type MonthYearParams } from "../../../hooks/useGetByMonthYear";


export default function CustomerBalanceCard({ monthYearParams, branchParams } : {monthYearParams: MonthYearParams, branchParams: string}) {
    const { data, loading, error, closeError, refetch, reload, setMonthYearParams, setBranchParams } = useGetByMonthYear('/api/dashboard/customer-balance');

    console.log({ data });

    useEffect(() => {
        setMonthYearParams(monthYearParams)
        setBranchParams(branchParams)
    }, [monthYearParams, branchParams])

    loading && <Loading />

    return (
        <FinanceCard label={'Customer Balance'} iconName={'balance'} value={data?.totalBalanceAllCustomers} delta={12.5} />
    );
}