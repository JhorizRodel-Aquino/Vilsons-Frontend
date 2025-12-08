import PageHeading from "../../components/PageHeading";
import PageContent from "../../components/PageContent";
import ApprovalLogsSection from "./ApprovalLogsSection";

export default function ApprovalLogsPage() {
    return (
        <>
            <PageHeading title={'Approval Logs'} />

            <PageContent useCard={true}>
                <ApprovalLogsSection />
            </PageContent>
        </>


    )
}