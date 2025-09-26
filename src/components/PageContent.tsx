import type { ReactNode } from "react";

export default function PageContent({ children, useCard = false }: {children: ReactNode, useCard?: boolean}) {
    return (
        <article className={`grid gap-5 ${useCard && 'overflow-y-hidden min-h-[500px] items-start'}`}>
            {useCard 
                ?
                    <div className="grid gap-5 rounded-[15px] bg-light p-5 border-all overflow-y-hidden">
                        {children}
                    </div>
                : 
                    <>{children}</>
            }
            
        </article>
    )
}

