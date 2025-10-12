import { useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import usePostPutData from "../../../hooks/usePostPutData";
import ErrorModal from "../../../components/ErrorModal";
import validateAndSanitize, { type ValidationSchema } from "../../../utils/validateAndSanitize";

export type FormData = {
    referenceNumber: string,
    jobOrderCode: string,
    senderName: string
    amount: number | null,
    mop: string,
}

const formSchema: ValidationSchema = {
    referenceNumber: {},
    jobOrderCode: { required: true },
    senderName: { required: true },
    amount: { required: true },
    mop: { required: true }
};

type TransactionsModalProps = {
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetData: FormData;
    id?: string;
}

export default function TransactionModal({ setShowModal, onSuccess, action, presetData, id }: TransactionsModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api/transactions')

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);

        if (!isValid) return;

        const formattedData = {...validatedData, status: 'successful'}
        const success = action === 'create' ? await postData(formattedData) : await putData(id, formattedData)
        if (success) {
            onSuccess();
            setFormData({ referenceNumber: '', jobOrderCode: '', senderName: '', amount: null, mop: '' });
            closeModal();
        }
    };

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">Add Transaction</h2>
                            <button className="cursor-pointer" onClick={closeModal}>✕</button>
                        </div>

                        <fieldset className="card">
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                <Field.Text
                                    id="referenceNumber"
                                    label="Reference Number"
                                    value={formData.referenceNumber}
                                    onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}

                                />
                                <Field.Text
                                    id="jobOrderCode"
                                    label="Job Number"
                                    placeholder="JO-XX-XXX"
                                    value={formData.jobOrderCode}
                                    onChange={(e) => setFormData({ ...formData, jobOrderCode: e.target.value })}
                                />
                                <Field.Text
                                    id="senderName"
                                    label="Sender Name"
                                    value={formData.senderName}
                                    onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                                />
                                <Field.Text
                                    id="mop"
                                    label="Mode of Payment"
                                    value={formData.mop}
                                    onChange={(e) => setFormData({ ...formData, mop: e.target.value })}
                                />                                   <Field.Money
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
                                ? <Button type="submit" variant="primary" label={loading ? "Adding..." : "Add Transaction"} disabled={loading} />
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