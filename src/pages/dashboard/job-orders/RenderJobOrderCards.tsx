import JobOrderCard from "./JobOrderCard";

export default function RenderJobOrderCards({data}: {data: any}) {
    return (
        <>
            <JobOrderCard status={'pending'} value={data?.pending} />
            <JobOrderCard status={'ongoing'} value={data?.ongoing} />
            <JobOrderCard status={'completed'} value={data?.completed} />
            <JobOrderCard status={'forRelease'} value={data?.forRelease} />
        </>
    );
}


