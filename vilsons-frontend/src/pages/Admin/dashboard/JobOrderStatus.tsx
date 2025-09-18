import { statusItems } from '../../../config/statusConfig';
import type { Status } from '../../../config/statusConfig';

function JobOrderStatus({ status }: {status: Status}) {
    return (
        <div className='flex items-center gap-[10px]'>
            <span className='rounded-full w-2 h-2' style={{backgroundColor: `var(--color-${statusItems[status].color})`}}></span>
            <p className='text-xs'>{statusItems[status].label}</p>
        </div>
    )
}

export default JobOrderStatus;