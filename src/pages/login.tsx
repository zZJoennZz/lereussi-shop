import Meta from '@/components/Meta'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
function Login(): JSX.Element {
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
                            <div className="w-full md:w-2/4 mx-auto">
                                <form action="">
                                    <div className="mb-3">
                                        <div className="mb-2">
                                            <label htmlFor="username">Username:</label>
                                        </div>
                                        <div>
                                            <input id="username" type="text" className="textfield" />  
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="mb-2">
                                            <label htmlFor="password">Password:</label>
                                        </div>
                                        <div>
                                            <input id="password" type="password" className="textfield" />  
                                        </div>
                                        <div className="mt-2 text-sm text-slate-500">Forgot password? Reset here!</div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="flex items-center justify-center bg-pizza-700 text-white hover:bg-pizza-600 transition-colors ease-in-out duration-300 px-3 py-2 rounded-xl">Login <ArrowRightOnRectangleIcon className="h-6 w-6 inline" /></button>
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