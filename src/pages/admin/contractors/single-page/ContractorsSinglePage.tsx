import Sidebar from "../../../../components/sidebar/Sidebar";
import Header from "../../../../components/Header";
import ContentLayout from "../../../../components/ContentLayout";
import Main from "../../../../components/Main";
import AppLayout from "../../../../components/AppLayout";
import ContractorsSinglePageContent from "./ContractorsSinglePageContent";
import PageContent from "../../../../components/PageContent";
import ProfilePicture from "../../../../components/ProfilePicture";
import Detail from "../../../../components/Detail";
import PageHeading from "../../../../components/PageHeading";
import { useState } from "react";
import PageTabs from "../../../../components/PageTabs";

export default function ContractorSinglePage() {
    const tabs = ['orders', 'trucks'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <div className="w-full flex gap-6 items-center mb-[34px]">
                        <ProfilePicture src={'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/528354745_24070621945893240_9182496977046137158_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHJvdVDtCcKwWRCu8eX8bJoV-_mPsh8c6xX7-Y-yHxzrIi8lTCPeWIF_BgzNYzQwOMeJX6XaGcIJXxUXhTOvW2o&_nc_ohc=ftAtdSbcZtMQ7kNvwGp4xqT&_nc_oc=Adm4SIyFzayWnKp_d12yZaiYleJbF1to5p3edjEmbqIJi6BJY2K4mFRiCf7OU3irq3c&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=hsmR9aze6I0CeiMzt1tSgA&oh=00_AfaUph50Z8qUHkuqWB6-nR2dt0JhM4LO8EVjay0Z1AFEyQ&oe=68DC4E69'} />
                        <div className="">
                            <PageHeading title={'Jhoriz Rodel'} />
                            <p className="font-medium text-darker -mt-[30px]">@jrfainc</p>
                        </div>
                    </div>

                    <PageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    

                    <PageContent scroll={false}>
                        <ContractorsSinglePageContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}