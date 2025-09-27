import Sidebar from "../../../../components/sidebar/Sidebar";
import Header from "../../../../components/Header";
import ContentLayout from "../../../../components/ContentLayout";
import Main from "../../../../components/Main";
import AppLayout from "../../../../components/AppLayout";
import CustomerDetailsContent from "./JobOrderDetailsContent";
import PageContent from "../../../../components/PageContent";
import PageHeading from "../../../../components/PageHeading";

export default function CustomerDetailsPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'JO-25-233'} />

                    <PageContent>
                        <CustomerDetailsContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}