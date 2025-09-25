import { Fragment } from "react/jsx-runtime";
import Checkbox from "../../../components/Checkbox";

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
        <div>
            <div className="table-container">
                <table>
                    <thead className="border-b border-border">
                        <tr>
                            <th>Permission</th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className='table-container'>
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
                                    <tr className='bg-light-gray text-primary font-semibold capitalize'>
                                        <td colSpan={2} className="pl-2">{modulePerm.module}</td>
                                    </tr>
                                    
                                    {
                                        permissions.map((perm, j) => (
                                            <tr key={j} className="hover:bg-gray ">
                                                <td className="pl-6 py-0">
                                                    <label htmlFor={perm.permission} className="flex gap-3 items-center py-3">
                                                        <Checkbox value={perm.permission}/>
                                                        {perm.permission}
                                                    </label>
                                                </td>
                                                <td className="py-0">
                                                    {perm.approval != null && 
                                                        <div className="flex items-center justify-center">
                                                            <Checkbox value={`${perm.permission}-approval`}/>
                                                        </div>
                                                    }
                                                </td>
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