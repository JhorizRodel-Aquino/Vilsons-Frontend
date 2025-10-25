import TruckDetailsContent from "./TruckDetailsContent";
import PageContent from "../../../../components/PageContent";
import ProfilePicture from "../../../../components/ProfilePicture";
import PageHeading from "../../../../components/PageHeading";
import Detail from "../../../../components/Detail"
import { useParams } from "react-router";
import useGetData from "../../../../hooks/useGetData";
import Loading from "../../../../components/Loading";
import ErrorModal from "../../../../components/ErrorModal";
import formatDate from "../../../../utils/formatDate";
import API_URL from "../../../../constants/API_URL";

export default function TruckDetailsPage() {
    const { id } = useParams(); // 👈 get contractor ID from URL
    const { data, loading, error, closeError, refetch, reload } = useGetData(`/api/trucks/${id}`)


    const truckData = data?.data || {}

    console.log(truckData)

    if (loading) return <Loading />

    return (
        <>
            <div className="w-full flex gap-6 items-center mb-[34px]">
                <ProfilePicture src={API_URL + `/images/trucks/${truckData.image}`} />
                <div className="">
                    <PageHeading title={truckData.plate} />
                    <div className="flex flex-wrap gap-x-10 gap-y-5 -mt-[20px]">
                        <Detail label='Make:' value={truckData.make} variant="adjacent" className="text-dark" />
                        <Detail label='Model:' value={truckData.model} variant="adjacent" className="text-dark" />
                        <Detail label='Date Added:' value={formatDate(truckData.createdAt, "date")} variant="adjacent" className="text-dark" />
                    </div>

                </div>
            </div>


            <PageContent scroll={false}>
                <TruckDetailsContent data={truckData} reload={reload}/>
            </PageContent>

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}