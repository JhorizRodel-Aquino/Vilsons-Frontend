import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../../utils/validateAndSanitize";
import ErrorModal from "../../../components/ErrorModal";
import usePostPutData from "../../../hooks/usePostPutData";
import { get } from "../../../services/apiService";
// import type { SelectedCustomer } from "./TrucksSection";

export type FormData = {
    truckId: string,
    customerId: string,
}

const formSchema: ValidationSchema = {
    plate: { required: true },
    make: { required: true },
    model: { required: true },
};

type ChangeOwnerModalProps = {
    setShowModal: (action: null) => void,
    onSuccess: () => void,
    // presetData: FormData;
    truckId: string;
    // selectedCustomer: SelectedCustomer
    // setSelectedCustomer: (selected: SelectedCustomer) => void;
}

export default function ChangeOwnerModal({ setShowModal, onSuccess, truckId }: ChangeOwnerModalProps) {
    const [selectedCustomer, setSelectedCustomer] = useState({ name: "", username: "", id: "" });
    const [customerOptions, setCustomerOptions] = useState<Record<string, any>[]>([]);
    const [customerSearch, setCustomerSearch] = useState('')
    const isSelectingRef = useRef(false);

    const [formData, setFormData] = useState<FormData>({ truckId: truckId, customerId: "" })
    const { loading, error, closeError, putData } = usePostPutData('/api/trucks/ownership')

    useEffect(() => {
        const populateUserOptions = async () => {
            const customersList = (await get({ route: `/api/customers?search=${customerSearch}` })).data.customers
            setCustomerOptions(customersList)
        }

        populateUserOptions()
    }, [customerSearch])

    useEffect(() => {
        console.log("selected", selectedCustomer)
        console.log("forms", formData)

        setFormData({ ...formData, customerId: selectedCustomer.id })
    }, [selectedCustomer])

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        if (!isValid) return;

        const success = await putData("", validatedData)
        if (success) {
            onSuccess();
            setFormData({ truckId: "", customerId: "" });
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

                        <fieldset className="card grid gap-[20px]">
                            <Field.List
                                id="customerSelection"
                                placeholder="Select Customer"
                                value={customerSearch}
                                onChange={(e) => {
                                    setCustomerSearch(e.target.value);
                                }}
                            >
                                {customerOptions.map((customer, i) => (
                                    <div
                                        key={i}
                                        onMouseDown={() => {
                                            isSelectingRef.current = true;
                                        }}
                                        onClick={() => {
                                            if (isSelectingRef.current) {
                                                setSelectedCustomer({ name: customer.user.fullName, username: customer.user.username, id: customer.user.userId })
                                            }
                                            isSelectingRef.current = false;
                                        }
                                        }
                                    >
                                        <span>{customer.user.fullName}</span>
                                    </div>
                                ))}
                            </Field.List>

                            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                <Field.Text
                                    id="contractorName"
                                    label="Contractor Name"
                                    value={selectedCustomer.name}
                                    readonly={true}
                                />

                                <Field.Text
                                    id="username"
                                    label="Username"
                                    value={selectedCustomer.username}
                                    readonly={true}
                                />
                            </div>
                        </fieldset>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} disabled={loading} />
                            <Button type="submit" variant="primary" label={loading ? "Changing..." : "Change Owner"} disabled={loading} />
                        </div>
                    </form>

                    <div className="backdrop"></div>
                </>
            }
        </>
    )
}