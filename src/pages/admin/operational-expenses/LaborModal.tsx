import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import Tabs from "../../../components/Tabs";
import Detail from "../../../components/Detail"
import formatPesoFromCents from "../../../utils/formatPesoFromCents";
import usePostPutData from "../../../hooks/usePostPutData";
import type { SelectionOptions } from "../../../components/Selection";
import type { ValidationSchema } from "../../../utils/validateAndSanitize";
import validateAndSanitize from "../../../utils/validateAndSanitize";
import ErrorModal from "../../../components/ErrorModal";
import Selection from "../../../components/Selection";
import { get } from "../../../services/apiService";
import type { SelectedContractor, SelectedEmployee } from "./LaborExpensesSection";

// export type FormData = {
//     name: string;
//     branchId?: string;
//     amount: number | null;
// }

// const formSchema: ValidationSchema = {
//     name: { required: true },
//     branchId: { required: true },
//     amount: { required: true, type: "money" },
// };


export type FormDataContractor = {
    userId: string;
    amount: number | null;
    type?: string;
    branchId?: string;
}

export type FormDataEmployee = {
    userId: string;
    payComponents: PayComponents[];
    branchId?: string;
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
};


type LaborModalProps = {
    branchOptions?: SelectionOptions[];
    setShowModal: (action: 'create' | 'edit' | null) => void,
    onSuccess: () => void,
    action: 'create' | 'edit',
    presetDataContractor: FormDataContractor;
    presetDataEmployee: FormDataEmployee;
    id?: string;
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
    selectedContractor: SelectedContractor
    setSelectedContractor: (selected: SelectedContractor) => void;
    selectedEmployee: SelectedEmployee
    setSelectedEmployee: (selected: SelectedEmployee) => void;
}


export default function LaborModal({ branchOptions, setShowModal, onSuccess, action, presetDataContractor, presetDataEmployee, id, tabs, activeTab, setActiveTab, selectedContractor, setSelectedContractor, selectedEmployee, setSelectedEmployee }: LaborModalProps) {
    const typeOptions: SelectionOptions[] = [{ value: "regular", label: "regular" }, { value: "advance", label: "advance" }]

    const [contractorOptions, setContractorOptions] = useState<Record<string, any>[]>([]);
    const [contractorSearch, setContractorSearch] = useState('')
    const [employeeOptions, setEmployeeOptions] = useState<Record<string, any>[]>([]);
    const [employeeSearch, setEmployeeSearch] = useState('')
    const isSelectingRef = useRef(false);

    const [newComponents, setNewComponents] = useState<PayComponents[]>([])

    const [formDataContractor, setFormDataContractor] = useState<FormDataContractor>(presetDataContractor)
    const [formDataEmployee, setFormDataEmployee] = useState<FormDataEmployee>(presetDataEmployee)
    const { loading, error, closeError, postData, putData } = usePostPutData('/api')

    const addComponent = () => {
        setNewComponents([...newComponents, { componentId: `new-component-${newComponents.length + 1}`, componentName: `New Component ${newComponents.length + 1}`, amount: 0 }])
    }


    useEffect(() => {
        const populateUserOptions = async () => {
            if (activeTab === "contractor") {
                const contractorsList = (await get({ route: `/api/contractors?search=${contractorSearch}` })).data.contractors
                setContractorOptions(contractorsList)
            } else {
                const employeesList = (await get({ route: `/api/employees?search=${employeeSearch}` })).data.employees
                setEmployeeOptions(employeesList)
            }

        }
        populateUserOptions()
    }, [activeTab, contractorSearch, employeeSearch])

    useEffect(() => {
        // console.log(selectedContractor)
        // console.log(formDataContractor)
        setFormDataContractor({ ...formDataContractor, userId: selectedContractor.id })
    }, [selectedContractor])

    useEffect(() => {
        console.log("selected", selectedEmployee)
        // console.log(formDataEmployee)
        console.log("forms", formDataEmployee)

        setFormDataEmployee({ ...formDataEmployee, userId: selectedEmployee.id, payComponents: selectedEmployee.payComponents })
    }, [selectedEmployee])


    useEffect(() => {
        // console.log(newComponents)
        setFormDataEmployee({ ...formDataEmployee, payComponents: [...formDataEmployee.payComponents, ...newComponents] })
    }, [newComponents])



    const closeModal = () => {
        setShowModal(null)
        setContractorOptions([])
        setEmployeeOptions([])
        setSelectedContractor({ name: '', username: '', id: '', balance: 0 })
        setSelectedEmployee({ name: '', username: '', id: '', payComponents: [] })
        setFormDataContractor({ userId: '', amount: null, branchId: branchOptions && branchOptions[0].value })
        setFormDataEmployee({ userId: '', branchId: branchOptions && branchOptions[0].value, payComponents: [] })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const laborType = activeTab;
        let success: any;

        if (laborType === "contractor") {
            const { validatedData, isValid } = validateAndSanitize(formDataContractor, formSchemaContractor);

            if (!isValid) return;

            success = action === 'create' ? await postData(validatedData, 'contractor-pays') : await putData(`contractor-pays/${id}`, validatedData)
        } else {
            const { validatedData, isValid } = validateAndSanitize(formDataEmployee, formSchemaEmployee);
            console.log(validatedData)
            console.log(isValid)
            if (!isValid) return;

            success = action === 'create' ? await postData(validatedData, 'employee-pays') : await putData(`employee-pays/${id}`, validatedData)
        }

        if (success) {
            onSuccess();
            laborType === "contractor" ? setFormDataContractor({ userId: '', amount: null, type: "regular" }) : {};
            closeModal();
        }
    };

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px]">
                        <div className="text-xl flex justify-between items-center">
                            <h3 className="font-bold">Pay Laborer</h3>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <fieldset>
                            Branch
                            <Selection
                                options={branchOptions}
                                value={formDataContractor.branchId}
                                onChange={(e) => setFormDataContractor({ ...formDataContractor, branchId: e.target.value })}
                            />
                        </fieldset>

                        <div className="fields">
                            {action !== "edit" && <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />}

                            {activeTab === tabs[0] &&
                                <div className="grid gap-[20px]">
                                    <fieldset className="card grid gap-[20px]">
                                        {action !== "edit" &&
                                            <Field.List
                                                id="contractorSelection"
                                                placeholder="Select Contractor"
                                                value={contractorSearch}
                                                onChange={(e) => {
                                                    setContractorSearch(e.target.value);
                                                }}
                                            >
                                                {contractorOptions.map((contractor, i) => (
                                                    <div key={i}
                                                        onMouseDown={() => {
                                                            isSelectingRef.current = true;
                                                        }}
                                                        onClick={() => {
                                                            if (isSelectingRef.current) {
                                                                setSelectedContractor({
                                                                    name: contractor.user.fullName,
                                                                    username: contractor.user.username,
                                                                    id: contractor.user.userId,
                                                                    balance: contractor.jobOrderSummary.totalBalance,
                                                                });
                                                                isSelectingRef.current = false;
                                                            }
                                                        }}
                                                    >
                                                        <span>{contractor.user.fullName}</span>
                                                    </div>
                                                ))}
                                            </Field.List>
                                        }

                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                            <Field.Text
                                                id="contractorName"
                                                label="Contractor Name"
                                                value={selectedContractor.name}
                                                readonly={true}
                                            />

                                            <Field.Text
                                                id="username"
                                                label="Username"
                                                value={selectedContractor.username}
                                                readonly={true}
                                            />
                                        </div>
                                    </fieldset>

                                    <fieldset className="card grid gap-[20px]">
                                        <h4 className="text-lg font-bold">Pay</h4>

                                        <Detail
                                            className="font-medium"
                                            label="Contractor Balance"
                                            value={formatPesoFromCents(selectedContractor.balance)}
                                            variant="adjacent" align="between" />

                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                            <div>
                                                Salary Type
                                                <Selection
                                                    options={typeOptions}
                                                    value={formDataContractor.type}
                                                    onChange={(e) => setFormDataContractor({ ...formDataContractor, type: e.target.value })}
                                                />
                                            </div>

                                            <Field.Money
                                                id="amount"
                                                label="Amount"
                                                value={formDataContractor.amount}
                                                onChange={(values) => {
                                                    setFormDataContractor({ ...formDataContractor, amount: values.floatValue ?? null });
                                                }}
                                            />
                                        </div>

                                        <div className="card">
                                            <h4 className="text-lg font-bold mb-3">Summary</h4>
                                            <div className="grid gap-1">
                                                <Detail
                                                    className="font-medium"
                                                    label={formDataContractor.type === "regular" ? "Regular Pay" : "Advance Pay"}
                                                    value={formatPesoFromCents(formDataContractor.amount ? formDataContractor.amount * 100 : 0)}
                                                    variant="adjacent" align="between" />
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            }

                            {activeTab === tabs[1] &&
                                <div className="grid gap-[20px]">
                                    <fieldset className="card grid gap-[20px]">
                                        {action !== "edit" &&
                                            <Field.List
                                                id="employeeSelection"
                                                placeholder="Select Employee"
                                                value={employeeSearch}
                                                onChange={(e) => {
                                                    setEmployeeSearch(e.target.value);
                                                }}
                                            >
                                                {employeeOptions.map((employee, i) => (
                                                    <div
                                                        key={i}
                                                        onMouseDown={() => {
                                                            isSelectingRef.current = true;
                                                        }}
                                                        onClick={() => {
                                                            if (isSelectingRef.current) {
                                                                setSelectedEmployee({ name: employee.user.fullName, username: employee.user.username, id: employee.user.userId, payComponents: employee.payComponents.map((comp: PayComponents) => ({ ...comp, amount: comp.amount / 100 })) })
                                                            }
                                                            isSelectingRef.current = false;
                                                        }
                                                        }
                                                    >
                                                        <span>{employee.user.fullName}</span>
                                                    </div>
                                                ))}
                                            </Field.List>
                                        }

                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                            <Field.Text
                                                id="employeeName"
                                                label="Employee Name"
                                                value={selectedEmployee.name}
                                                readonly={true}
                                            />

                                            <Field.Text
                                                id="username"
                                                label="Username"
                                                value={selectedEmployee.username}
                                                readonly={true}
                                            />
                                        </div>
                                    </fieldset>

                                    <fieldset className="card grid gap-[20px]">
                                        <div className="flex justify-between">
                                            <h4 className="text-lg font-bold">Salary Components</h4>
                                            {selectedEmployee.id && (
                                                <Button
                                                    label="Add Component"
                                                    variant="outline"
                                                    size="mini"
                                                    onClick={addComponent}
                                                />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                            {
                                                <>
                                                    {formDataEmployee?.payComponents?.map((component, i) => (
                                                        <Field.Money
                                                            key={i}
                                                            id={component.componentName}
                                                            label={component.componentName}
                                                            value={component.amount}
                                                            onChange={(values) => {
                                                                const updatedPayComponents = formDataEmployee?.payComponents?.map((comp) =>
                                                                    comp.componentName === component.componentName
                                                                        ? { ...comp, amount: values.floatValue ?? 0 }
                                                                        : comp
                                                                );

                                                                setFormDataEmployee({
                                                                    ...formDataEmployee,
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

                                        <div className="card">
                                            <h4 className="text-lg font-bold mb-3">Summary</h4>
                                            <Detail className="font-medium" label='Total Salary' value={formatPesoFromCents(formDataEmployee.payComponents
                                                ?.reduce((sum, comp) => sum + (Number(comp.amount * 100) || 0), 0))} variant="adjacent" align="between" />
                                        </div>
                                    </fieldset>


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