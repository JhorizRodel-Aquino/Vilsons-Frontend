import { useState } from 'react'
import Button from '../components/Button'
import Field from '../components/Field'
import MessageModal from '../components/MessageModal'
import useAuth from '../hooks/useAuth'

export default function LoginPage() {
 
    const [showMessageModal, setShowMessageModal] = useState(false)
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const { handleLogin, loading, error } = useAuth();

    const onSubmit = async () => {
        try {
            await handleLogin(loginData);
        } catch (err: any) {
            setShowMessageModal(true);
        }
    };

    return (
        <>
            <div className='h-dvh flex items-center'>
                <img src="./login.png" alt="Login Picture" className='h-full w-[65dvw] object-cover' />
                <div className='flex-1'>
                    <div className='grid gap-[40px] w-[50%] max-w-7xl mx-auto'>
                        <img src="./logo.webp" alt="" className='mb-[10px] justify-self-center' />
                        <div className='grid gap-[20px]'>
                            <Field.Text id='username' label='Username' value={loginData.username} onChange={(e) => { setLoginData(prev => ({ ...prev, username: e.target.value })) }} onKeyDown={onSubmit} autoComplete="username" />
                            <Field.Password id='password' label='Password' value={loginData.password} onChange={(e) => { setLoginData(prev => ({ ...prev, password: e.target.value })) }} onKeyDown={onSubmit} autoComplete="current-password" />
                        </div>
                        <Button label={loading ? 'Logging in...' : `Login`} disabled={loading} onClick={onSubmit} />
                    </div>
                </div>
            </div>

            {showMessageModal && <MessageModal title='Login Failed' message={error!} setShowModal={setShowMessageModal}/>}
        </>

    )
}