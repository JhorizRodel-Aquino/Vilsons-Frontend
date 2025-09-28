import type { ReactNode } from "react";

export default function Info({ children }: {children: ReactNode}) {
    return (
        <div className="grid grid-flow-col justify-between items-center">
            {children}
        </div>
    )
}