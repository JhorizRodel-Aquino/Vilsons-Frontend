import { useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../utils/validateAndSanitize";
import ErrorModal from "../../components/ErrorModal";
import usePostPutData from "../../hooks/usePostPutData";
import Selection, { type SelectionOptions } from "../../components/Selection";
import { invalidateCache } from "../../hooks/useGetData";

export type FormData = {
    equipment: string,
    quantity: number,
    amount: number | null,
    branchId?: string
    remarks?: string,
}

const formSchema: ValidationSchema = {
    equipment: { required: true },
    quantity: { required: true },
    amount: { required: true, type: "money" },
    branchId: { required: true },
    remarks: { required: true },
};

type TransactionsModalProps = {
    branchOptions?: SelectionOptions[];
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetData: FormData;
    id?: string;
}

export default function EquipmentModal({ branchOptions, setShowModal, onSuccess, action, presetData, id }: TransactionsModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api/equipments')

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);

        if (!isValid) return;

        const { equipment, quantity, amount, branchId, remarks } = validatedData;
        const formattedData = { name: equipment, quantity, price: amount, branchId, remarks }
        const success = action === 'create' ? await postData(formattedData) : await putData(id, formattedData)
        if (success) {
            onSuccess(); // trigger reload in parent
            setFormData({ equipment: "", quantity: 1, amount: null }); // reset form
            closeModal()

            invalidateCache(`/api/finances`);
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
                            <h2 className="font-bold">{action === "create" ? 'Add Equipment' : 'Edit Equipment'}</h2>
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

                        <div className="fields grid gap-5">
                            <fieldset className="card grid gap-[20px]">
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                    <Field.Text
                                        id="equipmentName"
                                        label="Equipment"
                                        value={formData.equipment}
                                        onChange={(e) => {
                                            setFormData({ ...formData, equipment: e.target.value });
                                        }}
                                    />

                                    <Field.Number
                                        id="quantity"
                                        label="Quantity"
                                        value={formData.quantity}
                                        onChange={(e) => {
                                            setFormData({ ...formData, quantity: +e.target.value });
                                        }}
                                    />

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