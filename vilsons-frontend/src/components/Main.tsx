import type { ReactNode } from "react";

export default function Main({ children }: {children: ReactNode}) {
    return (
        <main className='main'>
            <div className='main-container'>
                {children}
            </div>
        </main>
    )
}