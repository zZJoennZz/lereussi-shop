import { useEffect, useState } from 'react'
import Meta from '@/components/Meta'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { authState } from '@/atoms'
import { useRouter } from 'next/router'
import { login } from '@/utilities'

function Login(): JSX.Element {
    const [errMsg, setErrMsg] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [isFrmLoading, setIsFrmLoading] = useState(false)
    const [authenticationState, setAuthenticationState] = useRecoilState(authState)
    const [loginFrm, setLoginFrm] = useState({
        'username': '',
        'password': ''
    })

    const router = useRouter()

    useEffect(() => {
        let isSub = true
        if (authenticationState && isSub) {
            router.push('/')
        } else {
            setIsLoaded(true)
        }
        return () => {
            isSub = false
        }
    }, [authenticationState, router])

    if (!isLoaded) return <div className="text-center">Loading...</div>
    
    async function performLogin(e: any) {
        setIsFrmLoading(true)
        e.preventDefault()
        let isSuccess: boolean = await login(loginFrm.username, loginFrm.password)
        
        if (isSuccess) router.push('/')
        else {
            setErrMsg('Cannot login using the login credentials.')
            setIsFrmLoading(false)
        }
    }

    function textOnChange(e: any) {
        setLoginFrm(prev => {
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    
    return (
        <>
            <Meta title='Login | Le REUSSI' />
            <div className="mb-2 md:mb-0">
                <div className="lws-container">
                    <div className="lws-container-inner">
                        <div className="border border-slate-300 text-lg p-2 font-bold text-slate-700">
                            Already have an account? Login here!
                        </div>
                        
                        <div className="border-l border-b border-r border-slate-300 p-3 text-slate-700">
                            {errMsg && <div className="text-center mb-2 italic text-red-500">{errMsg}</div>}
                            <div className="w-full md:w-2/4 mx-auto">
                                <form onSubmit={performLogin}>
                                    <div className="mb-3">
                                        <div className="mb-2">
                                            <label htmlFor="username">Username:</label>
                                        </div>
                                        <div>
                                            <input id="username" name="username" type="text" className="textfield" autoComplete="username" onChange={textOnChange} />  
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="mb-2">
                                            <label htmlFor="password">Password:</label>
                                        </div>
                                        <div>
                                            <input id="password" name="password" type="password" className="textfield" autoComplete="current-password" onChange={textOnChange} />  
                                        </div>
                                        {/* <div className="mt-2 text-sm text-slate-500">Forgot password? Reset here!</div> */}
                                    </div>
                                    <div className="flex justify-end">
                                        <button className={`flex items-center justify-center bg-pizza-700 text-white hover:bg-pizza-600 transition-colors ease-in-out duration-300 px-3 py-2 rounded-xl ${isFrmLoading && 'grayscale'}`} disabled={isFrmLoading}>Login <ArrowRightOnRectangleIcon className="h-6 w-6 inline" /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Login.Layout = "LWS"

export default Login;