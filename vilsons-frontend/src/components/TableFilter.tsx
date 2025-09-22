import type { ReactNode } from "react";

export default function TableFilter({ children }: {children: ReactNode}) {
    return (
        <div className="flex flex-wrap gap-y-2 justify-between items-center">
            {children}
        </div>
    )
}

TableFilter.Group = function Group({ children }: {children: ReactNode}) {
    return (
        <div className="flex flex-col md:flex-row gap-y-2 gap-x-7 justify-between items-start">
            {children}
        </div>
    )
}