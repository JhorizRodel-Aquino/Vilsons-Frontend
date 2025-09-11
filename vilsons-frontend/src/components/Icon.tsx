import sprite from '../assets/sprite.svg'

type IconProps = {
    iconFilename: String,
    size?: Number,  // pixels
    color?: String
}

function Icon({ iconFilename, size = 25, color = 'darkest' }: IconProps) {
    return (
        <svg className={`icon ${`text-${color}`}`} style={{ width: `${size}px`, height: `${size}px` }}>
            <use xlinkHref={`${sprite}#${iconFilename}`}></use>
        </svg>
    )
}

export default Icon;