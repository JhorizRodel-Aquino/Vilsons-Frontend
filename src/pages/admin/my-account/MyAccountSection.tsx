import Detail from "../../../components/Detail"
import Button from "../../../components/Button";
import ProfilePicture from "../../../components/ProfilePicture";
import useGetData from "../../../hooks/useGetData";
import Loading from "../../../components/Loading";
import formatDate from "../../../utils/formatDate";
import ErrorModal from "../../../components/ErrorModal";

export default function MyProfileSection() {
    const { data, loading, error, closeError, refetch, reload } = useGetData('/api/me')
    if (loading) return <Loading />;

    const { fullName, username, email, phone, createdAt, roles } = data?.data || {};



    return (
        <>
            <article  className="grid grid-cols-[1fr_3fr] gap-7">
                <section className="card w-full">
                    <div className="grid gap-6 justify-items-center">
                        <ProfilePicture src={'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/528354745_24070621945893240_9182496977046137158_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHJvdVDtCcKwWRCu8eX8bJoV-_mPsh8c6xX7-Y-yHxzrIi8lTCPeWIF_BgzNYzQwOMeJX6XaGcIJXxUXhTOvW2o&_nc_ohc=ftAtdSbcZtMQ7kNvwGp4xqT&_nc_oc=Adm4SIyFzayWnKp_d12yZaiYleJbF1to5p3edjEmbqIJi6BJY2K4mFRiCf7OU3irq3c&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=hsmR9aze6I0CeiMzt1tSgA&oh=00_AfaUph50Z8qUHkuqWB6-nR2dt0JhM4LO8EVjay0Z1AFEyQ&oe=68DC4E69'} />
                        <div className="grid gap-1">
                            <p className="font-medium">{fullName}</p>
                            <p className="font-medium text-darker">{username}</p>
                        </div>
                        <span className="font-medium px-2 py-1 bg-gray rounded-[8px] text-sm">
                            {
                                roles && (roles as (Record<string, any>)[]).map((role, i) => (
                                    <div className="capitalize" key={i}>
                                        {role.roleName}{i < roles.length - 1 && ","}
                                    </div>
                                ))
                            }
                        </span>
                        <Detail label='Joined' value={formatDate(createdAt, 'date')} align="center" />
                    </div>
                </section>

                <section className="card w-full">
                    <div className="flex justify-between items-center mb-5">
                        <div>
                            <h2 className="font-bold text-primary">Personal Information</h2>
                            <p className="text-dark">Update your personal details and contact information</p>
                        </div>
                        
                        <Button label="Edit Information" variant="outline" size="mini" onClick={() => console.log()}/>
                    </div>
                    <div className="grid gap-5 grid-cols-2">
                        <Detail label='Full Name' value={fullName} />
                        <Detail label='Username' value={username} />
                        <Detail label='Email Address' value={email} />
                        <Detail label='Phone Number' value={phone} />
                        {/* <Detail label='Description' value={'Lorem ipsum dolor'} className="col-span-full" /> */}
                    </div>
                </section>
            </article >

            <section className="card w-full">
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="font-bold text-primary">Security Settings</h2>
                        <p className="text-dark">Update your security password</p>
                    </div>
                    
                    <Button label="Change Password" variant="outline" size="mini" onClick={() => console.log()}/>
                </div>

                <Detail label='Password' value={'********'} />
            </section>

            {error && <ErrorModal error={error!} closeError={closeError} />}
        </>
    )
}