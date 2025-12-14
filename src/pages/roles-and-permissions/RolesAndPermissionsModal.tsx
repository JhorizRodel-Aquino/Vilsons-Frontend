import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Field from "../../components/Field";
import validateAndSanitize, { type ValidationSchema } from "../../utils/validateAndSanitize";
import ErrorModal from "../../components/ErrorModal";
import usePostPutData from "../../hooks/usePostPutData";
import type { ModulePermissions } from "./PermissionsTable";
import PermissionsTable from "./PermissionsTable";
import Selection, { type SelectionOptions } from "../../components/Selection";
import useGetDataWithTrigger from "../../hooks/useGetDataWithTrigger";
import { invalidateCache } from "../../hooks/useGetData";

const formSchema: ValidationSchema = {
    roleName: { required: true, label: "Role Name" },
};

type RolesAndPermissionsModalProps = {
    action: "create" | "edit" | null,
    setShowModal: (action: "create" | "edit" | null) => void,
    onSuccess: () => void,
    selectedRole: Record<string, any>;
    rolePermissions: Record<string, ModulePermissions[]> | null;
    setRolePermissions: React.Dispatch<
        React.SetStateAction<Record<string, ModulePermissions[]> | null>
    >;
    customRoleOptions: SelectionOptions[] | [];
    baseRolesOptions: SelectionOptions[] | [];
    reloadPermissions: () => void
};

export default function RolesAndPermissionsModal({
    action,
    setShowModal,
    onSuccess,
    selectedRole,
    rolePermissions,
    customRoleOptions,
    baseRolesOptions,
    reloadPermissions
}: RolesAndPermissionsModalProps) {
    const clonePopupRef = useRef<HTMLDivElement | null>(null);
    const { loading, error, closeError, putData, postData } = usePostPutData("/api/roles");

    const [permissions, setPermissions] = useState<Record<string, ModulePermissions[]> | null>(
        action === "edit" ? rolePermissions : null
    );
    const [role, setRole] = useState(
        action === "edit" ? selectedRole : { roleName: "", baseRoleId: "" }
    );

    const [selectedRoleId, setSelectedRoleId] = useState<string>("");
    const [selectedBaseRoleId, setSelectedBaseRoleId] = useState<string>("");
    const [clonePopup, setClonePopup] = useState<boolean>(false);
    const [isCloning, setIsCloning] = useState<boolean>(false);
    const [fetchTrigger, setFetchTrigger] = useState<number>(0);

    // 👇 choose which role ID to use when fetching
    const activeRoleId = isCloning ? selectedRoleId : selectedBaseRoleId;

    const {
        data: roleData,
        error: roleError,
        closeError: closeRoleError,
        refetch: roleRefetch,
    } = useGetDataWithTrigger(`api/roles/permissions/${activeRoleId}`);

    // 🟢 Refetch whenever the selected role changes or manual trigger increments
    useEffect(() => {
        if (activeRoleId) roleRefetch();
    }, [activeRoleId, fetchTrigger]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                clonePopup &&
                clonePopupRef.current &&
                !clonePopupRef.current.contains(e.target as Node)
            ) {
                setClonePopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [clonePopup]);


    // Reset all allowed/approval flags
    const resetAllPermissions = () => {
        setPermissions((prev) => {
            if (!prev) return prev;
            const updated = Object.fromEntries(
                Object.entries(prev).map(([moduleName, perms]) => [
                    moduleName,
                    perms.map((perm) => ({
                        ...perm,
                        allowed: false,
                        approval: false,
                    })),
                ])
            );
            return updated;
        });
    };

    // 🔁 Handle fetched role data
    useEffect(() => {
        if (roleData && typeof roleData.permissions === "object") {
            setPermissions(roleData.permissions);

            if (isCloning) {
                // If cloning — copy role name and keep permissions checked
                setRole({
                    ...role,
                    roleName: `${roleData.roleName}-copy`,
                    baseRoleId: roleData.baseRoleId,
                });
            } else {
                // If base role — clear all permissions
                resetAllPermissions();
                setRole({
                    ...role,
                    baseRoleId: activeRoleId,
                });
            }
        }
    }, [roleData]);

    const closeModal = () => {
        setShowModal(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = { ...role, permissions };
        const { validatedData, isValid } = validateAndSanitize(formData, formSchema);

        if (!isValid) return;

        const success =
            action === "create"
                ? await postData(validatedData)
                : await putData(role.roleId, validatedData);

        if (success) {
            onSuccess();
            setRole({ roleName: "", baseRoleId: "" });
            setPermissions(null);
            closeModal();

            invalidateCache(`/api/approval-logs`);
            invalidateCache(`/api/activity-logs`);
            reloadPermissions()
        }
    };

    return (
        <>
            {(error || roleError) ?
                <ErrorModal error={(error || roleError)!} closeError={error ? closeError : closeRoleError} />
                :
                <>
                    <form
                        onSubmit={handleSubmit}
                        className="card modal gap-[20px] w-[40%]"
                    >
                        <div className="text-xl flex justify-between items-center">
                            <h2 className="font-bold">
                                {action === "create"
                                    ? "Create Role"
                                    : "Edit Permissions"}
                            </h2>
                            <Button.X onClick={closeModal} disabled={loading} />
                        </div>

                        <div>
                            {action === "create" ? (
                                <fieldset className="card grid grid-cols-2 text-base gap-[20px]">
                                    <div className="relative justify-self-start w-fit col-span-full" ref={clonePopupRef}>
                                        <Button
                                            label="Clone Role ›"
                                            variant="outline"
                                            size="mini"
                                            onClick={() => setClonePopup((prev) => !prev)}
                                        />

                                        {clonePopup && (
                                            <ul className="absolute right-0 top-0 translate-x-[105%] bg-light border-all z-40 rounded-md shadow-lg whitespace-nowrap min-w-max" onMouseLeave={() => setClonePopup(false)} >
                                                {customRoleOptions.map((roleOpt, i) => (
                                                    <li
                                                        key={i}
                                                        className="px-3 py-1 hover:bg-light-primary cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedRoleId(roleOpt.value);
                                                            setClonePopup(false);
                                                            setIsCloning(true);
                                                            setFetchTrigger((p) => p + 1);
                                                        }}
                                                    >
                                                        {roleOpt.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>



                                    <Field.Text
                                        id="roleName"
                                        label="Role"
                                        value={role.roleName}
                                        onChange={(e) =>
                                            setRole({
                                                ...role,
                                                roleName: e.target.value,
                                            })
                                        }
                                    />

                                    <div>
                                        Base Role
                                        <Selection
                                            capitalize={false}
                                            placeholder="Select Base Role"
                                            options={baseRolesOptions}
                                            value={selectedBaseRoleId}
                                            onChange={(e) => {
                                                setSelectedBaseRoleId(
                                                    e.target.value
                                                );
                                                setIsCloning(false);
                                                setFetchTrigger(
                                                    (p) => p + 1
                                                );
                                            }}
                                        />
                                    </div>
                                </fieldset>
                            ) : (
                                <fieldset className="card grid grid-cols-2 text-base gap-[20px]">
                                    <Field.Text
                                        id="roleName"
                                        label="Role"
                                        value={role.roleName}
                                        onChange={(e) =>
                                            setRole({
                                                ...role,
                                                roleName: e.target.value,
                                            })
                                        }
                                    />
                                    <Field.Text
                                        id="baseRoleName"
                                        label="Base Role"
                                        value={
                                            role.baseRoleName ?? "None"
                                        }
                                        readonly={true}
                                    />
                                </fieldset>
                            )}
                        </div>

                        <div className="fields card p-0">
                            <fieldset className="grid gap-[20px]">
                                <PermissionsTable
                                    rolePermissions={permissions}
                                    setRolePermissions={setPermissions}
                                    action={action}
                                    setShowModal={setShowModal}
                                />
                            </fieldset>
                        </div>

                        <div className="flex justify-end items-center gap-[20px]">
                            <Button
                                variant="gray"
                                label="Cancel"
                                onClick={closeModal}
                                disabled={loading}
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                label={
                                    loading
                                        ? "Saving..."
                                        : action === "create"
                                            ? "Create Role"
                                            : "Save Changes"
                                }
                                disabled={loading}
                            />
                        </div>
                    </form>

                    <div className="backdrop"></div>
                </>
            }
        </>
    );
}
