import { statusItems } from '../../../config/jobOrderStatusConfig';
import type { Status } from '../../../config/jobOrderStatusConfig';

function JobOrderStatus({ status }: {status: Status}) {
    return (
        <div className='flex items-center gap-[10px]'>
            <span className='rounded-full w-2 h-2' style={{backgroundColor: `var(--color-${statusItems[status].color})`}}></span>
            <p className='text-xs'>{statusItems[status].label}</p>
        </div>
    )
}

export default JobOrderStatus;