import ContractorDetailsContent from "./ContractorDetailsContent";
import PageContent from "../../../../components/PageContent";
import ProfilePicture from "../../../../components/ProfilePicture";
import PageHeading from "../../../../components/PageHeading";

export default function ContractorDetailsPage() {
    return (
        <>
            <div className="w-full flex gap-6 items-center mb-[34px]">
                <ProfilePicture src={'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/529819592_4109090602702882_4132962317081700445_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHfRl_qoJwdRP_irK96jqnuAta_n-ufnukC1r-f65-e6VshsXUfCqOYev0wvOCXEm5HjBSkg9GBvW3E3OjLOMyJ&_nc_ohc=0_uk6MYVS74Q7kNvwGVmOoi&_nc_oc=Adk1feFrhkf_AUYu-qQGpy2nnZvvisoshKeap1U1PjQVX8ayNb0D8VyBvHeSPCIT5mo&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=y1RMTYg--II374jcLo2mQw&oh=00_AfZg49ejlAp9iyNbaLvgRxZDeXJ2MdBfBKo1-IxhRrJCiw&oe=68DDBCAC'} />
                <div className="">
                    <PageHeading title={'Jhoriz Rodel'} />
                    <p className="font-medium text-darker -mt-[30px]">@jrfainc</p>
                </div>
            </div>


            <PageContent scroll={false}>
                <ContractorDetailsContent />
            </PageContent>
        </>
    )
}