import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import TransactionsContent from "./TransactionsContent";

export default function TransactionsPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Transactions'} />
                   
                    <PageContent>
                        <TransactionsContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}