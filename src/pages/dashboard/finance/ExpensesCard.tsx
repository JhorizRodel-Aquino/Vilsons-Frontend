import { useEffect } from "react";
import Loading from "../../../components/Loading";
import FinanceCard from "./FinanceCard";
import useGetByMonthYear, { type MonthYearParams } from "../../../hooks/useGetByMonthYear";

export default function ExpensesCard({ monthYearParams, branchParams } : {monthYearParams: MonthYearParams, branchParams: string}) {
    const { data, loading, error, closeError, refetch, reload, setMonthYearParams, setBranchParams } = useGetByMonthYear('/api/dashboard/expenses');

    console.log({ data });

    useEffect(() => {
        setMonthYearParams(monthYearParams)
        setBranchParams(branchParams)
    }, [monthYearParams, branchParams])

    loading && <Loading />

    return (
        <FinanceCard label={'Expenses'} iconName={'falling'} value={data?.data?.value} delta={+12.5} children={data?.data?.children} />
    );
}