import { createContext, useState, type ReactNode } from "react";

export const BackdropContext = createContext<((show: boolean) => void) | null>(null);

export default function Main({ children }: {children: ReactNode}) {
    const [showBackdrop, setShowBackdrop] = useState(false)
    
    return (
        <BackdropContext.Provider value={setShowBackdrop}>
            <main className='flex-1 h-full overflow-hidden relative'>
                {showBackdrop && <div className="backdrop"></div>}

                <div className='mx-auto p-6 max-w-[2000px] h-full overflow-y-auto thin-scrollbar flex flex-col'>
                    {children}
                </div>
            </main>
        </BackdropContext.Provider>
    )
}