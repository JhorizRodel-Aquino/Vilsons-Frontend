type PageTabItemProps = {
    label: string;
    className: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function PageTabItem({ label, className, onClick }: PageTabItemProps) {
    return (
        <button className={`cursor-pointer ${className}`} onClick={onClick}>
            {label.toLocaleUpperCase()}
        </button>
    )
}