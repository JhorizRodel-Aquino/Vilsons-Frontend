import type { ReactNode } from "react";

export default function ContentLayout({ children }: {children: ReactNode}) {
    return (
        <div className='bg-light-gray flex-1 flex flex-col'>
            {children}
        </div>
    )
}