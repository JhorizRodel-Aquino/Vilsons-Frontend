import AppLayout from '../../../components/AppLayout';
import ContentLayout from '../../../components/ContentLayout';
import Header from '../../../components/Header'
import Main from '../../../components/Main';
import PageHeading from '../../../components/PageHeading';
import Sidebar from '../../../components/sidebar/Sidebar'
import FinancialCard from './FinanceCard';
import JobOrderCard from './JobOrderCard';
import RecentJobOrderCard from './RecenJobOrderCard';

function DashboardPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                
                <Main>
                    <PageHeading title={'Dashboard'} />

                    <div className="grid gap-7">
                        <section className='grid gap-5'>
                            <h2 className='text-base font-medium text-darker'>Monthly Financial Overview</h2>
                            <div className='grid gap-[10px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
                                <FinancialCard label={'Revenue'} value={1485000} delta={+12.5} children={[
                                    {label: 'Operational', value: 100000},
                                    {label: 'Operational', value: 100000},
                                    {label: 'Operational', value: 100000, 
                                        children: [
                                        {label: 'Operational', value: 100000},
                                        {label: 'Operational', value: 100000},
                                        {label: 'Operational', value: 100000, children: [
                                        {label: 'Operational', value: 100000},
                                        {label: 'Operational', value: 100000},
                                        {label: 'Operational', value: 100000}
                                        ]}
                                        ]
                                }
                                ]} />
                                <FinancialCard label={'Profit'} value={1485000} delta={-12.5} />
                                <FinancialCard label={'Enxpenses'} value={1485000} delta={-12.5} />
                                <FinancialCard label={'Balance'} value={1485000} delta={12.5} />
                            </div>
                        </section>

                        <section className='grid gap-5'>
                            <h2 className='text-base font-medium text-darker'>Job Order Status</h2>
                            <div className='grid gap-[10px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]'>
                                <JobOrderCard status={'pending'} value={5} />
                                <JobOrderCard status={'ongoing'} value={5} />
                                <JobOrderCard status={'completed'} value={5} />
                                <JobOrderCard status={'for release'} value={5} />
                            </div>
                        </section>

                        <div className='grid gap-7 grid-cols-1 xl:grid-cols-[2fr_1fr] h-[500px]'>
                            <section className='grid border-all rounded-[15px] bg-light gap-5 p-5 h-full'>
                                <h2 className='text-base font-medium text-darker'>Revenue and Profit Trends (2025)</h2>
                            </section>
                            
                            <section className='grid border-all rounded-[15px] bg-light gap-5 p-5 h-full overflow-y-auto'>
                                <h2 className='text-base font-medium text-darker'>Recent Job Orders</h2>
                                <div className='grid gap-[10px]'>
                                    <RecentJobOrderCard 
                                        jobNumber='25-003' 
                                        status={'ongoing'} 
                                        plate={'ZTT-795'} 
                                        contractor={'KV Services'} 
                                        datetime={'Jan 4, 2022 11:30 AM'}
                                    />
                                    <RecentJobOrderCard 
                                        jobNumber='25-003' 
                                        status={'pending'} 
                                        plate={'ZTT-795'} 
                                        contractor={'KV Services'} 
                                        datetime={'Jan 4, 2022 11:30 AM'}
                                    />
                                    <RecentJobOrderCard 
                                        jobNumber='25-003' 
                                        status={'completed'} 
                                        plate={'ZTT-795'} 
                                        contractor={'KV Services'} 
                                        datetime={'Jan 4, 2022 11:30 AM'}
                                    />
                                    <RecentJobOrderCard 
                                        jobNumber='25-003' 
                                        status={'for release'} 
                                        plate={'ZTT-795'} 
                                        contractor={'KV Services'} 
                                        datetime={'Jan 4, 2022 11:30 AM'}
                                    />
                                </div>
                            </section>
                        </div>
                    </div>
                </Main>
            </ContentLayout>
        </AppLayout>

    )
}

export default DashboardPage;