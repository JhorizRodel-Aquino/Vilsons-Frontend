import Icon from '../Icon';

type SidebarLinkProps = {
    label: string,
    iconName?: string,
    depth: number,
    isGroup?: boolean,
    isSelected?: boolean
    expanded?: boolean
}

function SidebarLink({ label, iconName, isGroup=false, depth, isSelected=false, expanded=false }: SidebarLinkProps) {
    const leftSpace = 35 + 10;  // icon size: 35px, gap: 10px;
    const paddingLeft = leftSpace * depth + 10;  // px: 10px
    const baseClasses = `
        flex items-center gap-[10px] rounded-[10px] h-[47px] px-[10px]
        ${!isGroup && isSelected ? 'bg-light-primary text-primary' : 'bg-transparent text-darker'}
    `;

    return (
        <div className={baseClasses} style={{ paddingLeft }} >
            {iconName && <Icon name={iconName} size={35} />}
            <p className='text-base font-semibold flex-1 text-start'>
                {label}
            </p>
            {isGroup && <Icon name='chev-right' className={`duration-200 ${isGroup && expanded ? 'rotate-90' : 'rotate-0'}`} />}
        </div>
    )
}

export default SidebarLink;