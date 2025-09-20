import sprite from '../assets/sprite.svg'

type IconProps = {
    name: string,
    size?: number,  // pixels
    color?: string,
    className?: string
}

function Icon({ name, size = 25, color = 'darkest', className }: IconProps) {
    return (
        <svg className={`icon ${`text-${color}`} ${className || ''}`} style={{ width: `${size}px`, height: `${size}px` }}>
            <use xlinkHref={`${sprite}#${name}`}></use>
        </svg>
    )
}

export default Icon;