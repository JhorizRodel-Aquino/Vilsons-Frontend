import Loading from "../../../../components/Loading";
import useGetData from "../../../../hooks/useGetData";
import FinanceCard from "./FinanceCard";

export default function ExpensesCard() {
    const { data, loading, error, closeError, refetch, reload } = useGetData('/api/dashboard/expenses');

    console.log({ data });

    loading && <Loading />

    return (
        <FinanceCard label={'Expenses'} iconName={'falling'} value={data?.data?.value} delta={+12.5} children={data?.data?.children} />
    );
}