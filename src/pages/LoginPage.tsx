import { useState } from 'react'
import Button from '../components/Button'
import Field from '../components/Field'
import MessageModal from '../components/MessageModal'
import useAuth from '../hooks/useAuth'

export default function LoginPage() {
    const [showMessageModal, setShowMessageModal] = useState(false)
    const [message, setMessage] = useState("");
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const { handleLogin, loading } = useAuth();

    const onSubmit = async () => {
        if (!loginData.username || !loginData.password) {
            setMessage('Please enter your username and password.');
            setShowMessageModal(true);
            return;
        }  
        
        try {
            await handleLogin(loginData);
        } catch (err: any) {
            setMessage(err.message);
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
                            <Field.Text id='username' label='Username' value={loginData.username} onChange={(e) => { setLoginData(prev => ({ ...prev, username: e.target.value })) }} autoComplete="username" />
                            <Field.Text id='password' label='Password' value={loginData.password} onChange={(e) => { setLoginData(prev => ({ ...prev, password: e.target.value })) }} autoComplete="current-password" />
                        </div>
                        <Button label={loading ? 'Logging in...' : `Login`} disabled={loading} onClick={onSubmit} />
                    </div>
                </div>
            </div>

            {showMessageModal && <MessageModal title='Login Failed' message={message} setShowModal={setShowMessageModal}/>}
        </>

    )
}