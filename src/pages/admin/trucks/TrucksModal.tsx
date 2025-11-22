import { useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../../utils/validateAndSanitize";
import ErrorModal from "../../../components/ErrorModal";
import usePostPutData from "../../../hooks/usePostPutData";

export type FormData = {
    plate: string,
    make: string,
    model: string,
    engine?: string,
}

const formSchema: ValidationSchema = {
    plate: { required: true },
    make: { required: true },
    model: { required: true },
    engine: { },
};

type TrucksModalProps = {
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit' | null,
    presetData: FormData;
    id?: string;
}

export default function TrucksModal({ setShowModal, onSuccess, action, presetData, id }: TrucksModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api/trucks')

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
            setFormData({ plate: "", make: "", model: "", engine: ""});
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
                                    id="plate"
                                    label="Plate"
                                    value={formData.plate}
                                    onChange={(e) => {
                                        setFormData({ ...formData, plate: e.target.value });
                                    }}
                                />

                                <Field.Text
                                    id="make"
                                    label="Make"
                                    value={formData.make}
                                    onChange={(e) => {
                                        setFormData({ ...formData, make: e.target.value });
                                    }}
                                />

                                <Field.Text
                                    id="model"
                                    label="Model"
                                    value={formData.model}
                                    onChange={(e) => {
                                        setFormData({ ...formData, model: e.target.value });
                                    }}
                                />

                                <Field.Text
                                    id="engine"
                                    label="Engine"
                                    value={formData.engine}
                                    onChange={(e) => {
                                        setFormData({ ...formData, engine: e.target.value });
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