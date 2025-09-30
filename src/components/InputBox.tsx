import type { ReactNode } from "react";

export default function InputBox({ children, className }: {children: ReactNode, className?: string}) {
    return (
        <div className={`input-container ${className || ''}`}>
            {children}
        </div>
    )
}