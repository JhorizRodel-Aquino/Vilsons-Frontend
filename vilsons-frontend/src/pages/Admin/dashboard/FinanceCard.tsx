import { useState } from 'react';
import Icon from '../../../components/Icon';
import FinanceCardChild from './FinanceCardChild';
import formatPesoFromCents from '../../../utils/formatPesoFromCents';

export type Children = {
    label: string,
    value: number
    children?: Children[]
}

type FinanceCardProps = {
    label: string;
    iconName: string;
    value: number;
    delta: number;
    children?: Children[];
}

function FinanceCard({ label, iconName, value, delta, children }: FinanceCardProps) {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = children && children.length > 0;

    return (
        <div className='rounded-[15px] border-all p-5'>
            <div className='flex justify-between items-center text-base mb-5'>
                <span className={`flex flex-1 items-center ${hasChildren && 'cursor-pointer'}`} {...(hasChildren ? { onClick: () => setExpanded(!expanded) } : {})} >
                    {hasChildren && <Icon name={'chev-right'} className={`-mx-[2px] duration-200 ${expanded ? 'rotate-90' : 'rotate-0'}`} />}
                    <h3>{label}</h3>
                </span>
                <Icon name={iconName} />
            </div>

            <p className='text-3xl font-medium'>{formatPesoFromCents(value)}</p>

            <small className='text-sm text-dark'>
                {<span className={`${delta < 0 ? 'text-red' : 'text-green'}`}>
                    {delta > 0 ? `+${delta}` : delta}%
                </span>} 
                from last month
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