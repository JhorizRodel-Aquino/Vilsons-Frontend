import { Fragment } from "react/jsx-runtime";
import RolesAndPermissionsTableData from "./RolesAndPermissionTableData";
import Icon from "../../components/Icon";
import { hasPermissions } from "../../services/permissionService";

export type Permission = {
    permission: string;
    permitted: boolean;
    approval?: boolean;
    mainAccess?: boolean;
};

export type ModulePermissions = {
    allowed: boolean;
    approval: boolean;
    method: string;
    permissionId: string;
    permissionName: string;
};

export default function PermissionsTable({
    rolePermissions,
    setRolePermissions,
    action,
    setShowModal,
    setLastUpdated
}: {
    rolePermissions: Record<string, ModulePermissions[]> | null;
    setRolePermissions: React.Dispatch<
        React.SetStateAction<Record<string, ModulePermissions[]> | null>
    >;
    action: "create" | "edit" | null,
    setShowModal: (action: "create" | "edit" | null) => void,
    setLastUpdated: (date: string | undefined) => void;
}) {



    const handleTogglePermission = (
        moduleName: string,
        permissionName: string,
        newAllowed: boolean
    ) => {
        if (!action) return;

        setRolePermissions((prev) => {
            if (!prev) return prev;

            // Clone the existing permissions
            const updated = { ...prev };

            // Safeguard in case the moduleName doesn't exist
            if (!updated[moduleName]) return prev;

            // Update only the matching permission
            updated[moduleName] = updated[moduleName].map((perm) =>
                perm.permissionName === permissionName
                    ? { ...perm, allowed: newAllowed }
                    : perm
            );

            return updated;
        });
    };

    const handleTogglePermissionApproval = (
        moduleName: string,
        permissionName: string,
        newApproval: boolean
    ) => {
        if (!action) return;

        setRolePermissions((prev) => {
            if (!prev) return prev;

            // Clone the existing permissions
            const updated = { ...prev };

            // Safeguard in case the moduleName doesn't exist
            if (!updated[moduleName]) return prev;

            // Update only the matching permission
            updated[moduleName] = updated[moduleName].map((perm) =>
                perm.permissionName === permissionName
                    ? { ...perm, approval: newApproval }
                    : perm
            );

            return updated;
        });
    };

    

    return (
        <div className="table-section">
            <div className="table-container">
                <table>
                    <thead className="border-b">
                        <tr>
                            <th className="flex items-center gap-2">Permission
                                {hasPermissions(['edit_role_permission']) && <button type="button" className="cursor-pointer" onClick={() => setShowModal("edit")}><Icon name="edit" color="primary" /></button>}
                            </th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='table-container main'>
                <table>
                    <tbody className='divide-y divide-border'>
                        {Object.entries(rolePermissions || {}).map(([moduleName, perms]) => (
                            <Fragment key={moduleName}>
                                <tr className="bg-light-gray text-primary font-semibold capitalize sticky top-0 z-10">
                                    <td colSpan={2} className="pl-2">{moduleName.replaceAll("_", " ")}</td>
                                </tr>

                                {perms.map((perm) => (
                                    <tr key={perm.permissionId}>
                                        <RolesAndPermissionsTableData
                                            permission={perm.permissionName}
                                            allowed={perm.allowed}
                                            approval={perm.approval}
                                            setAllowed={(newAllowed) =>
                                                handleTogglePermission(moduleName, perm.permissionName, newAllowed)
                                            }
                                            setApproval={(newApproval) =>
                                                handleTogglePermissionApproval(moduleName, perm.permissionName, newApproval)
                                            }
                                        />
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>

                {/* {modulePermissions.length <= 0 && <p className='text-center my-10 italic'>No Records</p>} */}
            </div>
        </div>
    )
}