import type { ReactNode } from "react";

export default function PageContent({ children, useCard = false, scroll = true }: {children: ReactNode, useCard?: boolean, scroll?: boolean}) {
    return (
        <article className={`grid gap-5 ${(useCard || !scroll) && 'overflow-y-hidden min-h-[500px]'} content-start`}>
            {useCard 
                ?
                    <div className="grid gap-5 card overflow-y-hidden">
                        {children}
                    </div>
                : 
                    <>{children}</>
            }
            
        </article>
    )
}

