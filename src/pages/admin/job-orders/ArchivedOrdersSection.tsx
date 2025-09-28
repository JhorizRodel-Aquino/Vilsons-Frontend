import SectionHeading from "../../../components/SectionHeading"
import ArchivedOrdersTable from "./ArchivedOrdersTable"

export default function JobOrdersActiveTabContent() {


    return (
        <>
            <SectionHeading>
                <div>
                    <h2 className="text-darker font-bold">All Archived Job Orders</h2>
                    <p className="text-dark font-medium">Last Updated: Aug 9, 2025</p>
                </div>
            </SectionHeading>

            <ArchivedOrdersTable />
        </>
    )
}