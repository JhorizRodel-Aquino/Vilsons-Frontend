import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import ContractorPayrollTable from "./ContractorPayrollTable";
import { useState } from "react";

export default function ContractorPayrollSection() {
    const [balance, setBalance] = useState(0)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Payroll'} modifiedDate="Aug 9, 2025" />
                <span>Balance: {balance}</span>
            </SectionHeading>

            <ContractorPayrollTable setBalance={setBalance} />
        </>
    )
}