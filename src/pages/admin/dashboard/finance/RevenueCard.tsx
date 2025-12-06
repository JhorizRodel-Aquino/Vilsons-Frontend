import Loading from "../../../../components/Loading";
import useGetData from "../../../../hooks/useGetData";
import FinanceCard from "./FinanceCard";

export default function RevenueCard() {
    const {data, loading, error, closeError, refetch, reload} = useGetData('/api/dashboard/revenue');

    console.log({data});

    loading && <Loading />

    return (
            <FinanceCard label={'Revenue'} iconName={'peso'} value={data?.data?.totalRevenue} delta={+12.5} />
    );
}