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
                    <Icon iconFilename={'chev-right'} /></button>}
                {label}
                <Icon iconFilename={'peso'} />
            </h3>

            <p className='text-3xl font-medium'>{value}</p>

            <small className='text-xs text-dark'>
                {
                    <span className={`${delta < 0 ? 'text-red' : 'text-green'}`}>
                        {delta > 0 ? `+${delta}` : delta}%
                    </span>
                } from last month
            </small>

            <div className={`text-xs overflow-hidden h-auto duration-300 ${expanded ? 'max-h-full' : 'max-h-0'}`}>
                {children && children.length > 1 &&
                    children.map((c, i) => (
                        <FinanceCardChild key={i} child={c} depth={0} />
                    ))
                }
            </div>

        </div>
    )


}


export default FinanceCard;