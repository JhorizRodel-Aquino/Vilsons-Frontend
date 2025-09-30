import PageHeading from "../../../components/PageHeading";
import PageContent from "../../../components/PageContent";
import ActivityLogsSection from "./ActivityLogsSection";

export default function ActivityLogsPage() {
    return (
        <>
            <PageHeading title={'Activity Logs'} />

            <PageContent useCard={true}>
                <ActivityLogsSection />
            </PageContent>
        </>


    )
}