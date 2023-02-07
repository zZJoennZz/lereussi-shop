import Meta from "@/components/Meta"
import { PencilSquareIcon } from "@heroicons/react/24/outline"

export default function Profile(): JSX.Element {
    return (
        <>
            <Meta title="My Profile | Le REUSSI" />
            
            <div className="container-outer">
                <div className="container-inner">
                    <div className="border border-gray-300 text-gray-500 text-2xl font-bold p-2 mb-3">
                        Your profile settings
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
                            <button className="bg-gumbo text-white px-3 py-2 rounded-2xl flex items-center justify-center"><PencilSquareIcon className="inline w-5 h-5 mr-2" />Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}