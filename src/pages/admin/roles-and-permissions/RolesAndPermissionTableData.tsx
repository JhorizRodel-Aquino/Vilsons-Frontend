import { useEffect, useState } from "react";
import Checkbox from "../../../components/Checkbox";
import Switch from "../../../components/Swicth";

export default function RolesAndPermissionsTableData({ permission, approval }: { permission: string, approval?: boolean }) {
    const [checked, setChecked] = useState(false);

    return (
        <>
            <td className="pl-6 py-0">
                <label htmlFor={permission} className="flex gap-3 items-center py-3">
                    <Checkbox value={permission} checked={checked} setChecked={setChecked} />
                    {permission}
                </label>
            </td>
            <td className="py-0">
                {approval != null &&
                    <div className="flex items-center justify-center">
                        <Switch disabled={!checked} />
                    </div>
                }
            </td>
        </>
    )
}