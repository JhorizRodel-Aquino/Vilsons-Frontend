import StatusIndicator from '../../../components/StatusIndicator';
import type { Status } from '../../../config/statusConfig';

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
            <div className='flex flex-wrap text-base justify-between items-center gap-y-1 mb-[13px]'>
                <p className='font-semibold'>{jobNumber}</p>
                <StatusIndicator status={status} />
            </div>
            <div className='grid gap-1 text-sm text-darker'>
                <p >Plate: {plate}</p>
                <p >Contractor: {contractor}</p>
                <p >Datetime: {datetime}</p>
            </div>

        </div>
    )
}

export default RecentJobOrderCard;