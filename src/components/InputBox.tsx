import type { ReactNode } from "react";

export default function InputBox({ children, className }: {children: ReactNode, className?: string}) {
    return (
        <div className={`filter-container ${className || ''}`}>
            {children}
        </div>
    )
}