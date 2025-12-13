import Detail from "../../components/Detail"
import Button from "../../components/Button";
import ProfilePicture from "../../components/ProfilePicture";
import useGetData from "../../hooks/useGetData";
import Loading from "../../components/Loading";
import formatDate from "../../utils/formatDate";
import ErrorModal from "../../components/ErrorModal";
import { useState } from "react";
import type { FormData } from "./MyInfoModal";
import MyInfoModal from "./MyInfoModal";
import MyPasswordModal from "./MyPasswordModal";
import API_URL from "../../constants/API_URL";
import userProfile from '../../assets/user-profile.webp'
import { hasPermissions } from "../../services/permissionService";

export default function MyProfileSection() {
    const [showModal, setShowModal] = useState<'info' | 'password' | null>(null)
    const [presetData, setPresetData] = useState<FormData>({ name: "", email: "", phone: undefined });
    const { data, loading, error, closeError, reload } = useGetData('/api/me')

    if (loading) return <Loading />;

    const { fullName, username, email, phone, createdAt, roles, branches, image } = data?.data || {};

    return (
        <>
            <article className="grid grid-cols-[1fr_3fr] gap-7">
                <section className="card w-full">
                    <div className="grid gap-6 justify-items-center">
                        <ProfilePicture src={image ? API_URL + '/images/' + image : userProfile} />
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

                        {hasPermissions(['edit_own_profile_details']) &&
                            <Button
                                label="Edit Information"
                                variant="outline"
                                size="mini"
                                onClick={() => {
                                    setPresetData({ name: fullName, email, phone })
                                    setShowModal("info")
                                }}
                            />}
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

                        {/* <Detail label='Description' value={'Lorem ipsum dolor'} className="col-span-full" /> */}
                    </div>
                </section>
            </article >

            {hasPermissions(['edit_own_password']) &&
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

            {showModal === "info" && <MyInfoModal setShowModal={setShowModal} onSuccess={reload} presetData={presetData} />}
            {showModal === "password" && <MyPasswordModal setShowModal={setShowModal} />}

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}