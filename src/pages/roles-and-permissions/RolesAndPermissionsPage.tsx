import PageHeading from "../../components/PageHeading";
import PageContent from "../../components/PageContent";
import RolesAndPermissionsSection from "./RolesAndPermissionsSection";

export default function RolesAndPermissionsPage({reloadPermissions} : {reloadPermissions: () => void}) {
    return (
        <>
            <PageHeading title={'Roles And Permissions'} />

            <PageContent useCard={true}>
                <RolesAndPermissionsSection reloadPermissions={reloadPermissions} />
            </PageContent>
        </>
    )
}