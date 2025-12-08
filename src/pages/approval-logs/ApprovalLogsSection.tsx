import SectionHeading from "../../components/SectionHeading"
import ApprovalLogsTable from "./ApprovalLogsTable"

export default function ApprovalLogsContent() {


    return (
        <>
            <SectionHeading>
                <div>
                    <h2 className="text-darker font-bold">All Approvals</h2>
                    <p className="text-dark font-medium">Last Updated: Aug 9, 2025</p>
                </div>
            </SectionHeading>

            <ApprovalLogsTable />
        </>
    )
}