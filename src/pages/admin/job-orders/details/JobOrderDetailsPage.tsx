import Sidebar from "../../../../components/sidebar/Sidebar";
import Header from "../../../../components/Header";
import ContentLayout from "../../../../components/ContentLayout";
import Main from "../../../../components/Main";
import AppLayout from "../../../../components/AppLayout";
import CustomerDetailsSection from "./JobOrderDetailsSection";
import PageContent from "../../../../components/PageContent";
import PageHeading from "../../../../components/PageHeading";

export default function CustomerDetailsPage() {
    return (

        <>
       

            <PageContent>
                <CustomerDetailsSection />
            </PageContent>
        </>

    )
}