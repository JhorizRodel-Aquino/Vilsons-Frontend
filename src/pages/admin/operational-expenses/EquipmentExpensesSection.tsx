import SectionHeading from "../../../components/SectionHeading"
import Details from "../../../components/Details"
import Button from "../../../components/Button";
import EquipmentExpensesTable from "./EquipmentExpensesTable";


export default function EquipmentExpensesSection() {
    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Equipment Expenses'} modifiedDate="Aug 9, 2025" />
                <Button label={'Add Equipment'} onClick={() => console.log('clicked')} variant="primary" />
            </SectionHeading>

            <EquipmentExpensesTable />
        </>
    )
}