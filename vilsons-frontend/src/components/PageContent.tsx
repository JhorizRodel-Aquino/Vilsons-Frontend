import type { ReactNode } from "react";

export default function PageContent({ children }: {children: ReactNode}) {
    return (
        <div className="main-wrapper border-all">
            {children}
        </div>
    )
}