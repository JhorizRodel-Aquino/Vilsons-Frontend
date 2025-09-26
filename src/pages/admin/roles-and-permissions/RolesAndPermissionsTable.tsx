import { Fragment } from "react/jsx-runtime";
import RolesAndPermissionsTableData from "./RolesAndPermissionTableData";

export type Permission = {
    permission: string;
    permitted: boolean;
    approval?: boolean;
    mainAccess?: boolean;
};

export type ModulePermissions = {
    module: string;
    view: Permission[];
    create: Permission[];
    edit: Permission[];
    delete: Permission[];
};

export default function PermissionsTable({ modulePermissions }: { modulePermissions: ModulePermissions[] }) {
    return (
        <div className="table-section">
            <div className="table-container">
                <table>
                    <thead className="border-b">
                        <tr>
                            <th>Permission</th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className='table-container main'>
                <table>
                    {/* <thead>
                        <tr>
                            <th>Permission</th>
                            <th>Approval</th>
                        </tr>
                    </thead> */}

                    <tbody className='divide-y divide-border'>
                        {modulePermissions.map((modulePerm, i) => {
                            const permissions = [...modulePerm.view, ...modulePerm.create, ...modulePerm.edit, ...modulePerm.delete]
                            return (
                                <Fragment key={i}>
                                    <tr className='bg-light-gray text-primary font-semibold capitalize sticky top-0'>
                                        <td colSpan={2} className="pl-2">{modulePerm.module}</td>
                                    </tr>
                                    
                                    {
                                        permissions.map((perm, j) => (
                                            <tr key={j} className="hover:bg-gray ">
                                                <RolesAndPermissionsTableData permission={perm.permission} approval={perm.approval} />
                                            </tr>
                                        ))
                                    }
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>

                {modulePermissions.length <= 0 && <p className='text-center my-10 italic'>No Records</p>}
            </div>
        </div>
    )
}