import { useState } from "react";
import Detail from "../../../components/Detail"
import ActiveOrdersTable from "./ActiveOrdersTable";
import ArchivedOrdersTable from "./ArchivedOrdersTable";
import formatDate from "../../../utils/formatDate";
import useGetData from "../../../hooks/useGetData";
import { useParams } from "react-router";
import ErrorModal from "../../../components/ErrorModal";
import Loading from "../../../components/Loading";
import ProfilePicture from "../../../components/ProfilePicture";
import API_URL from "../../../constants/API_URL";
import truckProfile from '../../../assets/truck-profile.webp'

export default function MyTruckDetailsSection() {
    const { id } = useParams(); 
    const { data, loading, error, closeError } = useGetData(`/api/me/my-trucks/${id}`)
    const tabs = ['active', 'archived'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const truckData = data?.data || {}
    const {
        image,
        plate, make, model,
        createdAt, updatedAt, updatedByUser,
        jobOrders, jobOrderSummary,
        owners } = truckData


    if (loading) return <Loading />

    return (
        <>
            <section className="card border-t-primary border-t-[20px] flex gap-5 mb-5">
                <ProfilePicture src={
                    image ? API_URL + '/images/' + image : truckProfile
                } />

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h1 className="mb-5">{plate}</h1>
                    </div>

                    <div className="grid grid-cols-3 gap-y-[10px]">
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Plate:</dt>
                            <dd className="text-dark">{plate}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Make:</dt>
                            <dd className="text-dark">{make}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Model:</dt>
                            <dd className="text-dark">{model}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Created:</dt>
                            <dd className="text-dark">{formatDate(createdAt)}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Updated:</dt>
                            <dd className="text-dark">{formatDate(updatedAt)}</dd>
                        </dl>
                        <dl className="flex gap-2">
                            <dt className="font-semibold text-darker">Updated By:</dt>
                            <dd className="text-dark">{updatedByUser}</dd>
                        </dl>
                    </div>
                </div>
            </section>

            <div className="grid gap-[20px] grid-cols-[3fr_1fr] overflow-y-hidden thin-scrollbar">
                <section className="grid card p-0 overflow-y-auto thin-scrollbar">
                    {activeTab === tabs[0] && <ActiveOrdersTable data={jobOrders?.active} />}
                    {activeTab === tabs[1] && <ArchivedOrdersTable data={jobOrders?.archived} />}
                </section>

                <div className="grid gap-[20px] content-start overflow-y-auto thin-scrollbar">
                    <section className="card grid grid-cols-2 p-0">
                        <button className={`p-[10px] ${activeTab === tabs[0] && 'bg-light-primary border-primary rounded-[10px]'}`}
                            onClick={() => setActiveTab(tabs[0])}
                        >
                            <Detail label='Active Orders' value={jobOrderSummary?.activeCount} align="center" variant="flipped" />
                        </button>
                        <button className={`p-[10px] ${activeTab === tabs[1] && 'bg-light-primary border-primary rounded-[10px]'}`}
                            onClick={() => setActiveTab(tabs[1])}
                        >
                            <Detail label='Archived Orders' value={jobOrderSummary?.archivedCount} align="center" variant="flipped" />
                        </button>
                    </section>

                    <section className="card w-full">
                        <div className="flex justify-between items-center  mb-5">
                            <h2 className="font-bold text-primary">History of Ownership</h2>
                        </div>

                        <div className="grid gap-5">
                            {owners?.map((owner: any, i: any) => (
                                <div key={i}>
                                    <Detail label={`${formatDate(owner.startDate, "date")} - ${owner.endDate ? formatDate(owner.endDate, "date") : 'Current'}`} value={owner.fullName} />
                                    <p className=" -mt-1 text-sm text-darker">@{owner.username}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>


    )
}