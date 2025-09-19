import type { ReactNode } from "react";

export default function AppLayout({ children }: {children: ReactNode}) {
    return (
        <div className='flex h-dvh w-dvw'>
            {children}
        </div>
    )
}