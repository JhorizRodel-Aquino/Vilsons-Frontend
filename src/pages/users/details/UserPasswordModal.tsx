import { useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../../utils/validateAndSanitize";
import ErrorModal from "../../../components/ErrorModal";
import usePostPutData from "../../../hooks/usePostPutData";
import { toastWarning } from "../../../utils/toastWarning";

export type FormData = {
    newPassword: string,
    confirmPassword: string
}

const formSchema: ValidationSchema = {
    newPassword: { required: true, label: "New Password" },
    confirmPassword: { required: true, label: "Confirm Password" },
};

type UserPasswordModalProps = {
    userId: string
    setShowModal: (action: null) => void,
}

export default function UserPasswordModal({ userId, setShowModal }: UserPasswordModalProps) {
    const [formData, setFormData] = useState<FormData>({ newPassword: "", confirmPassword: "" })
    const { loading, error, closeError, putData } = usePostPutData(`/api/users/${userId}/password`)

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        if (!isValid) return;

        const {newPassword, confirmPassword} = validatedData
        const isNewAndConfirmMatch = newPassword === confirmPassword;
        if (!isNewAndConfirmMatch) {
            toastWarning("New Password and Confirm Password do not matched.")
            return
        }

        const formattedData = {newPassword}
        const success = await putData("", formattedData);
        if (success) {
            setFormData({ newPassword: "", confirmPassword: "" });
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
                                <Field.Password
                                    id="newPassword"
                                    label="New Password"
                                    value={formData.newPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, newPassword: e.target.value });
                                    }}
                                />

                                <Field.Password
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, confirmPassword: e.target.value });
                                    }}
                                />

                            </div>
                        </fieldset>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} disabled={loading} />
                            <Button type="submit" variant="primary" label={loading ? "Changing..." : "Change Password"} disabled={loading} />
                        </div>
                    </form>

                    <div className="backdrop"></div>
                </>
            }
        </>
    )
}