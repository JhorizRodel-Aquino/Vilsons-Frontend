import Detail from "../../../components/Detail"
import Button from "../../../components/Button";
import ProfilePicture from "../../../components/ProfilePicture";
import useGetData from "../../../hooks/useGetData";
import Loading from "../../../components/Loading";
import formatDate from "../../../utils/formatDate";
import ErrorModal from "../../../components/ErrorModal";
import { useState } from "react";
import API_URL from "../../../constants/API_URL";
import type { FormData } from "../UsersModal";
import { useParams } from "react-router";
import UsersModal from "../UsersModal";
import { getBranches } from "../../../services/branchService";
import type { SelectionOptions } from "../../../components/Selection";
import UserPasswordModal from "./UserPasswordModal";
import { hasPermissions } from "../../../services/permissionService";
import userProfile from '../../../assets/user-profile.webp'

export default function UserDetailsSection() {
    const { id } = useParams();
    const { data, loading, error, closeError, reload } = useGetData(`/api/users/${id}`)
    const { data: roleData, error: roleError, closeError: closeRoleError } = useGetData('api/roles')
    const branchOptions = [
        { value: '', label: 'All Branches' },
        ...(getBranches() || [])
    ];
    const [presetData, setPresetData] = useState<FormData>({ roles: [], branches: [] })
    const [selectedId, setSelectedId] = useState<string>('');
    const [showModal, setShowModal] = useState<string | null>(null)

    if (loading) return <Loading />;

    const userData = data?.data || {}
    const { fullName, username, email, phone, createdAt, roles, branches, image } = userData;

    const roleItems = roleData.data?.roles || [];
    const customRoleOptions = roleItems
        ?.filter((role: any) => role.isCustom)
        .map((role: any) => ({
            value: role.id,
            label: role.roleName,
            baseRoleName: role.baseRoleName
        })) as (SelectionOptions & { baseRoleName: string; })[];

    const handleEdit = async (item: any) => {
        setSelectedId(item.id);

        const roleIds = (item.roles || []).map((r: any) => r.id);
        const branchIds = (item.branches || []).map((b: any) => b.id);

        setPresetData({
            name: item.fullName,
            username: item.username,
            email: item.email,
            phone: item.phone,
            roles: roleIds,
            branches: branchIds,

            commission: item.commission * 100
        } as FormData);

        setShowModal("edit");
    };

    return (
        <>
            <article className="grid grid-cols-[1fr_3fr] gap-7">
                <section className="card w-full">
                    <div className="grid gap-6 justify-items-center">
                        <ProfilePicture src={image ? API_URL + '/images/' + image : userProfile}/>
                        <div className="grid gap-1 mb-1">
                            <p className="font-medium">{fullName}</p>
                            <p className="font-medium text-darker">@{username}</p>
                        </div>

                        <Detail label='Joined' value={formatDate(createdAt, 'date')} align="center" />
                    </div>
                </section>

                <section className="card w-full">
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h2 className="font-bold text-primary">Personal Information</h2>
                            <p className="text-dark">Update your personal details and contact information</p>
                        </div>

                        <Button
                            label="Edit Information"
                            variant="outline"
                            size="mini"
                            onClick={() => handleEdit(userData)}
                        />
                    </div>
                    <div className="grid gap-5 grid-cols-2">
                        <Detail label='Full Name' value={fullName} />
                        <Detail label='Username' value={username} />
                        <Detail label='Email Address' value={email} />
                        <Detail label='Phone Number' value={phone} />
                        <Detail label='Roles'
                            value={
                                <div className="flex gap-3">
                                    {
                                        roles && (roles as (Record<string, any>)[]).map((role, i) => (
                                            <div className="font-medium px-2 py-1 bg-gray rounded-[8px]" key={i}>
                                                {role.roleName}
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        />

                        {(branches && (branches as (Record<string, any>)[]).length > 0) &&
                            <Detail label='Branches'
                                value={
                                    <div className="flex gap-3">
                                        {
                                            branches && (branches as (Record<string, any>)[]).map((branch, i) => (
                                                <div className="font-medium px-2 py-1 bg-gray rounded-[8px]" key={i}>
                                                    {branch.branchName}
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            />
                        }
                    </div>
                </section>
            </article >

            {hasPermissions(['change_user_password']) &&
                <section className="card w-full">
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h2 className="font-bold text-primary">Security Settings</h2>
                            <p className="text-dark">Update your security password</p>
                        </div>

                        <Button
                            label="Change Password"
                            variant="outline"
                            size="mini"
                            onClick={() => setShowModal("password")}
                        />
                    </div>

                    <Detail label='Password' value={'********'} />
                </section>}

            {/* {showModal === "info" && <MyInfoModal setShowModal={setShowModal} onSuccess={reload} presetData={presetData} />} */}
            {/* {showModal === "password" && <MyPasswordModal setShowModal={setShowModal} />} */}

            {error ? <ErrorModal error={error!} closeError={closeError} /> :
                <>
                    {showModal === "edit" && <UsersModal branchOptions={branchOptions} roleOptions={customRoleOptions} setShowModal={setShowModal} onSuccess={reload} action={showModal} id={selectedId} presetData={presetData} />}

                    {showModal === "password" && <UserPasswordModal userId={id ?? ""} setShowModal={setShowModal} />}
                </>
            }




        </>
    )
}