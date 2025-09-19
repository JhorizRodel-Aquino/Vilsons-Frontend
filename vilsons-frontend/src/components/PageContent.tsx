import type { ReactNode } from "react";

export default function PageContent({ children }: {children: ReactNode}) {
    return (
        <div className="grid rounded-[15px] bg-light gap-5 p-5 content-start border-all">
            {children}
        </div>
    )
}