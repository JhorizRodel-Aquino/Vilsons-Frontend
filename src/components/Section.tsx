import type { ReactNode } from "react";

export default function Section({ children, className }: {children: ReactNode, className?: string}) {
    return (
        <section {...{className}}>
            {children}
        </section>
    )
}

Section.Card = function Group({ children, className = '' }: {children: ReactNode, className?: string}) {
    return (
        <section className={`border-all rounded-[15px] bg-light gap-5 p-5 ${className}`}>
            {children}
        </section>
    )
}