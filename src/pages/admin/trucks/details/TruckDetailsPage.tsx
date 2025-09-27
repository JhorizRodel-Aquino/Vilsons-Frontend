import Sidebar from "../../../../components/sidebar/Sidebar";
import Header from "../../../../components/Header";
import ContentLayout from "../../../../components/ContentLayout";
import Main from "../../../../components/Main";
import AppLayout from "../../../../components/AppLayout";
import TruckDetailsContent from "./TruckDetailsContent";
import PageContent from "../../../../components/PageContent";
import ProfilePicture from "../../../../components/ProfilePicture";
import PageHeading from "../../../../components/PageHeading";
import Detail from "../../../../components/Detail"

export default function TruckDetailsPage() {
    return (
        <AppLayout>
            <Sidebar />

            <ContentLayout>
                <Header />
                <Main>
                    <div className="w-full flex gap-6 items-center mb-[34px]">
                        <ProfilePicture src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgUk6Xk1c0YN5OhlaA7bOW0UGQfgIdlkArHQ&s'} />
                        <div className="">
                            <PageHeading title={'ZTT 795'} />
                            <div className="flex flex-wrap gap-x-10 gap-y-5 -mt-[20px]">
                                <Detail label='Make:' value={'Isuzu'} variant="adjacent" className="text-dark"/>
                                <Detail label='Model:' value={'Mirage'} variant="adjacent" className="text-dark"/>
                                <Detail label='Date Added:' value={'Aug 6, 2003'} variant="adjacent" className="text-dark"/>
                            </div>

                        </div>
                    </div>


                    <PageContent scroll={false}>
                        <TruckDetailsContent />
                    </PageContent>
                </Main>
            </ContentLayout>
        </AppLayout>
    )
}