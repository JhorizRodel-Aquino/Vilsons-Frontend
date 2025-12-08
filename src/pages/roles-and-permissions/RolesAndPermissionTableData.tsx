import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import Switch from "../../components/Switch";

let id = 0;

export default function RolesAndPermissionsTableData({ permission, allowed, setAllowed, approval, setApproval, disabled = false }: { permission: string, allowed: boolean, setAllowed: (allowed: boolean) => void, approval?: boolean, setApproval: (approved: boolean) => void, disabled?: boolean }) {
    return (
        <>
            <td className="pl-6 py-0">
                <label className="flex gap-3 items-center py-3">
                    <Checkbox value={permission} checked={allowed} setChecked={setAllowed} disabled={disabled} />
                    {permission}
                </label>
            </td>
            <td className="py-0">
                {approval != null &&
                    <div className={`flex items-center justify-center`}>
                        <Switch disabled={!allowed || disabled} checked={approval} setChecked={setApproval}/>
                    </div>
                }
            </td>
        </>
    )
}