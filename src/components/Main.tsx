import type { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
    return (
        <main className='flex-1 h-full overflow-hidden relative'>
            <div className='py-6 h-full overflow-y-auto thin-scrollbar'>
                <div className='mx-auto px-6 max-w-[2000px] h-full flex flex-col'>
                    {children}
                </div>
            </div>
        </main>
    )
}