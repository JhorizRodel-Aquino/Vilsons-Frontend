import { useState } from 'react';
import Icon from "../../../components/Icon"
import type { Children } from "./FinanceCard"

function FinanceCardChild({ child, depth = 0 }: { child: Children, depth: number }) {
     const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className='flex items-center gap-2' style={{paddingLeft: `${depth * 10}px`}} onClick={() => setExpanded(!expanded)}>
        {child.children && child.children.length > 0 && <Icon iconFilename='chev-right' size={15} />}
        <p className='flex-1'>{child.label}</p>
        <p>{child.value}</p>
      </div>
      {child.children && child.children.length > 0 && (
        <div className={`text-xs overflow-hidden h-auto duration-300 ${expanded ? 'max-h-full' : 'max-h-0'}`}>
          {child.children.map((c, i) => (
            <FinanceCardChild key={i} child={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  )
}

export default FinanceCardChild