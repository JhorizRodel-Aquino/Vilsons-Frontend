import { useState } from 'react';
import Loading from '../../../components/Loading';
import PageContent from '../../../components/PageContent';
import PageHeading from '../../../components/PageHeading';
import Selection from '../../../components/Selection';
import useGetData from '../../../hooks/useGetData';
import FinanceChart from './finance/FinanceChart';
import RenderFinanceCards from './finance/RenderFinanceCards';
import RenderJobOrderCards from './job-orders/RenderJobOrderCards';
import RenderRecentJobOrderCards from './job-orders/RenderRecentJobOrderCards';
import FinanceChartSection from './finance/FinanceChartSection';


function DashboardPage() {
    const { data, loading, error, closeError, refetch, reload } = useGetData('/api/dashboard/job-orders');

    console.log({data});

    loading && <Loading />

    return (
        <>
            <PageHeading title={'Dashboard'} />

            <PageContent>
                <section className='grid gap-5'>
                    <h2 className='text-base font-medium text-darker'>Monthly Financial Overview</h2>
                    <div className='grid gap-[10px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
                        <RenderFinanceCards />
                    </div>
                </section>

                <section className='grid gap-5'>
                    <h2 className='text-base font-medium text-darker'>Job Order Status</h2>
                    <div className='grid gap-[10px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
                        <RenderJobOrderCards data={data?.data?.counts}/>
                    </div>
                </section>

                <div className='grid gap-7 grid-cols-1 xl:grid-cols-[2fr_1fr]'>
                    <FinanceChartSection />

                    <section className='grid border-all rounded-[15px] bg-light h-full overflow-y-auto thin-scrollbar max-h-[700px]'>
                        <h2 className='text-base font-medium text-darker sticky top-0 bg-light p-5'>Recent Job Orders</h2>
                        <div className='grid gap-[10px] p-5 pt-0'>
                            <RenderRecentJobOrderCards data={data?.data?.recent}/>
                        </div>
                    </section>
                </div>
            </PageContent>
        </>

    )
}

export default DashboardPage;