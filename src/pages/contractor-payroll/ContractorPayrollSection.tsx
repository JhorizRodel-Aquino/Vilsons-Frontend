import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import ContractorPayrollTable from "./ContractorPayrollTable";
import { useState } from "react";
import formatPesoFromCents from "../../utils/formatPesoFromCents";

export default function ContractorPayrollSection() {
    const [balance, setBalance] = useState(0)

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Payroll'} modifiedDate="Aug 9, 2025" />
                <span className="font-bold text-primary text-lg">Balance: {formatPesoFromCents(balance)}</span>
            </SectionHeading>

            <ContractorPayrollTable setBalance={setBalance} />
        </>
    )
}