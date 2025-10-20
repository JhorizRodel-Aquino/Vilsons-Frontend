import CustomerDetailsContent from "./CustomerDetailsContent";
import PageContent from "../../../../components/PageContent";
import ProfilePicture from "../../../../components/ProfilePicture";
import PageHeading from "../../../../components/PageHeading";
import { useParams } from "react-router";
import useGetData from "../../../../hooks/useGetData";
import ErrorModal from "../../../../components/ErrorModal";
import Loading from "../../../../components/Loading";

export default function CustomerDetailsPage() {
    const { id } = useParams(); // 👈 get contractor ID from URL
    const { data, loading, error, closeError, refetch, reload } = useGetData(`/api/customers/${id}`)

    const customerData = data?.data || {}

    console.log(customerData) 

    if (loading) return <Loading />

    return (
        <>
            <div className="w-full flex gap-6 items-center mb-[34px]">
                <ProfilePicture src={''} />
                <div className="">
                    <PageHeading title={customerData?.user?.fullName} />
                    <p className="font-medium text-darker -mt-[30px]">@{customerData?.user?.username}</p>
                </div>
            </div>

            <PageContent scroll={false}>
                <CustomerDetailsContent data={customerData} />
            </PageContent>

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}