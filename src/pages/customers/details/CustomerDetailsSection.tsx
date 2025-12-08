import { useEffect, useState } from "react";
import Detail from "../../../components/Detail"
import formatPesoFromCents from "../../../utils/formatPesoFromCents";
import ActiveOrdersTable from "./ActiveOrdersTable";
import ArchivedOrdersTable from "./ArchivedOrdersTable";
import TrucksTable from "./TrucksTable";
import { useParams } from "react-router";
import useGetData from "../../../hooks/useGetData";
import ErrorModal from "../../../components/ErrorModal";
import Loading from "../../../components/Loading";
import ProfilePicture from "../../../components/ProfilePicture";
import API_URL from "../../../constants/API_URL";
import formatDate from "../../../utils/formatDate";
import userProfile from '../../../assets/user-profile.webp'



export default function CustomerDetailsSection() {
    const { id } = useParams(); // 👈 get contractor ID from URL
    const { data, loading, error, closeError, refetch, reload } = useGetData(`/api/customers/${id}`)

    const tabs = ['active', 'archived', 'trucks'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const customerData = data?.data || {}
    const { jobOrders, jobOrderSummary, user, trucks } = customerData

    if (loading) return <Loading />

    return (
        <>
            <section className="card border-t-primary border-t-[20px] flex gap-5">
                <ProfilePicture src={
                    user?.image ? API_URL + '/images/' + user?.image : userProfile
                } />
                <div className="flex-1">
                    <h1 className="mb-5">{user?.fullName}</h1>
                    <div className="grid grid-cols-3 gap-y-[10px]">
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Username:</dt>
                            <dd className="text-dark">{user?.username}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Contract:</dt>
                            <dd className="text-dark capitalize">{user?.phone}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Email:</dt>
                            <dd className="text-dark capitalize">{user?.email}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Joined:</dt>
                            <dd className="text-dark">{formatDate(user?.createdAt)}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Updated:</dt>
                            <dd className="text-dark">{formatDate(user?.updatedAt)}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Updated By:</dt>
                            <dd className="text-dark">{user?.updatedByUser}</dd>
                        </dl>
                    </div>
                </div>
            </section>

            <div className="grid gap-[20px] grid-cols-[3fr_1fr] overflow-y-hidden thin-scrollbar">
                <section className="grid card p-0 overflow-y-auto thin-scrollbar">
                    {activeTab === tabs[0] && <ActiveOrdersTable data={jobOrders?.active} />}
                    {activeTab === tabs[1] && <ArchivedOrdersTable data={jobOrders?.archived} />}
                    {activeTab === tabs[2] && <TrucksTable data={trucks} />}
                </section>

                <div className="grid gap-[20px] content-start overflow-y-auto thin-scrollbar">
                    <section className="card grid grid-cols-2 p-0">
                        <button className={`p-[10px] ${activeTab === tabs[0] && 'bg-light-primary border-primary rounded-[10px]'}`}
                            onClick={() => setActiveTab(tabs[0])}
                        >
                            <Detail label='Active Orders' value={jobOrderSummary?.activeCount} align="center" variant="flipped" highlight={activeTab === tabs[0]} />
                        </button>
                        <button className={`p-[10px] ${activeTab === tabs[1] && 'bg-light-primary border-primary rounded-[10px]'}`}
                            onClick={() => setActiveTab(tabs[1])}>
                            <Detail label='Archived Orders' value={jobOrderSummary?.archivedCount} align="center" variant="flipped" highlight={activeTab === tabs[1]} />
                        </button>
                    </section>

                    <section className="card">
                        <Detail label='Total Balance' value={formatPesoFromCents(jobOrderSummary?.totalBalance)} align="center" variant="flipped" />
                    </section>

                    <section className="card grid p-0">
                        <button className={`p-[10px] ${activeTab === tabs[2] && 'bg-light-primary border-primary rounded-[10px] p-[10px]'}`}
                            onClick={() => setActiveTab(tabs[2])}
                        >
                            <Detail label='Trucks Owned' value={trucks?.length || 0} align="center" variant="flipped" highlight={activeTab === tabs[2]} />
                        </button>
                    </section>

                    {/* <section className="card">
                        <Detail label='Date Joined' value={'Aug 6, 2003'} align="center" variant="flipped" />
                    </section> */}

                    {/* <section className="card w-full">
                        <h2 className="font-bold text-primary mb-5">Contact Information</h2>
                        <div className="grid gap-5">
                            <Detail label='Email Address' value={info?.email} />
                            <Detail label='Phone Number' value={info?.phone} />
                        </div>
                    </section> */}

                    {/* 
                    <section className="card w-full">
                        <h2 className="font-bold text-primary mb-5">Additional Information</h2>
                        <div className="grid gap-5">
                            <Detail label='Description' value={'Reliable logistics and transportation services with 15+ years of experience in the industry. '} />
                            <Detail label='Date Joined' value={'Aug 6, 2003'} />
                        </div>
                    </section> */}
                </div>
            </div>

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>


    )
}