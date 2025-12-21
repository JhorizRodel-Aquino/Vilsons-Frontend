import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import type { SelectionOptions } from "../../components/Selection";
import type { ValidationSchema } from "../../utils/validateAndSanitize";
import usePostPutData from "../../hooks/usePostPutData";
import validateAndSanitize from "../../utils/validateAndSanitize";
import Selection from "../../components/Selection";
import ErrorModal from "../../components/ErrorModal";
import useFieldList from "../../hooks/useFieldList";
import { invalidateCache } from "../../hooks/useGetData";

export type FormData = {
    description: string,
    amount: number | null,
    branchId?: string,
    isMonthly?: boolean,
    automated?: boolean,
    remarks?: string
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
    const isSelectingRef = useRef(false);
    const {
        // selected: selectedDescription,
        // setSelected: setSelectedDescription,
        options: descriptionOptions,
        setOptions: setDescriptionOptions,
        // search: descriptionSearch,
        // setSearch: setDescriptionSearch
    } = useFieldList("overheads", "/api/overheads/monthly", null)

    console.log(formData)

    const closeModal = () => {
        setDescriptionOptions([]);
        setShowModal(null);
    }

    const handleSelectDescription = (description: any) => {
        // setSelectedDescription({
        //     description: description.description,
        //     isMonthly: description.isMonthly,
        // });
        // setDescriptionSearch(description.plate); // show name in input
        setFormData({
            ...formData,
            isMonthly: description.isMonthly,
            automated: description.automated || false
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);

        if (!isValid) return;

        const success = action === 'create' ? await postData(validatedData) : await putData(id, validatedData)
        if (success) {
            onSuccess();
            setFormData({ description: "", amount: null });
            setDescriptionOptions([])
            closeModal();

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

    useEffect(() => {
        if (formData.description === '') {
            setFormData({
                ...formData,
                isMonthly: false,
            });
        }
    }, [formData.description])

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">{action === "create" ? 'Add Overhead' : 'Edit Overhead'}</h2>
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
                            <fieldset className="card">
                                <div className="grid gap-x-10 gap-y-[20px]">
                                    {/* <Field.Text
                                    id="description"
                                    label="Description"
                                    placeholder="Electric Bill"
                                    value={formData.description}
                                    onChange={(e) => {
                                        setFormData({ ...formData, description: e.target.value });
                                    }}
                                /> */}

                                    <Field.List
                                        id="description"
                                        placeholder="Enter Description"
                                        value={formData.description}
                                        noValidation={true}
                                        onChange={(e) => {
                                            // setDescriptionSearch(e.target.value); 
                                            setFormData({ ...formData, description: e.target.value });
                                        }}
                                        onBlur={() => {
                                            if (isSelectingRef.current) return;
                                            // if (!selectedDescription || descriptionSearch !== selectedDescription.name) setSelectedDescription(null);
                                        }}
                                    >
                                        {descriptionOptions.map((description, i) => (
                                            <div
                                                key={i}
                                                onMouseDown={() => {
                                                    isSelectingRef.current = true;
                                                }}
                                                onMouseUp={() => {
                                                    handleSelectDescription(description);
                                                    setTimeout(() => {
                                                        isSelectingRef.current = false;
                                                    }, 0);
                                                }}
                                                onMouseLeave={() => {
                                                    if (isSelectingRef.current) {
                                                        setTimeout(() => {
                                                            isSelectingRef.current = false;
                                                        }, 0);
                                                    }
                                                }}
                                            >
                                                <span>{description.description}</span>
                                            </div>
                                        ))}
                                    </Field.List>

                                    <div className="flex gap-2 -mt-2 items-center text-dark">
                                        <input
                                            id="isMonthly"
                                            type="checkbox"
                                            checked={!!formData.isMonthly}
                                            onChange={(e) => setFormData({ ...formData, isMonthly: e.target.checked })}
                                        />
                                        <label htmlFor="isMonthly">
                                            Display as option next time
                                        </label>
                                    </div>

                                    <div className="flex gap-2 -mt-2 items-center text-dark">
                                        <input
                                            id="automated"
                                            type="checkbox"
                                            checked={!!formData.automated}
                                            onChange={(e) => setFormData({ ...formData, automated: e.target.checked })}
                                        />
                                        <label htmlFor="automated">
                                           Auto-record as monthly overhead
                                        </label>
                                    </div>

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