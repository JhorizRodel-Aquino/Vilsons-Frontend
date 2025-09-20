import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import OtherIncomeContent from "./OtherIncomeContent";

export default function OtherIncomePage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Other Income'} />
                   
                    <PageContent>
                        <OtherIncomeContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}