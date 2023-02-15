import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { useRouter } from "next/router"
import { authState } from "@/atoms"
import Meta from "@/components/Meta"

import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline"

export default function Profile(): JSX.Element {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const isAuth = useRecoilState(authState)
    const dashboardUrl = process.env.NEXT_PUBLIC_MEMBER_DASHBOARD_URL

    useEffect(() => {
        const checkIfLoggedIn = () => {
            if (!isAuth) router.push('/login')
            else setIsLoading(false)
        }
        checkIfLoggedIn()
        
    })

    if (isLoading) return <div className="pt-4 text-center text-lg" style={{minHeight: '60vh'}}>Loading...</div>
    
    return (
        <>
            <Meta title="My Profile | Le REUSSI" />
            
            <div className="container-outer">
                <div className="container-inner">
                    <div className="border border-gray-300 p-2 mb-3 flex items-center">
                        <div className="text-gray-500 text-2xl font-bold flex-grow">Your profile settings</div>
                        <a href={dashboardUrl} target="_blank" rel="noreferrer" className="float-right cursor-pointer text-base bg-gray-600 hover:bg-gray-500 transition-all ease-in-out duration-300 text-white p-2 rounded-lg flex items-center"><UserCircleIcon className="inline w-5 h-5 mr-2" /> Member Dashboard</a>
                    </div>
                    <div className="text-gray-600 border border-gray-300">
                        <div className="border-b border-gray-300 p-2 font-bold">Personal Information</div>
                        <div className="border-b border-gray-300 px-2 py-4 grid grid-cols-1 md:grid-cols-3">
                            <div className="col-span-1 md:col-span-3 mb-2">Full Name:</div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="First name" />
                            </div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Middle name" />
                            </div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="border-b border-gray-300 p-2 font-bold">Contact Details</div>
                        <div className="border-b border-gray-300 px-2 py-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Phone number" />
                            </div>
                            <div className="p-1">
                                <input type="email" className="textfield" placeholder="Email address" />
                            </div>
                        </div>
                        <div className="border-b border-gray-300 p-2 font-bold">Delivery Address</div>
                        <div className="border-b border-gray-300 px-2 py-4 grid grid-cols-1 md:grid-cols-2">
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Street Number/Apartment/Building" />
                            </div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Village/Subdivision" />
                            </div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Barangay" />
                            </div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="City" />
                            </div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Province" />
                            </div>
                            <div className="p-1">
                                <input type="text" className="textfield" placeholder="Zip Code" />
                            </div>
                        </div>
                        <div className="p-2 flex justify-end">
                            <button className="bg-gumbo border-2 border-gumbo hover:bg-white hover:text-gumbo transition-all ease-in-out duration-300 text-white px-3 py-2 rounded-lg flex items-center justify-center font-bold"><PencilSquareIcon className="inline w-5 h-5 mr-2" />Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}