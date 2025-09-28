import { useRef, useEffect, useState } from "react";

type PageTabsProps = {
    tabs: string[];
    activeTab: string;
    setActiveTab: Function;
};

export default function PageTabs({ tabs, activeTab, setActiveTab }: PageTabsProps) {
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

    useEffect(() => {
        const activeIndex = tabs.indexOf(activeTab);
        const activeButton = tabRefs.current[activeIndex];

        if (activeButton) {
           setUnderlineStyle({
                width: activeButton.offsetWidth,
                left: activeButton.offsetLeft,
            });
        }
    }, [activeTab])

    return (
        <nav className="relative ext-base text-darker">
            <ul className="flex gap-[10px] t"> 
                {tabs.map((tab, i) => (
                    <li key={i}>
                        <button
                            ref={(el: HTMLButtonElement | null) => { tabRefs.current[i] = el }}
                            className={`cursor-pointer capitalize ${activeTab === tab ? 'active font-bold' : ''}`}
                            onClick={() => {
                                if (activeTab === tab) return;
                                setActiveTab(tab)
                            }}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>
            <span 
                className={`absolute bottom-0 left-0 h-1 bg-primary rounded-full duration-200`}                 
                style={{
                    width: `${underlineStyle.width}px`,
                    left: `${underlineStyle.left}px`,
                }}
            ></span>
        </nav>
    )
}