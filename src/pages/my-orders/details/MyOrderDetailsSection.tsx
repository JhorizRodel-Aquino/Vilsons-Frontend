import { useParams } from "react-router";
import Detail from "../../../components/Detail"
import formatPesoFromCents from "../../../utils/formatPesoFromCents";
import useGetData from "../../../hooks/useGetData";
import Loading from "../../../components/Loading";
import API_URL from "../../../constants/API_URL";
import ImagePreview from "./ImagePreview";
import formatDate from "../../../utils/formatDate";
import ErrorModal from "../../../components/ErrorModal";

export default function MyOrderDetailsSection() {
    const { id } = useParams();
    const { data, loading, error, closeError, reload } = useGetData(`/api/me/my-job-orders/${id}`)

    const userData = data?.data || {}
    const {
        jobOrderCode, status,
        createdAt, updatedAt, updatedBy,
        branchName,
        truckId, plate, make, model, engine,
        contractorId, contractorName, contractorUsername, contractorPhone, contractorEmail,
        customerId, customerName, customerUsername, customerPhone, customerEmail, balance, 
        description,
        images,
        materials, totalMaterialCost,
        contractorCommission, shopCommission, labor,
        totalBill,
    } = userData;

    if (loading) return <Loading />;

    return (
        <>
            <section className="card border-t-primary border-t-[20px]">
                <div className="flex justify-between items-start">
                    <h1 className="mb-5">{jobOrderCode}</h1>
                    <div className="space-x-2">
                        {/* <Button label="Change Status" variant="outline" size="mini" onClick={() => setShowModal("status")} />
                        <Button label="Edit Details" variant="outline" size="mini" onClick={handleEdit} /> */}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-y-[10px]">
                    <dl className="flex gap-2">
                        <dt className="font-semibold text-darker">Job Number:</dt>
                        <dd className="text-dark">{jobOrderCode}</dd>
                    </dl>
                    <dl className="flex gap-2">
                        <dt className="font-semibold text-darker">Branch:</dt>
                        <dd className="text-dark">{branchName}</dd>
                    </dl>
                    <dl className="flex gap-2">
                        <dt className="font-semibold text-darker">Status:</dt>
                        <dd className="text-dark capitalize">{status}</dd>
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
                        <dd className="text-dark">{updatedBy}</dd>
                    </dl>
                </div>
            </section>

            <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                <section className="card w-full">
                    <h2 className="font-bold text-primary mb-5">Vehicle Information</h2>
                    <div className="flex flex-wrap gap-x-30 gap-y-5">
                        <Detail label='Plate' value={plate} />
                        <Detail label='Make' value={make} />
                        <Detail label='Model' value={model} />
                        <Detail label='Engine' value={engine} />
                    </div>
                </section>

                {/* <section className="card w-full">
                    <h2 className="font-bold text-primary mb-5">Customer Information</h2>
                    <div className="flex flex-wrap gap-x-30 gap-y-5">
                        <Detail label='Name' value={customerName} />
                        <Detail label='Contact Number' value={customerPhone} />
                        <Detail label='Email Address' value={customerEmail} />
                    </div>
                </section> */}
            </div>

            <section className="card w-full">
                <h2 className="font-bold text-primary mb-5">Assigned Contractor</h2>
                {contractorId ?
                    <div className="flex flex-wrap gap-x-30 gap-y-5">
                        <Detail label='Name' value={contractorName} />
                        <Detail label='Contact Number' value={contractorPhone} />
                        <Detail label='Email Address' value={contractorEmail} />
                    </div>
                    :
                    <p className="italic">No contractor assigned yet</p>
                }
            </section>

            <section className="card w-full">
                <h2 className="font-bold text-primary mb-5">Job Description</h2>
                <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
                    <p>{description}</p>
                </div>
            </section>

            <ImagePreview images={images} API_URL={API_URL} onSuccess={reload} />

            {/* <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
                <section className="card w-full flex flex-col max-h-[400px] overflow-hidden">
                    <h2 className="font-bold text-primary mb-5">Materials</h2>
                    <div className="flex flex-col flex-1 gap-5 overflow-y-auto justify-between relative thin-scrollbar">
                        <div className="space-y-5">
                            {(materials && materials.length > 0) ?
                                materials?.map((mat: Record<string, any>, i: any) => (
                                    <div key={i} className="flex justify-between items-end">
                                        <Detail label={mat.materialName} value={`\u00A0\u00A0${mat.quantity} × ${formatPesoFromCents(mat.price)}`} />
                                        <span>{formatPesoFromCents(mat.total)}</span>
                                    </div>
                                ))
                                :
                                <p className="italic">No materials</p>
                            }
                        </div>

                        <Detail label='Total' value={formatPesoFromCents(totalMaterialCost)} variant="adjacent" align="between" highlight={true} className="font-bold sticky bottom-0 bg-light pt-2" />
                    </div>
                </section>

                <section className="card w-full flex flex-col max-h-[400px] overflow-hidden">
                    <h2 className="font-bold text-primary mb-5">Labor</h2>
                    <div className="flex flex-col flex-1 gap-5 overflow-y-auto justify-between relative thin-scrollbar">
                        <div className="space-y-5">
                            <Detail label='Shop Commission' value={formatPesoFromCents(shopCommission)} variant="adjacent" align="between" />
                            <Detail label='Contractor Commission' value={formatPesoFromCents(contractorCommission)} variant="adjacent" align="between" />
                        </div>

                        <Detail label='Total' value={formatPesoFromCents(labor)} variant="adjacent" align="between" highlight={true} className="font-bold sticky bottom-0 bg-light pt-2" />
                    </div>
                </section>
            </div>

            <section className="card w-full grid items-center">
                <Detail label='Total Bill' value={formatPesoFromCents(totalBill)} variant="adjacent" align="between" highlight={true} className="font-bold" />
            </section> */}

            {/* <section className="card w-full flex flex-col max-h-[400px] overflow-hidden">
                <h2 className="font-bold text-primary mb-5">Bill</h2>
                <div className="flex flex-col flex-1 gap-5 overflow-y-auto justify-between relative thin-scrollbar">
                    <div className="space-y-5">
                        <Detail label='Materials' value={formatPesoFromCents(totalMaterialCost)} variant="adjacent" align="between" />
                        <Detail label='Labor' value={formatPesoFromCents(labor)} variant="adjacent" align="between" />
                    </div>

                    <Detail label='Total Bill' value={formatPesoFromCents(totalBill)} variant="adjacent" align="between" highlight={true} className="font-bold sticky bottom-0 bg-light pt-2" />
                </div>
            </section> */}

            <section className="card w-full flex flex-col max-h-[400px] overflow-hidden">
                <h2 className="font-bold text-primary mb-5">Summary</h2>
                <div className="flex flex-col flex-1 gap-5 overflow-y-auto justify-between relative thin-scrollbar">
                    <div className="space-y-5">
                        <Detail label='Total Material Cost' value={formatPesoFromCents(totalMaterialCost)} variant="adjacent" align="between" />
                        <Detail label='Total Labor Cost' value={formatPesoFromCents(labor)} variant="adjacent" align="between" />
                        <Detail label='Total Bill' value={formatPesoFromCents(totalBill)} variant="adjacent" align="between" />
                        <Detail label='Total Paid' value={formatPesoFromCents(totalBill-balance)} variant="adjacent" align="between" />
                        <Detail label='My Balance' value={formatPesoFromCents(balance)} variant="adjacent" align="between" />
                    </div>
                </div>
            </section>
            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}