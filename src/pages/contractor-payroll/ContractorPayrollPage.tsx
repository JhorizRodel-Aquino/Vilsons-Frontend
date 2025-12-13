import PageHeading from "../../components/PageHeading";
import PageContent from "../../components/PageContent";
import ContractorPayrollSection from "./ContractorPayrollSection";

export default function ContractorPayrollPage() {
    return (
        <>
            <PageHeading title={'Payroll'} />

            <PageContent useCard={true}>
                <ContractorPayrollSection />
            </PageContent>
        </>
    )
}