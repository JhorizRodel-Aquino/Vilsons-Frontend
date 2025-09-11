import Icon from './Icon';

function Header() {
    return (
        <header className='py-3 px-6 bg-blue-100 border-b'>
            <div className='grid grid-flow-col justify-between text-darker'>
                <div className='flex gap-[10px]'>
                    <Icon iconFilename='menu' />
                    <Icon iconFilename='chev-left' />
                    <Icon iconFilename='chev-right' />
                </div>

                <div className='flex gap-[10px]'>
                    <Icon iconFilename='bell' />
                    <Icon iconFilename='user' />
                </div>
            </div>
        </header>
    )
}

export default Header;