import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import styles from '@/styles/Footer.module.css'
import logo from '@/img/logo.png'

interface FooterProps {
    isAuth: boolean;
}

export default function Footer({ isAuth = true } : FooterProps): JSX.Element {
    return (
        <div className="border-t border-gray-300">
            <footer className="w-full overflow-hidden">
                <div className={styles.footerInfo}>
                    <div className="mb-3 md:mb-0 col-span-12 md:col-span-4 lg:col-span-5 order-1 md:order-1">
                        <div className="mb-4">
                            <Image src={logo} priority className="w-2/3" alt="Le REUSSI Logo" />
                        </div>
                        <div className="mb-3 pr-2">
                            <p className="text-justify text-sm text-slate-600">
                                Started off as a hobby in family gatherings, Le Reussi is a quaint cakes and drinks cafe right along Banawe. After your fill of chinese food in this area, satisfy your belly with some desserts.
                            </p>
                        </div>
                        <div className="flex">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
                                <path d="M13.643 9.36206C13.6427 9.05034 13.7663 8.75122 13.9864 8.53052C14.2065 8.30982 14.5053 8.18559 14.817 8.18506H15.992V5.23999H13.643C13.1796 5.24052 12.7209 5.33229 12.293 5.51013C11.8651 5.68798 11.4764 5.94841 11.1491 6.27649C10.8219 6.60457 10.5625 6.99389 10.3857 7.42224C10.209 7.85059 10.1183 8.30956 10.119 8.77295V11.718H7.769V14.663H10.119V21.817C11.2812 22.0479 12.4762 22.0604 13.643 21.854V14.663H15.992L17.167 11.718H13.643V9.36206Z" fill="#fff"/>
                            </svg>

                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3" d="M22 8.20267V15.7027C22 19.1027 19.2 22.0026 15.7 22.0026H8.2C4.8 22.0026 2 19.2027 2 15.7027V8.20267C2 4.80267 4.8 2.0026 8.2 2.0026H15.7C19.2 1.9026 22 4.70267 22 8.20267ZM12 7.30265C9.5 7.30265 7.39999 9.40262 7.39999 11.9026C7.39999 14.4026 9.5 16.5026 12 16.5026C14.5 16.5026 16.6 14.4026 16.6 11.9026C16.6 9.30262 14.5 7.30265 12 7.30265ZM17.9 5.0026C17.3 5.0026 16.9 5.4026 16.9 6.0026C16.9 6.6026 17.3 7.0026 17.9 7.0026C18.5 7.0026 18.9 6.6026 18.9 6.0026C18.9 5.5026 18.4 5.0026 17.9 5.0026Z" fill="currentColor"/>
                                <path d="M12 17.5026C8.9 17.5026 6.39999 15.0026 6.39999 11.9026C6.39999 8.80259 8.9 6.30261 12 6.30261C15.1 6.30261 17.6 8.80259 17.6 11.9026C17.6 15.0026 15.1 17.5026 12 17.5026ZM12 8.30261C10 8.30261 8.39999 9.90259 8.39999 11.9026C8.39999 13.9026 10 15.5026 12 15.5026C14 15.5026 15.6 13.9026 15.6 11.9026C15.6 9.90259 14 8.30261 12 8.30261Z" fill="#fff"/>
                            </svg>

                            
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.3" d="M19.0003 4.40002C18.2003 3.50002 17.1003 3 15.8003 3C14.1003 3 12.5003 3.99998 11.8003 5.59998C11.0003 7.39998 11.9004 9.49993 11.2004 11.2999C10.1004 14.2999 7.80034 16.9 4.90034 17.9C4.50034 18 3.80035 18.2 3.10035 18.2C2.60035 18.3 2.40034 19 2.90034 19.2C4.40034 19.8 6.00033 20.2 7.80033 20.2C15.8003 20.2 20.2004 13.5999 20.2004 7.79993C20.2004 7.59993 20.2004 7.39995 20.2004 7.19995C20.8004 6.69995 21.4003 6.09993 21.9003 5.29993C22.2003 4.79993 21.9003 4.19998 21.4003 4.09998C20.5003 4.19998 19.7003 4.20002 19.0003 4.40002Z" fill="currentColor"/>
                                <path d="M11.5004 8.29997C8.30036 8.09997 5.60034 6.80004 3.30034 4.50004C2.90034 4.10004 2.30037 4.29997 2.20037 4.79997C1.60037 6.59997 2.40035 8.40002 3.90035 9.60002C3.50035 9.60002 3.10037 9.50007 2.70037 9.40007C2.40037 9.30007 2.00036 9.60004 2.10036 10C2.50036 11.8 3.60035 12.9001 5.40035 13.4001C5.10035 13.5001 4.70034 13.5 4.30034 13.6C3.90034 13.6 3.70035 14.1001 3.90035 14.4001C4.70035 15.7001 5.90036 16.5 7.50036 16.5C8.80036 16.5 10.1004 16.5 11.2004 15.8C12.7004 14.9 13.9003 13.2001 13.8003 11.4001C13.9003 10.0001 13.1004 8.39997 11.5004 8.29997Z" fill="#B3B3B3"/>
                            </svg>

                            
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 6.30005C20.5 5.30005 19.9 5.19998 18.7 5.09998C17.5 4.99998 14.5 5 11.9 5C9.29999 5 6.29998 4.99998 5.09998 5.09998C3.89998 5.19998 3.29999 5.30005 2.79999 6.30005C2.19999 7.30005 2 8.90002 2 11.9C2 14.8 2.29999 16.5 2.79999 17.5C3.29999 18.5 3.89998 18.6001 5.09998 18.7001C6.29998 18.8001 9.29999 18.8 11.9 18.8C14.5 18.8 17.5 18.8001 18.7 18.7001C19.9 18.6001 20.5 18.4 21 17.5C21.6 16.5 21.8 14.9 21.8 11.9C21.8 9.00002 21.5 7.30005 21 6.30005ZM9.89999 15.7001V8.20007L14.5 11C15.3 11.5 15.3 12.5 14.5 13L9.89999 15.7001Z" fill="#B3B3B3"/>
                            </svg>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-4 text-slate-600 order-3 md:order-3 mb-3 md:mb-0 ">
                        <h2 className="text-sm font-bold">Information</h2>
                        <ul className="pl-2 text-sm mb-3">
                            <li className="mb-1">About Us</li>
                            <li className="mb-1">Contact Us</li>
                            <li className="mb-1">Privacy Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                        <h2 className="text-sm font-bold">My Account</h2>
                        <ul className="pl-2 text-sm">
                            <li className="mb-1">Settings</li>
                            <li className="mb-1">Logout</li>
                        </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-3 text-slate-600 order-2 md:order-4">
                        <div className="md:flex md:justify-end md:w-full">
                            <div>
                                <div className="flex items-center justify-start mb-3">
                                    <div className="bg-pizza-700 text-white p-3 rounded-full mr-3 hover:bg-slate-600 transition-all ease-in-out duration-300">
                                        <PhoneIcon className="inline h-7 w-7" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">Contact Us</div>
                                        <div>900 123456789</div>
                                    </div>
                                </div>
                                <div className="flex mb-3 items-center justify-start">
                                    <div className="bg-pizza-700 text-white p-3 rounded-full mr-3 hover:bg-slate-600 transition-all ease-in-out duration-300">
                                        <EnvelopeIcon className="inline h-7 w-7" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">Email</div>
                                        <div>info@lereussi.com</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start">
                                    <div className="bg-pizza-700 text-white p-3 rounded-full mr-3 hover:bg-slate-600 transition-all ease-in-out duration-300">
                                        <MapPinIcon className="inline h-7 w-7" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">Location</div>
                                        <div>Idk St., Quezon City</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-pizza-700">
                    <div className={styles.footerCredits}>
                        <div className="mb-1">
                            Le REUSSI &copy; 2023
                        </div>
                        <div className="text-xs">
                            Powered by T1 Solutions
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}