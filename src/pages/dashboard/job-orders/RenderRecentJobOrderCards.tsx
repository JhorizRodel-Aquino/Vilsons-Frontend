import formatDate from "../../../utils/formatDate";
import RecentJobOrderCard from "./RecenJobOrderCard";

export default function RenderRecentJobOrderCards({data}: {data: any}) {
    return (
        <>
        {data?.map((jobOrder: any, i: number) => (
            <RecentJobOrderCard
                key={i}
                jobNumber={jobOrder.jobOrderCode}
                status={jobOrder.status}
                plate={jobOrder.plateNumber}
                contractor={jobOrder.contractorName}
                datetime={formatDate(jobOrder.createdAt)}
            />
        ))}
        </>
    );
}