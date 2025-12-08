import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../utils/validateAndSanitize";
import ErrorModal from "../../components/ErrorModal";
import usePostPutData from "../../hooks/usePostPutData";
import useFieldList from "../../hooks/useFieldList";
import { invalidateCache } from "../../hooks/useGetData";
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
    selectedTruck: { plate: string };
    invalidateData: Record<string, any>;
}

export default function ChangeOwnerModal({ setShowModal, onSuccess, truckId, selectedTruck, invalidateData }: ChangeOwnerModalProps) {
    const isSelectingRef = useRef(false);
    const [formData, setFormData] = useState<FormData>({ truckId: truckId, customerId: "" })
    const { loading, error, closeError, putData } = usePostPutData('/api/trucks/ownership')

    const {
        selected: selectedCustomer,
        setSelected: setSelectedCustomer,
        options: customerOptions,
        setOptions: setCustomerOptions,
        search: customerSearch,
        setSearch: setCustomerSearch
    } = useFieldList("customers", "/api/customers?search=", null)

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
        setCustomerOptions([])
    }

    const handleSelectCustomer = (customer: any) => {
        setSelectedCustomer({
            id: customer.user.customerId,
            name: customer.user.fullName,
            username: customer.user.username,
        });
        setCustomerSearch(customer.user.fullName); // show name in input
    };

    useEffect(() => {
        setFormData({ ...formData, customerId: selectedCustomer?.id })
    }, [selectedCustomer])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        if (!isValid) return;

        const success = await putData("", validatedData)
        if (success) {
            onSuccess();
            setFormData({ truckId: "", customerId: "" });
            closeModal();
            setCustomerOptions([])
   
            invalidateCache(`/api/customers/${invalidateData?.customerId}`);
            invalidateCache(`/api/customers/${selectedCustomer?.id}`);
            invalidateCache(`/api/trucks/${truckId}`);
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
                            <h2 className="font-bold">Change Owner</h2>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <fieldset>
                            <Field.Text
                                id="plate"
                                label="Truck Plate Number"
                                value={selectedTruck.plate}
                                readonly={true}
                            />
                        </fieldset>

                        <fieldset className="card grid gap-[20px]">
                            <h4 className="text-lg font-bold">Transfer To</h4>

                            <Field.List
                                id="customerSelection"
                                placeholder="Select Customer Owner"
                                validated={!!selectedCustomer}
                                value={customerSearch}
                                supportingInfo={`${selectedCustomer ? `@${selectedCustomer?.username}` : ''}`}
                                onBlur={() => {
                                    // if input text doesn't match selected name, clear the selection
                                    if (!selectedCustomer || customerSearch !== selectedCustomer.name) {
                                        setSelectedCustomer(null);
                                    }
                                }}
                                onChange={(e) => setCustomerSearch(e.target.value)}
                            >
                                {customerOptions.map((customer, i) => (
                                    <div
                                        key={i}
                                        onMouseDown={() => {
                                            isSelectingRef.current = true;
                                            handleSelectCustomer(customer)
                                            isSelectingRef.current = false;
                                        }}
                                    >
                                        <span>{customer.user.fullName}</span>
                                        <p className="text-sm text-darker">@{customer.user.username}</p>
                                    </div>
                                ))}
                            </Field.List>

                            {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
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
                            </div> */}
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