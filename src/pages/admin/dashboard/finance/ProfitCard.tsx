import Loading from "../../../../components/Loading";
import useGetData from "../../../../hooks/useGetData";
import FinanceCard from "./FinanceCard";

export default function ProfitCard() {
    const {data, loading, error, closeError, refetch, reload} = useGetData('/api/dashboard/profit');

    console.log({data});

    loading && <Loading />

    return (
            <FinanceCard label={'Profit'} iconName={'rising'} value={data?.data?.grossProfit} delta={+12.5} />
    );
}