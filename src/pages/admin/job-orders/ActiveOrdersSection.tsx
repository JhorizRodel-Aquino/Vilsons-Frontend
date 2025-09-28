import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button"
import ActiveOrdersTable from "./ActiveOrdersTable"

export default function JobOrdersActiveTabContent() {


    return (
        <>
            <SectionHeading>
                <div>
                    <h2 className="text-darker font-bold">All Archived Job Orders</h2>
                    <p className="text-dark font-medium">Last Updated: Aug 9, 2025</p>
                </div>
                <Button label={'Create Job Order'} onClick={() => console.log('clicked')} variant="primary" />
            </SectionHeading>

            <ActiveOrdersTable />
        </>
    )
}