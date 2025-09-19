import Icon from '../Icon';

type SidebarItemProps = {
    label: string,
    iconFilename?: string,
    depth: number,
    isGroup?: boolean,
    isSelected?: boolean
}

function SidebarItem({ label, iconFilename, isGroup=false, depth, isSelected=false}: SidebarItemProps) {
    const leftSpace = 35 + 10;  // icon size: 35px, gap: 10px;
    const paddingLeft = leftSpace * depth + 10;  // px: 10px
    const baseClasses = `
        flex items-center gap-[10px] rounded-[10px] h-[47px] px-[10px]
        ${!isGroup && isSelected ? 'bg-light-primary text-primary' : 'bg-transparent text-darker'}
    `;

    return (
        <div className={baseClasses} style={{ paddingLeft }} >
            {iconFilename && <Icon iconFilename={iconFilename} size={35} />}
            <p className='text-base font-semibold flex-1 text-start'>
                {label}
            </p>
            {isGroup && <Icon iconFilename='chev-right' />}
        </div>
    )
}

export default SidebarItem;