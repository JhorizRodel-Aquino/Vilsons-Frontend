import ContractorDetailsSection from "./ContractorDetailsSection";
import PageContent from "../../../components/PageContent";
import ProfilePicture from "../../../components/ProfilePicture";
import PageHeading from "../../../components/PageHeading";
import { useParams } from "react-router";
import useGetData from "../../../hooks/useGetData";
import ErrorModal from "../../../components/ErrorModal";
import Loading from "../../../components/Loading";
import API_URL from "../../../constants/API_URL";

export default function ContractorDetailsPage() {
    const { id } = useParams(); // 👈 get contractor ID from URL
    const { data, loading, error, closeError, refetch, reload } = useGetData(`/api/contractors/${id}`)

    const contractorData = data?.data || {}

    if (loading) return <Loading />

    return (
        <>
            {/* <div className="w-full flex gap-6 items-center mb-[34px]">
                <ProfilePicture src={API_URL + `/images/users/${contractorData.image}`} />
                <div className="">
                    <PageHeading title={contractorData?.user?.fullName} />
                    <p className="font-medium text-darker -mt-[30px]">@{contractorData?.user?.username}</p>
                </div>
            </div> */}

            <PageContent scroll={false}>
                <ContractorDetailsSection/>
            </PageContent>

            
        </>
    )
}