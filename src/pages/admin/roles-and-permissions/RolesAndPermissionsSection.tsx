import { useEffect, useState } from "react";
import SectionHeading from "../../../components/SectionHeading";
import Details from "../../../components/Details";
import TableFilter from "../../../components/TableFilter";
import SearchBar from "../../../components/SearchBar";
import Dropdown from "../../../components/Dropdown";
import type { ModulePermissions } from "./PermissionsTable";
import PermissionsTable from "./PermissionsTable";
import useGetData from "../../../hooks/useGetData";
import Loading from "../../../components/Loading";
import ErrorModal from "../../../components/ErrorModal";
import Selection, { type SelectionOptions } from "../../../components/Selection";
import Button from "../../../components/Button";
import RolesAndPermissionsModal from "./RolesAndPermissionsModal";
import Icon from "../../../components/Icon";
import ConfirmModal from "../../../components/ConfirmModal";
import useDeleteData from "../../../hooks/useDeleteData";
import useGetDataWithTrigger from "../../../hooks/useGetDataWithTrigger";

// const modulePermissions: ModulePermissions[] = [
//   {
//     module: "Job Orders",
//     view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_job_orders", permitted: true, approval: false }],
//     edit: [
//       { permission: "edit_job_orders", permitted: true, approval: true },
//       { permission: "edit_job_orders_status", permitted: true, approval: false },
//     ],
//     delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
//   },
//   {
//     module: "Other Income",
//     view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_other_income", permitted: true, approval: false }],
//     edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
//     delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
//   },
//   {
//     module: "Job Orders",
//     view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_job_orders", permitted: true, approval: false }],
//     edit: [
//       { permission: "edit_job_orders", permitted: true, approval: true },
//       { permission: "edit_job_orders_status", permitted: true, approval: false },
//     ],
//     delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
//   },
//   {
//     module: "Other Income",
//     view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_other_income", permitted: true, approval: false }],
//     edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
//     delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
//   },
//   {
//     module: "Job Orders",
//     view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_job_orders", permitted: true, approval: false }],
//     edit: [
//       { permission: "edit_job_orders", permitted: true, approval: true },
//       { permission: "edit_job_orders_status", permitted: true, approval: false },
//     ],
//     delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
//   },
//   {
//     module: "Other Income",
//     view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_other_income", permitted: true, approval: false }],
//     edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
//     delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
//   },
//   {
//     module: "Job Orders",
//     view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_job_orders", permitted: true, approval: false }],
//     edit: [
//       { permission: "edit_job_orders", permitted: true, approval: true },
//       { permission: "edit_job_orders_status", permitted: true, approval: false },
//     ],
//     delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
//   },
//   {
//     module: "Other Income",
//     view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
//     create: [{ permission: "create_other_income", permitted: true, approval: false }],
//     edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
//     delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
//   },
// ];

// type RolesAndPermissionsProps = {
//   setPresetData: (presets: FormData) => void,
//   reloadFlag: boolean,
//   // setShowModal: (action: 'create' | 'edit' | null) => void;
//   // selectedId: string;
//   // setSelectedId: (id: string) => void;
// }

type Role = {
  id: string;
  roleName: string;
  isCustom: boolean;
  baseRoleId: string | null;
}

export default function RolesAndPermissionsSection() {
  const { data, loading, error, closeError, refetch, reload } = useGetData('api/roles')
  // const [roleItems, serRoleItems] = useState<Record<string, any>[]>([]);
  const [rolePermissions, setRolePermissions] = useState<Record<string, ModulePermissions[]> | null>(null);
  // const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const {
    data: role,
    loading: roleLoading,
    error: roleError,
    closeError: roleCloseError,
    refetch: roleRefetch,
    reload: roleReload
  } = useGetDataWithTrigger(`api/roles/permissions/${selectedRoleId}`)
  const {
    loading: deleteLoading,
    error: deleteError,
    closeError: closeDeleteError,
    deleteData,
  } = useDeleteData('/api/roles');
  // const [edit, setEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState<"create" | "edit" | null>(null);



  useEffect(() => {
    if (role && role.permissions && typeof role.permissions === "object") {
      setRolePermissions(role.permissions);
    }
    // console.log("📦 role data updated:", role);
  }, [role]);

  useEffect(() => {
    console.log("🔄 selectedRoleId changed:", selectedRoleId);
    if (selectedRoleId !== "") roleRefetch();
  }, [selectedRoleId]);



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
  // const rolesOptions = [...baseRoleOptions, ...customRoleOptions]

  useEffect(() => {
    if (customRoleOptions && customRoleOptions.length > 0 && !selectedRoleId) {
      setSelectedRoleId(customRoleOptions[0].value); // automatically pick first role
    }
  }, [customRoleOptions, selectedRoleId]);

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



  // const roles = ["Admin", "Employee", "Contractor", "Customer"];
  // const [role, setRole] = useState(roles[0]);

  return (
    <>
      <SectionHeading>
        <Details subtitle={"All Permissions"} modifiedDate="Aug 9, 2025" />
        <Button label="Create New Role" onClick={() => {
          setShowModal("create")
        }} />
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
          <button type="button" onClick={() => setShowDeleteModal(true)}><Icon name="delete" color="dark" /></button>
        </div>
        <div className="px-2 row-start-2">
          <p className="text-primary">Role</p>
          <p>{role.roleName}</p>
        </div>
        <div className="px-2 row-start-2">
          <p className="text-primary">Base Role</p>
          <p>{role.baseRoleName !== null ? role.baseRoleName : "None"}</p>
        </div>

        {/* <div className="px-2 row-start-2">
          <p className="text-primary">Type</p>
          <p>{role.isCustom !== undefined && (role.isCustom ? 'Custom' : 'Built-in')}</p>
        </div> */}
      </div>

      <PermissionsTable rolePermissions={rolePermissions} setRolePermissions={setRolePermissions} action={showModal} setShowModal={setShowModal} />

      {showModal && <RolesAndPermissionsModal action={showModal} setShowModal={setShowModal} rolePermissions={rolePermissions} setRolePermissions={setRolePermissions} onSuccess={() => { reload(); roleReload(); roleRefetch() }} selectedRole={role} customRoleOptions={customRoleOptions} baseRolesOptions={baseRoleOptions} />}

      {(error || deleteError) ?
        <ErrorModal error={(error || deleteError)!} closeError={error ? closeError : closeDeleteError} />
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
