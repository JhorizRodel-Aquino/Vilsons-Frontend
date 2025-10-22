import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import Field from "../../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../../utils/validateAndSanitize";
import ErrorModal from "../../../components/ErrorModal";
import usePostPutData from "../../../hooks/usePostPutData";
import useFieldList from "../../../hooks/useFieldList";
import type { ModulePermissions } from "./PermissionsTable";
import PermissionsTable from "./PermissionsTable";
import Selection, { type SelectionOptions } from "../../../components/Selection";
import useGetData from "../../../hooks/useGetData";
import Icon from "../../../components/Icon";
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

type RolesAndPermissionsModalProps = {
    action: "create" | "edit" | null,
    setShowModal: (action: "create" | "edit" | null) => void,
    onSuccess: () => void,
    selectedRole: Record<string, any>;
    rolePermissions: Record<string, ModulePermissions[]> | null;
    setRolePermissions: React.Dispatch<
        React.SetStateAction<Record<string, ModulePermissions[]> | null>
    >
    customRoleOptions: SelectionOptions[] | []
    baseRolesOptions: SelectionOptions[] | []
}

export default function RolesAndPermissionsModal({ action, setShowModal, onSuccess, selectedRole, rolePermissions, setRolePermissions, customRoleOptions, baseRolesOptions }: RolesAndPermissionsModalProps) {
    // const isSelectingRef = useRef(false);
    // const [formData, setFormData] = useState<FormData>({ truckId: truckId, customerId: "" })
    const { loading, error, closeError, putData, postData } = usePostPutData('/api/roles')
    const [permissions, setPermissions] = useState<Record<string, ModulePermissions[]> | null>(action === "edit" ? rolePermissions : null)
    const [role, setRole] = useState(action === "edit" ? selectedRole : { roleName: '', baseRoleId: '' })
    const [selectedRoleId, setSelectedRoleId] = useState<string>("");
    const [selectedBaseRoleId, setSelectedBaseRoleId] = useState<string>("");
    // const [resetPermissions, setResetPermissions] = useState<boolean>(false);
    const [clonePopup, setClonePopup] = useState<boolean>(false);
    const [roleFetchTrigger, setRoleFetchTrigger] = useState<number>(0);
    const [isCloning, setIsCloning] = useState<boolean>(false);
    const {
        data: roleData,
        loading: roleLoading,
        error: roleError,
        closeError: roleCloseError,
        refetch: roleRefetch,
        reload: roleReload,
    } = useGetData(`api/roles/permissions/${selectedRoleId}`)


    useEffect(() => {
        console.log(roleFetchTrigger)
        console.log("🔄 selectedRoleId changed:", selectedRoleId);
        if (selectedRoleId !== "") roleRefetch();
    }, [selectedRoleId, roleFetchTrigger]);



    const resetAllPermissions = () => {
        setPermissions((prev) => {
            if (!prev) return prev;

            const updated = Object.fromEntries(
                Object.entries(prev).map(([moduleName, permissions]) => [
                    moduleName,
                    permissions.map((perm) => ({
                        ...perm,
                        allowed: false,
                        approval: false,
                    })),
                ])
            );

            return updated;
        });
    };

    useEffect(() => {
        if (roleData && roleData.permissions && typeof roleData.permissions === "object") {
            setPermissions(roleData.permissions);

            if (isCloning) {
                setRole({ ...role, roleName: roleData.roleName + '-copy' })
                setSelectedBaseRoleId(roleData.baseRoleId)
                console.log("ROLEDATA", roleData)
            }
            else resetAllPermissions()
        }
    }, [roleData]);

    useEffect(() => {
        setRole({ ...role, baseRoleId: roleData.baseRoleId})
    }, [selectedBaseRoleId])
    // const {
    //     selected: selectedCustomer,
    //     setSelected: setSelectedCustomer,
    //     options: customerOptions,
    //     setOptions: setCustomerOptions,
    //     search: customerSearch,
    //     setSearch: setCustomerSearch
    // } = useFieldList("customers", "/api/customers?search=", null)

    // console.log(formData)

    const closeModal = () => {
        setShowModal(null)
        // setCustomerOptions([])
    }

    // const handleSelectCustomer = (customer: any) => {
    //     setSelectedCustomer({
    //         id: customer.user.customerId,
    //         name: customer.user.fullName,
    //         username: customer.user.username,
    //     });
    //     setCustomerSearch(customer.user.fullName); // show name in input
    // };

    // useEffect(() => {
    //     setFormData({ ...formData, customerId: selectedCustomer?.id })
    // }, [selectedCustomer])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = { ...role, permissions: permissions}
        const success = action === "create" ? await postData(formData) : await putData()
        if (success) {
            onSuccess();
            setRole({ roleName: '', baseRoleId: '' });
            setPermissions(null);
            closeModal();
        }
    };

      useEffect(() => {
    console.log("FORM:", {...role, permissions: permissions});
  }, [permissions, role]);

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <form onSubmit={handleSubmit} className="card modal gap-[20px] w-[40%]">
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">Edit Permissions</h2>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <div>
                            {action === "create" ?
                                <fieldset className="card grid grid-cols-2 text-base gap-[20px]">
                                    <div className="relative justify-self-start w-fit col-span-full">
                                        <Button label="Clone Role ›" variant="outline" size="mini" onClick={() => setClonePopup(true)} />
                                        {clonePopup &&
                                            <ul className="absolute right-0 top-0 translate-x-[105%] bg-light border-all z-40 rounded-md">
                                                {customRoleOptions.map((role, i) => (
                                                    <li key={i} className="px-2 hover:bg-light-primary cursor-pointer "
                                                        onClick={() => {
                                                            setSelectedRoleId(role.value);
                                                            setClonePopup(false);
                                                            setIsCloning(true)
                                                            setRoleFetchTrigger((prev) => prev + 1);
                                                        }}>
                                                        {role.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                    <Field.Text
                                        id="roleName"
                                        label="Role"
                                        value={role.roleName}
                                        onChange={(e) => {
                                            setRole({ ...role, roleName: e.target.value });
                                        }}
                                    />
                                    <div>
                                        Base Role
                                        <Selection
                                            capitalize={false}
                                            placeholder="Select Base Role"
                                            options={baseRolesOptions}
                                            value={selectedBaseRoleId}
                                            onChange={(e) => {
                                                // setSelectedBaseRoleId(e.target.value)
                                                setSelectedBaseRoleId(e.target.value)
                                                setIsCloning(false)
                                                setRoleFetchTrigger((prev) => prev + 1);
                                        
                                            }}
                                        />
                                    </div>
                                </fieldset>
                                :
                                <fieldset className="card grid grid-cols-3 text-base gap-[20px]">
                                    <div className="px-2">
                                        <p className="text-primary">Role</p>
                                        <p className="">{role.roleName}</p>
                                    </div>
                                    <div className="px-2">
                                        <p className="text-primary">Base Role</p>
                                        <p className="">{role.baseRoleName !== null ? role.baseRoleName : "None"}</p>
                                    </div>
                                    <div className="px-2">
                                        <p className="text-primary">Type</p>
                                        <p>{role.isCustom !== undefined && (role.isCustom ? 'Custom' : 'Built-in')}</p>
                                    </div>
                                </fieldset>
                            }
                        </div>



                        <div className="fields card p-0">
                            <fieldset className="grid gap-[20px]">
                                <PermissionsTable rolePermissions={permissions} setRolePermissions={setPermissions} action={action} setShowModal={setShowModal} />
                            </fieldset>
                        </div>

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