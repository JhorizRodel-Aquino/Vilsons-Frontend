import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import RevenueAndProfitContent from "./RevenueAndProfitContent"

export default function RevenueAndProfitPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Revenue and Profit'} />
                   
                    <PageContent useCard={true}>
                        <RevenueAndProfitContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}