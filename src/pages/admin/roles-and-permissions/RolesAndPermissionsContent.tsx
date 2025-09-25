import { useState } from "react";
import Info from "../../../components/Info";
import Details from "../../../components/Details";
import TableFilter from "../../../components/TableFilter";
import SearchBar from "../../../components/SearchBar";
import Dropdown from "../../../components/Dropdown";
import type { ModulePermissions } from "./RolesAndPermissionsTable";
import PermissionsTable from "./RolesAndPermissionsTable";

export default function RolesAndPermissionPermissionsTabContent() {
  const modulePermissions: ModulePermissions[] = [
    {
      module: "Job Orders",
      view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
      create: [{ permission: "create_job_orders", permitted: true, approval: false }],
      edit: [
        { permission: "edit_job_orders", permitted: true, approval: true },
        { permission: "edit_job_orders_status", permitted: true, approval: false },
      ],
      delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
    },
    {
      module: "Other Income",
      view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
      create: [{ permission: "create_other_income", permitted: true, approval: false }],
      edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
      delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
    },
    {
      module: "Job Orders",
      view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
      create: [{ permission: "create_job_orders", permitted: true, approval: false }],
      edit: [
        { permission: "edit_job_orders", permitted: true, approval: true },
        { permission: "edit_job_orders_status", permitted: true, approval: false },
      ],
      delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
    },
    {
      module: "Other Income",
      view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
      create: [{ permission: "create_other_income", permitted: true, approval: false }],
      edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
      delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
    },
    {
      module: "Job Orders",
      view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
      create: [{ permission: "create_job_orders", permitted: true, approval: false }],
      edit: [
        { permission: "edit_job_orders", permitted: true, approval: true },
        { permission: "edit_job_orders_status", permitted: true, approval: false },
      ],
      delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
    },
    {
      module: "Other Income",
      view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
      create: [{ permission: "create_other_income", permitted: true, approval: false }],
      edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
      delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
    },
    {
      module: "Job Orders",
      view: [{ permission: "view_job_orders", permitted: true, mainAccess: true }],
      create: [{ permission: "create_job_orders", permitted: true, approval: false }],
      edit: [
        { permission: "edit_job_orders", permitted: true, approval: true },
        { permission: "edit_job_orders_status", permitted: true, approval: false },
      ],
      delete: [{ permission: "delete_job_orders", permitted: true, approval: true }],
    },
    {
      module: "Other Income",
      view: [{ permission: "view_other_income", permitted: true, mainAccess: true }],
      create: [{ permission: "create_other_income", permitted: true, approval: false }],
      edit: [{ permission: "edit_other_income", permitted: true, approval: true }],
      delete: [{ permission: "delete_other_income", permitted: true, approval: true }],
    },
  ];

  const roles = ["Admin", "Employee", "Contractor", "Customer"];
  const [role, setRole] = useState(roles[0]);

  return (
    <>
        <Info>
            <Details subtitle={"All Permissions"} modifiedDate="Aug 9, 2025" />
        </Info>

        <TableFilter>
            <SearchBar />
            <Dropdown options={roles} value={role} setValue={setRole} />
        </TableFilter>

        <div className="grid grid-cols-2 justify-between py-3 px-[20px] bg-gray rounded-[10px] text-base">
            <div className="px-2">
                <p className="text-primary font-medium">Role</p>
                <p>Cashier</p>
            </div>
            <div className="px-2">
                <p className="text-primary font-medium">Base Role</p> 
                <p> Admin, Employee</p>
            </div>
        </div>

        <PermissionsTable modulePermissions={modulePermissions} />
    </>
  );
}
