import { useState } from 'react';
import Icon from "../../../components/Icon"
import type { Children } from "./FinanceCard"

function FinanceCardChild({ child, depth = 0, expand }: { child: Children, depth: number, expand: boolean }) {
  const [expanded, setExpanded] = useState(expand);
  const hasChildren = child.children && child.children?.length > 0;

  return (
    <div className={`text-sm overflow-hidden h-auto duration-200 ${expand ? 'max-h-[100rem]' : 'max-h-0'}`}>
      <div className='flex items-center gap-2 mt-1' style={{paddingLeft: `${depth * 10}px`}} >
        <span className={`flex flex-1 items-center ${hasChildren && 'cursor-pointer'}`} {...(hasChildren ? { onClick: () => setExpanded(!expanded) } : {})} >
          {hasChildren && <Icon name='chev-right' size={18} className={`-mx-[2px] duration-200 ${expanded ? 'rotate-90' : 'rotate-0'}`} />}
          <p className='flex-1'>{child.label}</p>
        </span>
        <p>{child.value}</p>
      </div>
      
      {hasChildren && 
          child.children?.map((c, i) => (
            <FinanceCardChild key={i} child={c} depth={depth + 1} expand={expanded} />
          ))
      }
    </div>
  )
}

export default FinanceCardChild