import { useState } from 'react';
import useLogout from '../hooks/useLogout';
import ConfirmModal from './ConfirmModal';
import Icon from './Icon';

function Header({toggleSidebar}: {toggleSidebar: () => void}) {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const { handleLogout, loading, error } = useLogout()
    return (
        <>
            <header className='bg-light py-3 px-6 border-b z-30'>
                <div className='grid grid-flow-col justify-between text-darker'>
                    <div className='flex gap-[10px]'>
                        <button onClick={toggleSidebar}><Icon name='menu' /></button>
                        {/* <Icon name='chev-left' />
                        <Icon name='chev-right' /> */}
                    </div>

                    <div className='flex gap-[10px]'>
                        {/* <Icon name='bell' /> */}
                        <button className='cursor-pointer' onClick={() => setShowConfirmModal(true)}><Icon name='user' /></button>
                    </div>
                </div>
            </header>
            {showConfirmModal && 
            <ConfirmModal
                title="Confirm Logout"
                message="Are you sure you want to logout?"
                onClose={() => { setShowConfirmModal(false) }}
                onConfirm={handleLogout} red={true}
                disabledButtons={loading}
                onProgressLabel={loading ? 'Logging out...' : ''}
            />}
        </>

    )
}

export default Header;