import type { ReactNode } from "react";

export default function PageContent({ children }: {children: ReactNode}) {
    return (
        <div className="flex flex-col rounded-[15px] bg-light gap-5 p-5 border-all overflow-y-hidden min-h-[500px]">
            {children}
        </div>
    )
}