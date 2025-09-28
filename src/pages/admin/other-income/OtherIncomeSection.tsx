
import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import OtherIncomeTable from "./OtherIncomeTable";


export default function OtherIncomeSection() {

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Other Income'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Other Income'} onClick={() => console.log('clicked')} variant="primary" />
            </SectionHeading>

            <OtherIncomeTable />
        </> 
    )
}