import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import usePostPutData from "../../hooks/usePostPutData";
import type { SelectionOptions } from "../../components/Selection";
import type { ValidationSchema } from "../../utils/validateAndSanitize";
import validateAndSanitize from "../../utils/validateAndSanitize";
import Icon from "../../components/Icon";
import Selection from "../../components/Selection";
import { toastWarning } from "../../utils/toastWarning";
import ErrorModal from "../../components/ErrorModal";
import api from "../../utils/axiosInstance";
import { invalidateCache } from "../../hooks/useGetData";

export type FormData = {
    profile?: File | null;
    name?: string;
    username?: string;
    phone?: number;
    email?: string;
    roles: string[];
    branches?: string[];

    commission?: number;
    userConnectingRoleIds?: Record<string, any>[];
};

export type Component = {
    id: number;
    componentName?: string,
    amount?: number | null,
    schedules?: number | null
}


const formSchemaGeneral: ValidationSchema = {
    name: { required: true },
    username: { required: true },
    email: { label: "Email Address" },
    phone: { required: true, label: "Phone Number" },
    roles: { required: true, label: "role", minLength: 1 },
};

const formSchemaAdminEmployee: ValidationSchema = {
    branches: { required: true, label: "branch", minLength: 1 },
};

const formSchemaContractor: ValidationSchema = {
    branches: { required: true, label: "branch", minLength: 1 },
    commission: { required: true, type: "number", min: 0, max: 100 }
};

type UsersModalProps = {
    branchOptions?: SelectionOptions[];
    roleOptions?: (SelectionOptions & { baseRoleName: string })[];
    setShowModal: (action: "create" | "edit" | "password" | null) => void;
    onSuccess: () => void;
    action: "create" | "edit" | "password" | null;
    presetData: FormData;
    id?: string;
};

export default function UsersModal({
    branchOptions = [],
    roleOptions = [],
    setShowModal,
    onSuccess,
    action,
    presetData,
    id,
}: UsersModalProps) {
    const [formData, setFormData] = useState<FormData>(presetData);
    const { error, closeError, loading, postData, putData } = usePostPutData("/api/users");
    console.log(formData)
    const closeModal = () => setShowModal(null);
    const [components, setComponents] = useState<Component[]>([])
    const [componentsOptions, setComponentsOptions] = useState<SelectionOptions[]>([])

    // role add/remove logic
    const addRole = () => {
        const selectedRoles = (formData.roles || [])
            .map((id) => roleOptions.find((r) => r.value === id))
            .filter(Boolean) as { baseRoleName: string }[];

        const hasRestricted = selectedRoles.some((r) =>
            ["_CUSTOMER_", "_CONTRACTOR_"].includes(r.baseRoleName)
        );

        if (hasRestricted) {
            toastWarning(
                "You cannot add another role to a Customer or Contractor."
            );
            return;
        }

        setFormData((prev) => ({
            ...prev,
            roles: [...(prev.roles || []), ""],
        }));
    };

    const updateRole = (index: number, value: string) => {
        const selectedRole = roleOptions.find((r) => r.value === value);

        // Reset commission if selected base role is not contractor
        if (selectedRole && !["_CONTRACTOR_"].includes(selectedRole.baseRoleName)) {
            setFormData({ ...formData, commission: undefined })
        }

        // If user selected a restricted role (customer or contractor)
        if (selectedRole && ["_CUSTOMER_", "_CONTRACTOR_"].includes(selectedRole.baseRoleName)) {
            setFormData((prev) => ({
                ...prev,
                roles: [value], // Replace all with just this one
            }));
            return;
        }

        setFormData((prev) => {
            // Check if current selection already contains restricted roles
            const currentRoles = (prev.roles || [])
                .map((id) => roleOptions.find((r) => r.value === id))
                .filter(Boolean) as { baseRoleName: string }[];

            const hasRestricted = currentRoles.some((r) =>
                ["_CUSTOMER_", "_CONTRACTOR_"].includes(r.baseRoleName)
            );

            // Prevent adding another if a restricted role exists
            if (hasRestricted) {
                toastWarning("Cannot mix Customer or Contractor with other roles.");
                return prev;
            }

            // Otherwise, update normally
            const updated = [...(prev.roles || [])];
            updated[index] = value;
            return { ...prev, roles: updated };
        });
    };

    const removeRole = (index: number) => {
        setFormData((prev) => {
            const updated = [...(prev.roles || [])];
            updated.splice(index, 1);
            return { ...prev, roles: updated, commission: undefined };
        });
    };

    // Determine baseRole group of selected roles
    const selectedRoles = (formData.roles || [])
        .map((id) => roleOptions.find((r) => r.value === id))
        .filter(Boolean);

    const selectedBaseRoles = Array.from(
        new Set(selectedRoles.map((r) => r!.baseRoleName))
    );

    const hasContractorBaseRole = selectedRoles.some(
        (role) => role?.baseRoleName === "_CONTRACTOR_"
    );

    const hasEmployeeBaseRole = selectedRoles.some(
        (role) => role?.baseRoleName === "_EMPLOYEE_"
    );

    const hasAdminEmployeeBaseRole = selectedRoles.some(
        (role) => role?.baseRoleName === "_ADMIN_" || role?.baseRoleName === "_EMPLOYEE_"
    );

    // Prevent mixing incompatible base roles
    const filteredRoleOptions =
        selectedBaseRoles.length === 0
            ? roleOptions
            : roleOptions.filter(
                (r) =>
                    selectedBaseRoles.includes(r.baseRoleName) ||
                    (selectedBaseRoles.includes("employee") &&
                        r.baseRoleName === "admin") ||
                    (selectedBaseRoles.includes("admin") &&
                        r.baseRoleName === "employee")
            );

    // Branches only appear if no "customer" base role is selected
    const showBranches = !selectedBaseRoles.includes("_CUSTOMER_") && selectedBaseRoles.length > 0;

    const toggleBranch = (value: string) => {
        setFormData((prev) => {
            const existing = prev.branches || [];
            const updated = existing.includes(value)
                ? existing.filter((v) => v !== value)
                : [...existing, value];
            return { ...prev, branches: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formSchema = { ...formSchemaGeneral, ...(hasContractorBaseRole ? formSchemaContractor : hasAdminEmployeeBaseRole ? formSchemaAdminEmployee : {}) }
        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);
        if (!isValid) return;

        const multipartFormData = new FormData();
        multipartFormData.append("name", validatedData.name);
        multipartFormData.append("username", validatedData.username);
        multipartFormData.append("phone", validatedData.phone);
        multipartFormData.append("roles", JSON.stringify(validatedData.roles || []));

        if (validatedData.branches) multipartFormData.append("branches", JSON.stringify(validatedData.branches || []));
        if (validatedData.email) multipartFormData.append("email", validatedData.email);
        if (validatedData.commission) multipartFormData.append("commission", (validatedData.commission / 100).toString());
        if (formData.profile) multipartFormData.append("image", formData.profile);


        const success =
            action === "create"
                ? await postData(multipartFormData)
                : await putData(id, multipartFormData);
        if (success) {
            onSuccess();
            setFormData({ roles: [] });
            closeModal();

            formData.userConnectingRoleIds?.forEach((roleRecord) => {
                invalidateCache(`/api/${roleRecord.role}s/${roleRecord.id}`);
            });
            invalidateCache(`/api/approval-logs`);
            invalidateCache(`/api/activity-logs`);
        }
    };

    const removeComponent = (id: number) => {
        setComponents((prev) => prev.filter((mat) => mat.id !== id));
    };

    const addComponent = (comp: any) => {
        setComponents((prev) => [...prev, { id: comp.value, componentName: comp.label, amount: null, schedules: null } as Component]);
    };

    useEffect(() => {
        if (showBranches && branchOptions.length > 0) {
            setFormData((prev) => {
                if (!prev.branches || prev.branches.length === 0) {
                    return { ...prev, branches: [branchOptions[0].value] };
                }
                return prev;
            });
        }
    }, [showBranches, branchOptions]);
useEffect(() => {
    const fetchComponentsOptions = async () => {
        try {
            const components = (await api.get('/api/components')).data.data;
            const compOptions = components?.map((component: any) => ({
                value: component.id,
                label: component.componentName
            }))
            console.log("COMPONENT", components);
            
            // Set the mapped options, not the original components
            setComponentsOptions(compOptions as SelectionOptions[]);
        } catch (error) {
            console.error('Error fetching components:', error);
            setComponentsOptions([]); // Set empty array on error
        }
    };

    if (hasEmployeeBaseRole) {
        fetchComponentsOptions();
    }
}, [hasEmployeeBaseRole]);

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px] max-w-3xl">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">
                                {action === "edit" ? "Edit User" : "Add User"}
                            </h2>
                            <button type="button" className="cursor-pointer" onClick={closeModal}>
                                ✕
                            </button>
                        </div>

                        <div className="fields grid gap-[20px]">
                            <fieldset className="card">
                                <h4 className="text-lg font-bold mb-5">Profile Picture</h4>

                                <Field.Image
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            profile: e.target.files ? e.target.files[0] : null,
                                        })}
                                />
                            </fieldset>

                            {/* Personal Info */}
                            <fieldset className="card">
                                <h4 className="text-lg font-bold mb-5">Personal Information</h4>

                                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                    <Field.Text
                                        id="name"
                                        label="Name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                    />
                                    <Field.Text
                                        id="username"
                                        label="Username"
                                        value={formData.username}
                                        readonly={action === "edit"}
                                        onChange={(e) =>
                                            setFormData({ ...formData, username: e.target.value })
                                        }
                                    />
                                    <Field.Email
                                        id="email"
                                        label="Email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                    />
                                    <Field.Number
                                        id="phone"
                                        label="Phone Number"
                                        noSpinner
                                        min={0}
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: +e.target.value })
                                        }
                                    />
                                </div>
                            </fieldset>

                            {/* Roles Section */}
                            <fieldset className="card">
                                <div className="mb-5 flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">Roles</h4>
                                    <Button
                                        size="mini"
                                        variant="outline"
                                        label="Add Role"
                                        onClick={addRole}
                                        disabled={
                                            (formData.roles || [])
                                                .map((id) => roleOptions.find((r) => r.value === id))
                                                .some((r) =>
                                                    ["_CUSTOMER_", "_CONTRACTOR_"].includes(r?.baseRoleName || "")
                                                )
                                        }
                                    />
                                </div>

                                <div className="space-y-3">
                                    {(formData.roles || []).map((roleId, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-2"
                                        >
                                            <Selection
                                                placeholder="Select a role"
                                                options={filteredRoleOptions}
                                                value={roleId}
                                                onChange={(e) => updateRole(i, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeRole(i)}
                                                className="p-1 text-gray-500 hover:text-red-600"
                                            >
                                                <Icon name="delete" color="dark" />
                                            </button>
                                        </div>
                                    ))}

                                    {formData.roles?.length === 0 && (
                                        <p className="text-sm text-gray-500">
                                            No roles selected yet.
                                        </p>
                                    )}
                                </div>
                            </fieldset>

                            {/* Branch Section (Conditional) */}
                            {(showBranches || hasContractorBaseRole || hasEmployeeBaseRole) &&
                                <fieldset className="card">
                                    <h4 className="text-lg font-bold mb-5">Additional Information</h4>

                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-[20px]">
                                        {showBranches && (
                                            <div>
                                                <label className="">Branches</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {branchOptions.map((branch) => (
                                                        <button
                                                            key={branch.value}
                                                            type="button"
                                                            onClick={() => toggleBranch(branch.value)}
                                                            className={`px-3 py-1 rounded-full border ${formData.branches?.includes(branch.value)
                                                                ? "bg-primary text-white border-primary"
                                                                : "bg-gray-100 text-gray-700 border-gray-300"
                                                                }`}
                                                        >
                                                            {branch.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {hasContractorBaseRole &&
                                            <Field.Number
                                                id="commission"
                                                label="Commission (%)"
                                                noSpinner
                                                min={0}
                                                value={formData.commission}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, commission: +e.target.value })
                                                }
                                            />
                                        }

                                        {hasEmployeeBaseRole &&
                                            <div className="col-span-full">
                                                <div className="mb-5 flex justify-between items-center">
                                                    <h4 className="text-lg font-semibold">Components</h4>
                                                    {/* <Button variant="outline" label="Add Component" size="mini" onClick={addComponent} /> */}
                                                    <Selection
                                                        options={componentsOptions}
                                                        value=""
                                                        placeholder="Select Component"
                                                        onChange={(e) => addComponent(componentsOptions.find(comp => comp.value === e.target.value))}
                                                    />
                                                </div>

                                                {components.length > 0 &&
                                                    <>
                                                        <div className="grid grid-cols-[3fr_2fr_2fr_auto] gap-x-5 gap-y-[20px] font-semibold">
                                                            <span>Pay</span>
                                                            <span>Amount</span>
                                                            <span>Schedules</span>
                                                            <span className="opacity-0"><Icon name="Delete" /></span>
                                                        </div>

                                                        <ol className="grid gap-2 list-decimal list-inside">
                                                            {components.map((component, i) => (
                                                                <li key={i} id={`${component.id}`} className="grid grid-cols-[3fr_2fr_2fr_auto] gap-x-5 gap-y-[20px]">
                                                                    <Field.Text
                                                                        id={`${component.id}-name`}
                                                                        value={component.componentName}
                                                                        readonly
                                                                        onChange={(e) => {
                                                                            const updatedComponents = components.map((comp) =>
                                                                                comp.id === component.id
                                                                                    ? { ...comp, componentName: e.target.value }
                                                                                    : comp
                                                                            );
                                                                            setComponents(updatedComponents)
                                                                        }}
                                                                    />

                                                                    {/* <Dropdown options/> */}

                                                                    <Field.Money
                                                                        id={`${component.id}-amount`}
                                                                        value={component.amount}
                                                                        onChange={(values) => {
                                                                            const updatedComponents = components.map((comp) =>
                                                                                comp.id === component.id
                                                                                    ? { ...comp, amount: values.floatValue ?? null }
                                                                                    : comp
                                                                            );
                                                                            setComponents(updatedComponents)
                                                                        }}
                                                                    />

                                                                    {/* <Field.Number
                                                                        id={`${component.id}-schedules`}
                                                                        min={1}
                                                                        value={component.schedules}
                                                                        onChange={(e) => {
                                                                            const updatedComponents = components.map((comp) =>
                                                                                comp.id === component.id
                                                                                    ? { ...comp, schedules: +e.target.value }
                                                                                    : comp
                                                                            );
                                                                            setComponents(updatedComponents)
                                                                        }}
                                                                    /> */}
                                                                    <button type="button" className="mt-auto py-[5px] cursor-pointer" onClick={() => removeComponent(component.id)}><Icon name="delete" color="dark" /></button>

                                                                </li>
                                                            ))}
                                                        </ol>
                                                    </>
                                                }
                                            </div>
                                        }
                                    </div>
                                </fieldset>
                            }
                        </div>


                        <div className="flex justify-end items-center gap-[20px]">
                            <Button variant="gray" label="Cancel" onClick={closeModal} />
                            {action === 'create'
                                ? <Button type="submit" variant="primary" label={loading ? "Adding..." : "Add User"} disabled={loading} />
                                : <Button type="submit" variant="primary" label={loading ? "Saving..." : "Save"} disabled={loading} />
                            }
                        </div>
                    </form>

                    <div className="backdrop"></div>
                </>
            }
        </>
    );
}
