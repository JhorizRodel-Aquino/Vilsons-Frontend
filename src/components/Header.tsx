import useLogout from '../hooks/useLogout';
import Icon from './Icon';

function Header() {
    const { handleLogout, loading, error } = useLogout()
    return (
        <header className='bg-light py-3 px-6 border-b z-30'>
            <div className='grid grid-flow-col justify-between text-darker'>
                <div className='flex gap-[10px]'>
                    <Icon name='menu' />
                    <Icon name='chev-left' />
                    <Icon name='chev-right' />
                </div>

                <div className='flex gap-[10px]'>
                    <Icon name='bell' />
                    <button onClick={handleLogout}><Icon name='user' /></button>
                </div>
            </div>
        </header>
    )
}

export default Header;