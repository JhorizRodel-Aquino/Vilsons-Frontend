import type { ReactNode } from "react";

export default function SidebarItem({ children }: {children: ReactNode}) {
    return (
        <li>
            {children}
        </li>
    )
}