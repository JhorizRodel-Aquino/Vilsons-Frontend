import type { ReactNode } from "react";

export default function Main({ children }: {children: ReactNode}) {
    return (
        <main className='flex-1 h-full overflow-y-auto '>
            <div className='mx-auto p-6 max-w-[2000px] h-full overflow-y-auto flex flex-col'>
                {children}
            </div>
        </main>
    )
}