import { useCallback, useState } from "react";
import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import Button from "../../components/Button";
import UsersTable from "./UsersTable";
import UsersModal, { type FormData } from "./UsersModal";
import useGetData from "../../hooks/useGetData";
import type { SelectionOptions } from "../../components/Selection";
import ErrorModal from "../../components/ErrorModal";
import useBranchOptions from "../../hooks/useBranchOptions";
import { hasPermissions } from "../../services/permissionService";
import formatDate from "../../utils/formatDate";

export default function UserSection() {
    const { branchOptions } = useBranchOptions()
    const { data: roles, error, closeError } = useGetData('api/roles')
    const [selectedId, setSelectedId] = useState<string>('');
    const [presetData, setPresetData] = useState<FormData>({ roles: [], branches: [] });
    const [reloadFlag, setReloadFlag] = useState(false);
    const [showModal, setShowModal] = useState<'create' | 'edit' | 'password' | null>(null)
        const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    const reload = useCallback(() => setReloadFlag(prev => !prev), []);

    const roleItems = roles.data?.roles || [];
    const customRoleOptions = roleItems
        ?.filter((role: any) => role.isCustom)
        .map((role: any) => ({
            value: role.id,
            label: role.roleName,
            baseRoleName: role.baseRoleName
        })) as (SelectionOptions & { baseRoleName: string; })[];

    return (
        <>
            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    <SectionHeading>
                        <Details subtitle={'All Users'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
                        {hasPermissions(['create_user']) &&
                            <Button label={'Add User'} onClick={() => { setPresetData({ name: '', username: '', email: '', phone: undefined, roles: [], branches: [] }); setShowModal('create') }} variant="primary" />}
                    </SectionHeading>

                    <UsersTable reloadFlag={reloadFlag} setPresetData={setPresetData} selectedId={selectedId} setSelectedId={setSelectedId} setShowModal={setShowModal} setLastUpdated={setLastUpdated} />

                    {showModal && <UsersModal branchOptions={branchOptions} roleOptions={customRoleOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} />}
                </>
            }
        </>
    )
}