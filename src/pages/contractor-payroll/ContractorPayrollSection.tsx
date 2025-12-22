import SectionHeading from "../../components/SectionHeading"
import Details from "../../components/Details"
import ContractorPayrollTable from "./ContractorPayrollTable";
import { useState } from "react";
import formatPesoFromCents from "../../utils/formatPesoFromCents";
import formatDate from "../../utils/formatDate";

export default function ContractorPayrollSection() {
    const [balance, setBalance] = useState(0)
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Payroll'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
                <span className="font-bold text-primary text-lg">Balance: {formatPesoFromCents(balance)}</span>
            </SectionHeading>

            <ContractorPayrollTable setBalance={setBalance} setLastUpdated={setLastUpdated} />
        </>
    )
}