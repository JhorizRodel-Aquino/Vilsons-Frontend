import { useState } from 'react';
import type { ReactNode } from "react";
import SidebarNav from "./SidebarLink"

type SidebarGroupProps = {
    label: string;
    iconName?: string;
    depth: number;
    children: ReactNode;
}

export default function SidebarGroup({ label, iconName, depth, children }: SidebarGroupProps) {
    const [expanded, setExpanded] = useState(true);
    return (
        <>
            <button className='w-full' onClick={() => setExpanded(!expanded)}>
                <SidebarNav
                    label={label}
                    iconName={iconName}
                    depth={depth}
                    isGroup={true}
                    expanded={expanded}
                />
            </button>
            
            <ul className={`overflow-hidden h-auto duration-200 ${expanded ? 'max-h-[100rem]' : 'max-h-0'}`}>
                {children}
            </ul>
        </>
    )
}