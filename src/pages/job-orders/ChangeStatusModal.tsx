import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../utils/validateAndSanitize";
import ErrorModal from "../../components/ErrorModal";
import usePostPutData from "../../hooks/usePostPutData";
import StatusFilter from "../../components/StatusFilter";
import useStatusFilter from "../../hooks/useStatusFilter";
import getStatuses from "../../utils/statusOptions";
import Selection from "../../components/Selection";
import { invalidateCache } from "../../hooks/useGetData";

export type FormData = {
    status: string,
}

const formSchema: ValidationSchema = {
    plate: { required: true },
    make: { required: true },
    model: { required: true },
};

type ChangeStatusModalProps = {
    setShowModal: (action: null) => void,
    onSuccess: () => void,
    id: string;
    selectedJobOrder: { jobNumber: string, status: string };
    invalidateData: Record<string, any>;
}

export default function ChangeStatusModal({ setShowModal, onSuccess, id, selectedJobOrder, invalidateData }: ChangeStatusModalProps) {
    // const { options, status, setStatus } = useStatusFilter(true);
    const statusOptions = getStatuses();
    const [formData, setFormData] = useState<FormData>({ status: selectedJobOrder.status })
    const { loading, error, closeError, putData } = usePostPutData(`/api/job-orders/${id}/status`)

    useEffect(() => setFormData({ ...formData, status: selectedJobOrder.status }), [])

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        if (!isValid) return;

        const success = await putData('', validatedData)
        if (success) {
            onSuccess();
            setFormData({ status: "" });
            closeModal();

            invalidateCache(`/api/job-orders/${id}`);
            invalidateCache(`/api/contractors/${invalidateData.contractorId}`);
            invalidateCache(`/api/customers/${invalidateData.customerId}`);
            invalidateCache(`/api/trucks/${invalidateData.truckId}`);
            invalidateCache(`/api/approval-logs`);
            invalidateCache(`/api/activity-logs`);
            
            invalidateCache(`/api/dashboard/customer-balance`);
            invalidateCache(`/api/dashboard/expenses`);
            invalidateCache(`/api/dashboard/job-orders`);
            invalidateCache(`/api/dashboard/profit`);
            invalidateCache(`/api/dashboard/revenue`);
            invalidateCache(`/api/dashboard/revenue-profit-chart`);
        }
    };

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">Change Status</h2>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <fieldset>
                            <Field.Text
                                id="jobNumber"
                                label="Job Number"
                                value={selectedJobOrder.jobNumber}
                                readonly={true}
                            />
                        </fieldset>

                        <fieldset className="card grid gap-[20px]">
                            <h4 className="text-lg font-bold">Change To</h4>
                            {/* <StatusFilter options={options} status={status} setStatus={setStatus}/> */}
                            <Selection
                                options={statusOptions}
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            />
                        </fieldset>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} disabled={loading} />
                            <Button type="submit" variant="primary" label={loading ? "Changing..." : "Change Status"} disabled={loading} />
                        </div>
                    </form>

                    <div className="backdrop"></div>
                </>
            }
        </>
    )
}