import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import usePostPutData from "../../hooks/usePostPutData";
import ErrorModal from "../../components/ErrorModal";
import validateAndSanitize, { type ValidationSchema } from "../../utils/validateAndSanitize";
import useFieldList from "../../hooks/useFieldList";
import formatPesoFromCents from "../../utils/formatPesoFromCents";
import { invalidateCache } from "../../hooks/useGetData";
import Selection, { type SelectionOptions } from "../../components/Selection";

export type FormData = {
    branchId?: string,
    referenceNumber: string,
    jobOrderCode: string,
    senderName: string
    amount: number | null,
    mop: string,
    plateNumber?: string,
    truckId?: string,
    customerId?: string,
    contractorId?: string,
    jobOrderId?: string,
    remarks?: string
}

const formSchema: ValidationSchema = {
    referenceNumber: {},
    jobOrderCode: { required: true, label: "Job Number" },
    senderName: { required: true },
    amount: { required: true, type: "money" },
    mop: { required: true, label: "Mode of Payment" },
    remarks: { required: true }
};

type TransactionsModalProps = {
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetData: FormData;
    id?: string;
    branchOptions?: SelectionOptions[];
}

export default function TransactionModal({ setShowModal, onSuccess, action, presetData, id, branchOptions }: TransactionsModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api/transactions')
    const isSelectingRef = useRef(false);
    const {
        selected: selectedJobCode,
        setSelected: setSelectedJobCode,
        options: jobCodeOptions,
        setOptions: setJobCodeOptions,
        search: jobCodeSearch,
        setSearch: setJobCodeSearch
    } = useFieldList("jobOrders", "/api/job-orders/unpaid?search=", null)

    console.log(formData)

    const closeModal = () => {
        setShowModal(null)
        setJobCodeOptions([])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);

        if (!isValid) return;

        const formattedData = { ...validatedData, status: 'successful' }
        const success = action === 'create' ? await postData(formattedData) : await putData(id, formattedData)
        if (success) {
            onSuccess();
            setFormData({ referenceNumber: '', jobOrderCode: '', senderName: '', amount: null, mop: '', plateNumber: '', branchId: '' }); // reset form
            closeModal();
            setJobCodeOptions([])

            invalidateCache(`/api/job-orders/${selectedJobCode?.jobOrderId}`);
            invalidateCache(`/api/contractors/${selectedJobCode?.contractorId}`);
            invalidateCache(`/api/customers/${selectedJobCode?.customerId}`);
            invalidateCache(`/api/trucks/${selectedJobCode?.truckId}`);
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

    const handleSelectJobCode = (jobCode: any) => {
        setSelectedJobCode({
            name: jobCode.jobOrderCode,
            status: jobCode.status,
            plateNumber: jobCode.plateNumber,
            balance: jobCode.balance,
            truckId: jobCode.truckId,
            customerId: jobCode.customerId,
            contractorId: jobCode.contractorId,
            jobOrderId: jobCode.id,
        });
        setJobCodeSearch(jobCode.jobOrderCode); // show name in input
    };

    // new helper: set amount to job balance (assumes balance is cents; divide by 100)
    const applyMaxAmount = () => {
        if (!selectedJobCode || selectedJobCode.balance == null) return;
        const rawBalance = selectedJobCode.balance;
        const amountValue = typeof rawBalance === 'number' ? rawBalance / 100 : parseFloat(String(rawBalance));
        setFormData({ ...formData, amount: isNaN(amountValue) ? null : amountValue });
    };

    useEffect(() => {
        setFormData({ ...formData, jobOrderCode: selectedJobCode?.name })
    }, [selectedJobCode])

    useEffect(() => {
        if (action === "edit") {
            setSelectedJobCode({
                name: formData.jobOrderCode,
                plateNumber: formData.plateNumber,
                truckId: formData.truckId,
                customerId: formData.customerId,
                contractorId: formData.contractorId,
                jobOrderId: formData.jobOrderId,

            });
        }
        setJobCodeSearch(formData.jobOrderCode || "");
    }, [])

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">{action === "create" ? 'Add Transaction' : 'Edit Transaction'}</h2>
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
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">

                                    <div>
                                        Job Number
                                        <Field.List
                                            id="jobCodeSelection"
                                            placeholder="Select Job Number"
                                            validated={!!selectedJobCode}
                                            readOnly={action === "edit"}
                                            value={jobCodeSearch}
                                            supportingInfo={selectedJobCode &&
                                                <>
                                                    plate: {selectedJobCode.plateNumber} {<br />}
                                                    {action === 'create' && (<>balance: {formatPesoFromCents(selectedJobCode.balance)}</>)}
                                                </>
                                            }
                                            onChange={(e) => setJobCodeSearch(e.target.value)}
                                            onBlur={() => {
                                                if (isSelectingRef.current) return;
                                                if (!selectedJobCode || jobCodeSearch !== selectedJobCode.name) setSelectedJobCode(null);
                                            }}
                                        >
                                            {jobCodeOptions.map((jobCode, i) => (
                                                <div
                                                    key={i}
                                                    onMouseDown={() => {
                                                        isSelectingRef.current = true;
                                                    }}
                                                    onMouseUp={() => {
                                                        handleSelectJobCode(jobCode);
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
                                                    <span>{jobCode.jobOrderCode}</span>
                                                    <p className="text-sm text-darker">
                                                        plate: {jobCode.plateNumber}
                                                    </p>
                                                </div>
                                            ))}
                                        </Field.List>
                                    </div>

                                    <Field.Text
                                        id="referenceNumber"
                                        label="Reference Number"
                                        value={formData.referenceNumber}
                                        onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}

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
                                    />                                  <div className="flex justify-between items-end gap-2">
                                        <Field.Money
                                            id="amount"
                                            label="Amount"
                                            value={formData.amount}
                                            onChange={(values) => {
                                                setFormData({ ...formData, amount: values.floatValue ?? null });
                                            }}
                                            width="full"
                                        />
                                        <Button label="Max" variant="outline" size="mini" onClick={applyMaxAmount} />
                                    </div>

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