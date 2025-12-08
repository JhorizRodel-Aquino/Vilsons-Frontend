import CustomerDetailsSection from "./CustomerDetailsSection";
import PageContent from "../../../components/PageContent";

export default function CustomerDetailsPage() {
    return (
        <>
            <PageContent scroll={false}>
                <CustomerDetailsSection/>
            </PageContent>            
        </>
    )
}