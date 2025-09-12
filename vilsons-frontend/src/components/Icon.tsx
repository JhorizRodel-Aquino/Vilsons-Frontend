import sprite from '../assets/sprite.svg'

type IconProps = {
    iconFilename: string,
    size?: number,  // pixels
    color?: string,
    className?: string
}

function Icon({ iconFilename, size = 25, color = 'darkest', className }: IconProps) {
    return (
        <svg className={`icon ${`text-${color}`} ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
            <use xlinkHref={`${sprite}#${iconFilename}`}></use>
        </svg>
    )
}

export default Icon;