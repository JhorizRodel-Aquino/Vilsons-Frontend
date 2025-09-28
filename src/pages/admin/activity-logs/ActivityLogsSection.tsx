import SectionHeading from "../../../components/SectionHeading"
import ActivityLogsTable from "./ActivityLogsTable"

export default function ActivityLogsContent() {


    return (
        <>
            <SectionHeading>
                <div>
                    <h2 className="text-darker font-bold">All Activities</h2>
                    <p className="text-dark font-medium">Last Updated: Aug 9, 2025</p>
                </div>
            </SectionHeading>

            <ActivityLogsTable />
        </>
    )
}