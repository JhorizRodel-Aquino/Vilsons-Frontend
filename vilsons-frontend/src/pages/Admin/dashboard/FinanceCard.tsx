import { useState } from 'react';
import Icon from '../../../components/Icon';
import FinanceCardChild from './FinanceCardChild';

export type Children = {
    label: string,
    value: number
    children?: Children[]
}

type FinanceCardProps = {
    label: string,
    value: number,
    delta: number
    children?: Children[]
}

function FinanceCard({ label, value, delta, children }: FinanceCardProps) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = children && children.length > 0;

    return (
        <div className='rounded-[15px] border-all p-5'>
            <h3 className='flex justify-between text-sm mb-5'>
                {hasChildren && <button onClick={() => setExpanded(!expanded)}>
                    <Icon iconFilename={'chev-right'} className={`-mx-[3px] duration-200 ${expanded ? 'rotate-90' : 'rotate-0'}`} /></button>}
                {label}
                <Icon iconFilename={'peso'} />
            </h3>

            <p className='text-3xl font-medium'>{value}</p>

            <small className='text-xs text-dark'>
                {
                    <span className={`${delta < 0 ? 'text-r ed' : 'text-green'}`}>
                        {delta > 0 ? `+${delta}` : delta}%
                    </span>
                } from last month
            </small>

            
            {children && children.length > 1 &&
                children.map((c, i) => (
                    <FinanceCardChild key={i} child={c} depth={0} expand={expanded} />
                ))
            }
            

        </div>
    )


}


export default FinanceCard;