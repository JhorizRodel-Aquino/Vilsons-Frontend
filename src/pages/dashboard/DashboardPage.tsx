import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import PageContent from '../../components/PageContent';
import PageHeading from '../../components/PageHeading';
import useGetData from '../../hooks/useGetData';
import RenderJobOrderCards from './job-orders/RenderJobOrderCards';
import RenderRecentJobOrderCards from './job-orders/RenderRecentJobOrderCards';
import FinanceChartSection from './finance/FinanceChartSection';
import FinanceCardsSection from './finance/FinanceCardsSection';
import { getBranches } from '../../services/branchService';
import Selection from '../../components/Selection';


function DashboardPage() {
    const { data, loading, error, closeError, refetch, reload, setBranchParams: setJobOrderBranchParams } = useGetData('/api/dashboard/job-orders');
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const [branchParams, setBranchParams] = useState<string>('');

    useEffect(() => {
        setJobOrderBranchParams(branchParams)
    }, [branchParams])

    console.log({ data });

    loading && <Loading />

    return (
        <>
            <div className='flex items-start justify-between'>
                <PageHeading title={'Dashboard'} />
                <Selection
                    options={branchOptions}
                    value={branchParams}
                    onChange={(e) => setBranchParams(e.target.value)}
                />
            </div>

            <PageContent>
                <FinanceCardsSection branchParams={branchParams} />

                <section className='grid gap-5'>
                    <h2 className='text-base font-medium text-darker'>Job Order Status</h2>
                    <div className='grid gap-[10px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
                        <RenderJobOrderCards data={data?.data?.counts} />
                    </div>
                </section>

                <div className='grid gap-7 grid-cols-1 xl:grid-cols-[2fr_1fr]'>
                    <FinanceChartSection branchParams={branchParams} />

                    <section className='flex flex-col border-all rounded-[15px] bg-light h-full overflow-y-auto thin-scrollbar max-h-[700px]'>
                        <h2 className='text-base font-medium text-darker sticky top-0 bg-light p-5'>Recent Job Orders</h2>
                        <div className='grid gap-[10px] p-5 pt-0'>
                            <RenderRecentJobOrderCards data={data?.data?.recent} />
                        </div>
                    </section>
                </div>
            </PageContent>
        </>

    )
}

export default DashboardPage;