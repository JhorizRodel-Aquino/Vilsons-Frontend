import Sidebar from "../../../components/sidebar/Sidebar";
import Header from "../../../components/Header";
import PageHeading from "../../../components/PageHeading";
import ContentLayout from "../../../components/ContentLayout";
import Main from "../../../components/Main";
import PageContent from "../../../components/PageContent";
import AppLayout from "../../../components/AppLayout";
import TrucksSection from "./TrucksSection";

export default function TrucksPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <PageHeading title={'Trucks'} />
                   
                    <PageContent useCard={true}>
                        <TrucksSection />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}