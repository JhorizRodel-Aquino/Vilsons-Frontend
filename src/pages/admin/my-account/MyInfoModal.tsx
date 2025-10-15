import { useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../../utils/validateAndSanitize";
import ErrorModal from "../../../components/ErrorModal";
import usePostPutData from "../../../hooks/usePostPutData";

export type FormData = {
    name: string,
    email: string
    phone?: number
}

const formSchema: ValidationSchema = {
    name: { required: true, label: "Full Name" },
    email: { required: true },
    phone: { required: true },
};

type MyInfoModalProps = {
    setShowModal: (action: null) => void,
    onSuccess: () => void,
    presetData: FormData;
}

export default function MyInfoModal({ setShowModal, onSuccess, presetData }: MyInfoModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, putData } = usePostPutData('/api/me')

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        if (!isValid) return;

        const success = await putData("", validatedData);
        if (success) {
            onSuccess();
            setFormData({ name: "", email: "", phone: undefined });
            closeModal();
        }
    };

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">Add Equipment</h2>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <fieldset className="card">
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                <Field.Text
                                    id="name"
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value });
                                    }}
                                />

                                <Field.Email
                                    id="email"
                                    label="Email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                    }}
                                />


                                <Field.Number
                                    id="phone"
                                    label="Phone"
                                    noSpinner={true}
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData({ ...formData, phone: +e.target.value });
                                    }}
                                />
                            </div>
                        </fieldset>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} disabled={loading} />
                            <Button type="submit" variant="primary" label={loading ? "Saving..." : "Save"} disabled={loading} />
                        </div>
                    </form>

                    <div className="backdrop"></div>
                </>
            }
        </>
    )
}