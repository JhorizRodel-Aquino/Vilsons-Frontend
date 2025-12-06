import Loading from "../../../../components/Loading";
import useGetData from "../../../../hooks/useGetData";
import FinanceCard from "./FinanceCard";


export default function CustomerBalanceCard() {
    const {data, loading, error, closeError, refetch, reload} = useGetData('/api/dashboard/customer-balance');

    console.log({data});

    loading && <Loading />

    return (
            <FinanceCard label={'Balance'} iconName={'balance'} value={data?.totalBalanceAllCustomers} delta={12.5} />
    );
}