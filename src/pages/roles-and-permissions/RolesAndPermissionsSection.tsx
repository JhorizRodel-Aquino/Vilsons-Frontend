import { useEffect, useState } from "react";
import SectionHeading from "../../components/SectionHeading";
import Details from "../../components/Details";
import type { ModulePermissions } from "./PermissionsTable";
import PermissionsTable from "./PermissionsTable";
import useGetData from "../../hooks/useGetData";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import Selection, { type SelectionOptions } from "../../components/Selection";
import Button from "../../components/Button";
import RolesAndPermissionsModal from "./RolesAndPermissionsModal";
import Icon from "../../components/Icon";
import ConfirmModal from "../../components/ConfirmModal";
import useDeleteData from "../../hooks/useDeleteData";
import useGetDataWithTrigger from "../../hooks/useGetDataWithTrigger";
import { hasPermissions } from "../../services/permissionService";
import formatDate from "../../utils/formatDate";

export default function RolesAndPermissionsSection({reloadPermissions} : {reloadPermissions: () => void}) {
  const { data, loading, error, closeError, reload } = useGetData('api/roles')
  const [rolePermissions, setRolePermissions] = useState<Record<string, ModulePermissions[]> | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const {
    data: role,
    error: roleError,
    closeError: closeRoleError,
    refetch: roleRefetch,
    reload: roleReload
  } = useGetDataWithTrigger(`api/roles/permissions/${selectedRoleId}`)
  const {
    loading: deleteLoading,
    error: deleteError,
    closeError: closeDeleteError,
    deleteData,
  } = useDeleteData('/api/roles');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState<"create" | "edit" | null>(null);
      const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

  const roleItems = data.data?.roles || [];

  const baseRoleOptions = roleItems
    ?.filter((role: any) => !role.isCustom)
    .map((role: any) => ({
      value: role.id,
      label: role.roleName,
    })) as SelectionOptions[];

  const customRoleOptions = roleItems
    ?.filter((role: any) => role.isCustom)
    .map((role: any) => ({
      value: role.id,
      label: role.roleName,
    })) as SelectionOptions[];

  useEffect(() => {
    if (customRoleOptions && customRoleOptions.length > 0 && !selectedRoleId) {
      setSelectedRoleId(customRoleOptions[0].value); // automatically pick first role
    }
  }, [customRoleOptions, selectedRoleId]);

  useEffect(() => {
    if (role && role.permissions && typeof role.permissions === "object") {
      setRolePermissions(role.permissions);
    }
  }, [role]);

  useEffect(() => {
    console.log("🔄 selectedRoleId changed:", selectedRoleId);
    if (selectedRoleId !== "") roleRefetch();
  }, [selectedRoleId]);


  useEffect(() => {
    console.log("PERM:", rolePermissions);
  }, [rolePermissions]);

  const handleDelete = async () => {
    if (!selectedRoleId) return
    const success = await deleteData(selectedRoleId);
    if (success) {
      setSelectedRoleId("")
      reload();

      setShowDeleteModal(false)
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      <SectionHeading>
        <Details subtitle={"All Permissions"} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
        {hasPermissions(['create_role_permission']) &&
          <Button label="Create New Role" onClick={() => {
            setShowModal("create")
          }} />}
      </SectionHeading>

      <div className="grid grid-cols-2 py-3 px-[20px] border-all rounded-[10px] text-base gap-[20px]">
        <div className="flex gap-2 items-center">
          <Selection
            className="justify-self-start"
            capitalize={false}
            options={customRoleOptions}
            value={selectedRoleId}
            onChange={(e) => setSelectedRoleId(e.target.value)}
          />
          {hasPermissions(['delete_role_permission']) && <button type="button" onClick={() => setShowDeleteModal(true)}><Icon name="delete" color="dark" /></button>}
        </div>
        <div className="px-2 row-start-2">
          <p className="text-primary">Role</p>
          <p>{role.roleName}</p>
        </div>
        <div className="px-2 row-start-2">
          <p className="text-primary">Base Role</p>
          <p>{role.baseRoleName !== null ? role.baseRoleName : "None"}</p>
        </div>
      </div>

      <PermissionsTable rolePermissions={rolePermissions} setRolePermissions={setRolePermissions} action={showModal} setShowModal={setShowModal} setLastUpdated={setLastUpdated}/>

      {showModal && <RolesAndPermissionsModal action={showModal} setShowModal={setShowModal} rolePermissions={rolePermissions} setRolePermissions={setRolePermissions} onSuccess={() => { reload(); roleReload(); roleRefetch() }} selectedRole={role} customRoleOptions={customRoleOptions} baseRolesOptions={baseRoleOptions} reloadPermissions={reloadPermissions} />}

      {(error || deleteError || roleError) ?
        <ErrorModal error={(error || deleteError || roleError)!} closeError={error ? closeError : deleteError ? closeDeleteError : closeRoleError} />
        : showDeleteModal &&
        <ConfirmModal
          title="Delete Overhead"
          message="Are you sure you want to delete this overhead?"
          onClose={() => { setShowDeleteModal(false) }}
          onConfirm={handleDelete} red={true}
          disabledButtons={deleteLoading}
          onProgressLabel={deleteLoading ? 'Deleting...' : ''}
        />
      }
    </>
  );
}
