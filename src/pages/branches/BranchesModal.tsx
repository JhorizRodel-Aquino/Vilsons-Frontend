import { useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import ErrorModal from "../../components/ErrorModal";
import validateAndSanitize, { type ValidationSchema } from "../../utils/validateAndSanitize";
import usePostPutData from "../../hooks/usePostPutData";
import { invalidateCache } from "../../hooks/useGetData";

export type FormData = {
    branch: string,
    address: string,
    remarks?: string
}

const formSchema: ValidationSchema = {
    branch: { required: true },
    address: { required: true },
    remarks: { required: true }
};

type BranchesModalProps = {
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetData: FormData;
    id?: string;
}

export default function BranchesModal({ setShowModal, onSuccess, action, presetData, id }: BranchesModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api/branches')

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        const formattedData = {
            address: validatedData.address,
            name: validatedData.branch,
        }

        if (!isValid) return;

        const success = action === 'create' ? await postData(formattedData) : await putData(id, formattedData)
        if (success) {
            onSuccess(); // trigger reload in parent
            setFormData({ branch: "", address: "" }); // reset form
            closeModal();

            invalidateCache(`/api/approval-logs`);
            invalidateCache(`/api/activity-logs`);
        }
    };

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">{action === "create" ? 'Add Branch' : 'Edit Branch'}</h2>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <div className="fields grid gap-5">
                            <fieldset className="card">
                                <div className="grid gap-x-10 gap-y-[20px]">
                                    <div className="fields grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                        <Field.Text
                                            id="branch"
                                            label="Branch"
                                            value={formData.branch}
                                            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                        />

                                        <Field.Text
                                            id="address"
                                            label="Address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {action === 'edit' &&
                                <fieldset className="card">
                                    <h4 className="text-lg font-bold mb-3">Remarks</h4>
                                    <Field.TextArea
                                        id="remarks"
                                        value={formData.remarks}
                                        onChange={(e) => {
                                            setFormData({ ...formData, remarks: e.target.value });
                                        }}
                                    />
                                </fieldset>
                            }
                        </div>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} disabled={loading} />
                            {action === 'create'
                                ? <Button type="submit" variant="primary" label={loading ? "Adding..." : "Add Income"} disabled={loading} />
                                : <Button type="submit" variant="primary" label={loading ? "Saving..." : "Save"} disabled={loading} />
                            }
                        </div>
                    </form>
                    <div className="backdrop"></div>
                </>
            }

        </>
    )
}