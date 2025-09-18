import Icon from '../../../components/Icon';
import { statusItems } from '../../../config/statusConfig';
import type { Status } from '../../../config/statusConfig';

type JobOrderCardProps = {
    status: Status,
    value: number,
}

function JobOrderCard({ status, value }: JobOrderCardProps) {
    return (
        <div className={`flex items-center rounded-[15px] bg-light border-[1px] border-border border-l-[6px] p-[15px] gap-3`} 
            style={{borderLeftColor: `var(--color-${statusItems[status].color})`}}
        >
            <div className={`rounded-[8px] p-2`} 
                style={{backgroundColor: `var(--color-light-${statusItems[status].color})`, 
                color: `var(--color-${statusItems[status].color})`}}
            >
            <Icon iconFilename={statusItems[status].iconFilename} /></div>
            <div>
                <p className='text-2xl font-medium mb-1'>{value}</p>
                <h3 className='text-base'>{statusItems[status].label}</h3>
                <small className='text-xs text-dark'>{statusItems[status].desc}</small>
            </div>
        </div>
    )


}


export default JobOrderCard;