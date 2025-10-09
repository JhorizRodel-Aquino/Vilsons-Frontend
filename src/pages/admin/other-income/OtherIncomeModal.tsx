import { useState } from "react";
import Button from "../../../components/Button";
import Selection from "../../../components/Selection";
import Field from "../../../components/Field";
import decodeToken from "../../../utils/decodeToken";
import usePostData from "../../../hooks/usePostData";
import ErrorModal from "../../../components/ErrorModal";
import validateAndSanitize, { type ValidationSchema } from "../../../utils/validateAndSanitize";

type FormData = {
    description: string,
    amount: number,
    branchId: string
}

const formSchema: ValidationSchema = {
    description: { required: true, minLength: 3 },
    amount: { required: true, type: "money" },
    branchId: { required: true }
};

export default function OtherIncomeModal({ setShowModal, onSuccess }: { setShowModal: (show: boolean) => void, onSuccess: () => void }) {
    const decoded = decodeToken()
    const branches = decoded!.UserInfo!.branches;
    const branchOptions = branches.map(branchItem => ({ value: branchItem.branchId, label: branchItem.branchName }));
    const [formData, setFormData] = useState<FormData>({ description: '', amount: 0, branchId: branchOptions[0].value })
    const { loading, error, closeError, postData } = usePostData('/api/other-incomes')

    console.log(formData)

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { sanitizedData, isValid } = validateAndSanitize(formData, formSchema);

        if (!isValid) return;

        const success = await postData(sanitizedData);
        if (success) {
            onSuccess(); // trigger reload in parent
            setFormData({ ...formData, description: "", amount: 0 }); // reset form
            closeModal()
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                <div className="text-xl flex justify-between items-center">
                    <h2 className="font-bold">Add  Income</h2>
                    <button className="cursor-pointer" onClick={closeModal}>✕</button>
                </div>

                <fieldset className="card">
                    <div className="grid gap-x-10 gap-y-[20px]">
                        <Field.Text
                            id="description"
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                            <Field.Money
                                id="amount"
                                label="Amount"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: +e.target.value })}
                            />
                            <div>
                                Branch
                                <Selection
                                    options={branchOptions}
                                    value={formData.branchId}
                                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                                />
                            </div>
                        </div>

                    </div>
                </fieldset>

                <div className="flex justify-end items-center gap-[20px]">
                    <Button variant="gray" label="Cancel" onClick={closeModal} />
                    <Button type="submit" variant="primary" label={loading ? "Adding..." : "Add Income"} disabled={loading} />
                </div>
            </form>

            <div className="backdrop"></div>

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}