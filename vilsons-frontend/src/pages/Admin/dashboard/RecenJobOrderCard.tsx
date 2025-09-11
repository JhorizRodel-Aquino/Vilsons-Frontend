import JobOrderStatus from './JobOrderStatus';
import type { Status } from '../../../config/jobOrderStatusConfig';

type RecentJobOrderCardProps = {
    jobNumber: string,
    status: Status
    plate: string,
    contractor: string,
    datetime: string
}

function RecentJobOrderCard({ jobNumber, status, plate, contractor, datetime }: RecentJobOrderCardProps) {
    return (
        <div className='p-5 bg-light rounded-[10px] border-all'>
            <div className='flex flex-wrap justify-between items-center gap-y-1 mb-[13px]'>
                <p className='text-sm font-semibold'>{jobNumber}</p>
                <JobOrderStatus status={status} />
            </div>
            <div className='grid gap-1 text-xs text-darker'>
                <p >Plate: {plate}</p>
                <p >Contractor: {contractor}</p>
                <p >Datetime: {datetime}</p>
            </div>

        </div>
    )
}

export default RecentJobOrderCard;