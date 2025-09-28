import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import OverheadExpensesSection from "./OverheadExpensesSection";

export default function OverheadExpensesPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Overhead Expenses'} />
                   
                    <PageContent useCard={true}>
                        <OverheadExpensesSection />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}