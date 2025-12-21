import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import Tabs from "../../components/Tabs";
import Detail from "../../components/Detail"
import formatPesoFromCents from "../../utils/formatPesoFromCents";
import usePostPutData from "../../hooks/usePostPutData";
import type { SelectionOptions } from "../../components/Selection";
import type { ValidationSchema } from "../../utils/validateAndSanitize";
import validateAndSanitize from "../../utils/validateAndSanitize";
import ErrorModal from "../../components/ErrorModal";
import Selection from "../../components/Selection";
import useFieldList from "../../hooks/useFieldList";
import { invalidateCache } from "../../hooks/useGetData";

export type FormData = {
    userId?: string;
    amount?: number | null;
    type?: string;
    payComponents?: PayComponents[];
    branchId?: string;
    remarks?: string;
    userConnectingRoleIds?: { role: string; id: string }[];
}

export type PayComponents = {
    amount: number;
    componentId?: string;
    componentName: string;
}

const formSchemaContractor: ValidationSchema = {
    userId: { required: true, label: "User" },
    amount: { required: true, type: "money", label: "Amount" },
    type: { required: true, label: "Salary Type" },
    branchId: { required: true, label: "Branch" },
    remarks: { required: true },
};

const formSchemaEmployee: ValidationSchema = {
    userId: { required: true, label: "User" },
    payComponents: {
        label: "Pay Component",
        children: {
            componentName: { required: true, label: "Component Name" },
            amount: { required: true, type: "money", label: "Amount", min: -1 },
        },
    },
    branchId: { required: true, label: "Branch" },
    remarks: { required: true },
};


type LaborModalProps = {
    branchOptions?: SelectionOptions[];
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetData: FormData;
    id?: string;
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    preSelectedContractor: Record<string, any> | null;
    preSelectedEmployee: Record<string, any> | null;
}


export default function LaborModal({ branchOptions, setShowModal, onSuccess, action, presetData, id, tabs, activeTab, setActiveTab, preSelectedContractor, preSelectedEmployee }: LaborModalProps) {
    const typeOptions: SelectionOptions[] = [{ value: "regular", label: "regular" }, { value: "advance", label: "advance" }]
    const isSelectingRef = useRef(false);

    const [newComponents, setNewComponents] = useState<PayComponents[]>([])

    const [formData, setFormData] = useState<FormData>(presetData)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api')
    const [componentsOptions, setComponentsOptions] = useState<SelectionOptions[]>([])

    const {
        selected: selectedContractor,
        setSelected: setSelectedContractor,
        options: contractorOptions,
        setOptions: setContractorOptions,
        search: contractorSearch,
        setSearch: setContractorSearch
    } = useFieldList("contractors", "/api/contractors?search=", null)

    const {
        selected: selectedEmployee,
        setSelected: setSelectedEmployee,
        options: employeeOptions,
        setOptions: setEmployeeOptions,
        search: employeeSearch,
        setSearch: setEmployeeSearch
    } = useFieldList("employees", "/api/employees?search=", null)

    useEffect(() => {
        if (action === "edit") {
            setSelectedContractor(preSelectedContractor);
            setContractorSearch(preSelectedContractor?.name);

            setSelectedEmployee(preSelectedEmployee);
            setEmployeeSearch(preSelectedEmployee?.name);
        }
    }, [preSelectedContractor, preSelectedEmployee])

    useEffect(() => {
        setFormData({ ...formData, userId: selectedContractor?.id })
    }, [selectedContractor])

    useEffect(() => {
        const nonEmptyComponents = selectedEmployee?.payComponents?.filter((comp: PayComponents) => comp.amount > 0) || [];
        const emptyComponents = selectedEmployee?.payComponents?.filter((comp: PayComponents) => comp.amount <= 0) || [];
        setComponentsOptions([
            ...emptyComponents.map((comp: PayComponents) => ({
                value: comp.componentId,
                label: comp.componentName
            })),
            { value: '', label: '+ New Component' }
        ]);
        setFormData({ ...formData, userId: selectedEmployee?.id, payComponents: nonEmptyComponents })
    }, [selectedEmployee])


    const addComponent = () => {
        setNewComponents([...newComponents, { componentId: `new-component-${newComponents.length + 1}`, componentName: `New Component ${newComponents.length + 1}`, amount: 0 }])
    }

    const closeModal = () => {
        setShowModal(null)
        setContractorOptions([])
        setEmployeeOptions([])
        setSelectedContractor({ name: '', username: '', id: '', balance: 0 })
        setSelectedEmployee({ name: '', username: '', id: '', payComponents: [] })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const laborType = activeTab;
        let success: any;

        if (laborType === "contractor") {
            const { validatedData, isValid } = validateAndSanitize(formData, formSchemaContractor);

            if (!isValid) return;

            success = action === 'create' ? await postData(validatedData, 'contractor-pays') : await putData(`contractor-pays/${id}`, validatedData)
        } else {
            const { validatedData, isValid } = validateAndSanitize({ ...formData, payComponents: [...(formData.payComponents ? formData.payComponents : []), ...newComponents] }, formSchemaEmployee);
            console.log(validatedData)
            console.log(isValid)
            if (!isValid) return;

            success = action === 'create' ? await postData(validatedData, 'employee-pays') : await putData(`employee-pays/${id}`, validatedData)
        }

        if (success) {
            onSuccess();
            setFormData({ userId: '', branchId: branchOptions && branchOptions[0].value, payComponents: [] })
            closeModal();

            formData.userConnectingRoleIds?.forEach((roleRecord) => {
                invalidateCache(`/api/${roleRecord.role}s/${roleRecord.id}`);
            });
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

    const handleSelectContractor = (contractor: any) => {
        setSelectedContractor({
            name: contractor.user.fullName,
            username: contractor.user.username,
            id: contractor.user.userId,
            balance: contractor.jobOrderSummary.totalBalance,
        });
        setContractorSearch(contractor.user.fullName); // show name in input
    };

    const handleSelectEmployee = (employee: any) => {
        setSelectedEmployee({
            name: employee.user.fullName,
            username: employee.user.username,
            id: employee.user.userId, payComponents:
                employee.payComponents.map((comp: PayComponents) => ({ ...comp, amount: comp.amount / 100 }))
        })
        setEmployeeSearch(employee.user.fullName); // show name in input
    };

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h3 className="font-bold">{action === "create" ? 'Pay Laborer' : 'Edit Labor Pay'}</h3>
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

                        <div className="fields">
                            {action !== "edit" && <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />}

                            {activeTab === tabs[0] &&
                                <div className="grid gap-[20px]">
                                    <fieldset className="card grid gap-[20px]">
                                        <h4 className="text-lg font-bold">Contractor</h4>
                                        <Field.List
                                            id="contractorSelection"
                                            placeholder="Select Contractor"
                                            validated={!!selectedContractor}
                                            value={contractorSearch}
                                            readOnly={action === "edit"}
                                            supportingInfo={selectedContractor ? `@${selectedContractor.username}` : ""}
                                            onChange={(e) => setContractorSearch(e.target.value)}
                                            onBlur={() => {
                                                if (isSelectingRef.current) return;
                                                if (!selectedContractor || contractorSearch !== selectedContractor.name) setSelectedContractor(null);
                                            }}
                                        >
                                            {contractorOptions.map((contractor, i) => (
                                                <div
                                                    key={i}
                                                    onMouseDown={() => {
                                                        isSelectingRef.current = true;
                                                    }}
                                                    onMouseUp={() => {
                                                        handleSelectContractor(contractor);
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
                                                    <span>{contractor.user.fullName}</span>
                                                    <p className="text-sm text-darker">@{contractor.user.username}</p>
                                                </div>
                                            ))}
                                        </Field.List>
                                    </fieldset>

                                    <fieldset className="card grid gap-[20px]">
                                        <h4 className="text-lg font-bold">Pay</h4>

                                        <Detail
                                            className="font-medium"
                                            label="Contractor Balance"
                                            value={formatPesoFromCents(selectedContractor?.balance)}
                                            variant="adjacent" align="between" />

                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                            <div>
                                                Salary Type
                                                <Selection
                                                    options={typeOptions}
                                                    value={formData?.type}
                                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                />
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

                                    <fieldset className="card">
                                        <h4 className="text-lg font-bold mb-3">Summary</h4>
                                        <div className="grid gap-1">
                                            <Detail
                                                className="font-medium"
                                                label={formData.type === "regular" ? "Regular Pay" : "Advance Pay"}
                                                value={formatPesoFromCents(formData.amount ? formData.amount * 100 : 0)}
                                                variant="adjacent" align="between" />
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
                            }

                            {activeTab === tabs[1] &&
                                <div className="grid gap-[20px]">
                                    <fieldset className="card grid gap-[20px]">
                                        <h4 className="text-lg font-bold">Employee</h4>
                                        <Field.List
                                            id="employeeSelection"
                                            placeholder="Select Employee"
                                            validated={!!selectedEmployee}
                                            value={employeeSearch}
                                            readOnly={action === "edit"}
                                            supportingInfo={selectedEmployee ? `@${selectedEmployee.username}` : ""}
                                            onChange={(e) => setEmployeeSearch(e.target.value)}
                                            onBlur={() => {
                                                // if we're in the middle of selecting (mouse down on an option), ignore the blur
                                                if (isSelectingRef.current) return;
                                                if (!selectedEmployee || employeeSearch !== selectedEmployee.name) setSelectedEmployee(null);
                                            }}
                                        >
                                            {employeeOptions.map((employee, i) => (
                                                <div
                                                    key={i}
                                                    // mark that a selection is in progress before blur fires
                                                    onMouseDown={() => {
                                                        isSelectingRef.current = true;
                                                    }}
                                                    // when mouse is released, actually pick the employee and restore the flag
                                                    onMouseUp={() => {
                                                        // call your existing handler (make sure it sets employee search, not contractor search)
                                                        handleSelectEmployee(employee);
                                                        // small delay to make sure onBlur (if it fires) sees the flag; then reset
                                                        // (you can usually just set false here, but timeout ensures DOM event ordering won't race)
                                                        setTimeout(() => {
                                                            isSelectingRef.current = false;
                                                        }, 0);
                                                    }}
                                                    // optional: in case mouse leaves the option before mouseup
                                                    onMouseLeave={() => {
                                                        // if mouse leaves while holding, reset the flag
                                                        if (isSelectingRef.current) {
                                                            setTimeout(() => {
                                                                isSelectingRef.current = false;
                                                            }, 0);
                                                        }
                                                    }}
                                                >
                                                    <span>{employee.user.fullName}</span>
                                                    <p className="text-sm text-darker">@{employee.user.username}</p>
                                                </div>
                                            ))}
                                        </Field.List>
                                    </fieldset>

                                    <fieldset className="card grid gap-[20px]">
                                        <div className="flex justify-between">
                                            <h4 className="text-lg font-bold">Salary Components</h4>
                                            {selectedEmployee?.id && (
                                                // <Button
                                                //     label="Add Component"
                                                //     variant="outline"
                                                //     size="mini"
                                                //     onClick={addComponent}
                                                // />
                                                <Selection
                                                    options={componentsOptions}
                                                    value=""
                                                    placeholder="Add Component"
                                                    onChange={(e) => {
                                                        const selectedValue = e.target.value;
                                                        const selectedComponent = componentsOptions.find(comp => comp.value === selectedValue);

                                                        if (selectedComponent?.label === 'New Component') {
                                                            // Run addComponent function for new component
                                                            addComponent();
                                                        } else {
                                                            // Add existing component to payComponents
                                                            setFormData({
                                                                ...formData,
                                                                payComponents: [
                                                                    ...(formData.payComponents ? formData.payComponents : []),
                                                                    {
                                                                        componentId: selectedValue,
                                                                        componentName: selectedComponent?.label || '',
                                                                        amount: 0
                                                                    }
                                                                ]
                                                            });
                                                        }
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                            {
                                                <>
                                                    {formData?.payComponents?.map((component, i) => (
                                                        <Field.Money
                                                            key={i}
                                                            id={component.componentName}
                                                            label={component.componentName}
                                                            value={component.amount}
                                                            onChange={(values) => {
                                                                const updatedPayComponents = formData?.payComponents?.map((comp) =>
                                                                    comp.componentName === component.componentName
                                                                        ? { ...comp, amount: values.floatValue ?? 0 }
                                                                        : comp
                                                                );

                                                                setFormData({
                                                                    ...formData,
                                                                    payComponents: updatedPayComponents,
                                                                });
                                                            }}
                                                        />
                                                    ))}

                                                    {newComponents.map((component, i) => (
                                                        <div key={i}>
                                                            <input
                                                                className="border-all w-full"
                                                                type="text"
                                                                value={component.componentName}
                                                                onChange={(e) => {
                                                                    const updatedPayComponents = newComponents.map((comp) =>
                                                                        comp.componentId === component.componentId
                                                                            ? { ...comp, componentName: e.target.value }
                                                                            : comp
                                                                    );

                                                                    setNewComponents(updatedPayComponents);
                                                                }}
                                                            />
                                                            <Field.Money
                                                                id={component.componentId}
                                                                value={component.amount}
                                                                onChange={(values) => {
                                                                    const updatedPayComponents = newComponents.map((comp) =>
                                                                        comp.componentId === component.componentId
                                                                            ? { ...comp, amount: values.floatValue ?? 0 }
                                                                            : comp
                                                                    );

                                                                    setNewComponents(updatedPayComponents);
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </>
                                            }
                                        </div>
                                    </fieldset>

                                    <fieldset className="card">
                                        <h4 className="text-lg font-bold mb-3">Summary</h4>
                                        <Detail className="font-medium" label='Total Salary' value={formatPesoFromCents([...(formData.payComponents ? formData.payComponents : []), ...newComponents]
                                            ?.reduce((sum, comp) => sum + (Number(comp.amount * 100) || 0), 0))} variant="adjacent" align="between" />
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
                            }
                        </div>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} disabled={loading} />
                            {action === 'create'
                                ? <Button type="submit" variant="primary" label={loading ? "Paying..." : "Pay Laborer"} disabled={loading} />
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