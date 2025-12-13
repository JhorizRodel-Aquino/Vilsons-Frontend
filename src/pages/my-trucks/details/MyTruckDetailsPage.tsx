import MyTruckDetailsSection from "./MyTruckDetailsSection";
import PageContent from "../../../components/PageContent";


export default function TruckDetailsPage() {
    return (
        <>
            <PageContent scroll={false}>
                <MyTruckDetailsSection/>
            </PageContent>
        </>
    )
}