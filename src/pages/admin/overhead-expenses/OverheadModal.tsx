import { useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import type { SelectionOptions } from "../../../components/Selection";
import type { ValidationSchema } from "../../../utils/validateAndSanitize";
import usePostPutData from "../../../hooks/usePostPutData";
import validateAndSanitize from "../../../utils/validateAndSanitize";
import Selection from "../../../components/Selection";
import ErrorModal from "../../../components/ErrorModal";

export type FormData = {
    description: string,
    amount: number | null,
    branchId?: string,
    monthly?: boolean
}

const formSchema: ValidationSchema = {
    description: { required: true },
    amount: { required: true, type: "money" },
    branchId: { required: true }
};

type OverheadModalProps = {
    branchOptions?: SelectionOptions[];
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetData: FormData;
    id?: string;
}

export default function OverheadModal({ branchOptions, setShowModal, onSuccess, action, presetData, id }: OverheadModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api/overheads')

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);

        if (!isValid) return;

        const success = action === 'create' ? await postData(validatedData) : await putData(id, validatedData)
        if (success) {
            onSuccess();
            setFormData({ description: "", amount: null });
            closeModal();
        }
    };

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">Add Bill</h2>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <fieldset>
                            Branch
                            <Selection
                                options={branchOptions}
                                value={formData.branchId}
                                onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                            />
                        </fieldset>

                        <fieldset className="card">
                            <div className="grid gap-x-10 gap-y-[20px]">
                                <Field.Text
                                    id="description"
                                    label="Description"
                                    placeholder="Electric Bill"
                                    value={formData.description}
                                    onChange={(e) => {
                                        setFormData({ ...formData, description: e.target.value });
                                    }}
                                />
                                <label className="flex gap-2 -mt-2 items-center text-dark">
                                    <input
                                        type="checkbox"
                                        checked={!!formData.monthly}
                                        onChange={(e) => setFormData({ ...formData, monthly: e.target.checked })}
                                    />
                                    Monthly
                                </label>
                                
                                <Field.Money
                                    id="amount"
                                    label="Amount"
                                    value={formData.amount}
                                    onChange={(values) => {
                                        setFormData({ ...formData, amount: values.floatValue ?? null });
                                    }}
                                />
                            </div>
                        </fieldset>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} disabled={loading} />
                            {action === 'create'
                                ? <Button type="submit" variant="primary" label={loading ? "Adding..." : "Add Overhead"} disabled={loading} />
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