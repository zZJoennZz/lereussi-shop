import Meta from '@/components/Meta'
import Image from 'next/image'
import styles from '@/styles/Contact.module.css'
import contactBg from '@/img/contact-bg.png'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
export default function Contact(): JSX.Element {
    return (
        <>
            <Meta title='Contact Us | Le REUSSI' />
            <div className="flex items-center" style={{minHeight: '60vh'}}>
                <div className={styles.contact}>
                    <div className={styles.contactInner}>
                        <div className="pl-0 lg:pl-6">
                            <h1 className="text-2xl md:text-5xl font-bold mb-3 text-slate-600">
                                <span>Contact Us</span>
                            </h1>
                            <form action="">
                                <div className="mb-3">
                                    <div className="mb-1">
                                        <label htmlFor="" className="text-slate-500">Subject</label>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Hey! How can we help you?" className="textfied" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-1">
                                        <label htmlFor="" className="text-slate-500">Email Address</label>
                                    </div>
                                    <div>
                                        <input type="text" placeholder="Let us get back to you!" className="textfied" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="mb-1">
                                        <label htmlFor="" className="text-slate-500">Message</label>
                                    </div>
                                    <div>
                                        <textarea placeholder="Tell us more!" className="textfied"></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="bg-pizza-700 hover:bg-pizza-600 transition-all ease-in-out duration-300 text-white px-3 py-2 rounded-xl flex items-center">Send! <PaperAirplaneIcon className="ml-2 w-4 h-4 inline" /></button>
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center justify-end">
                            <Image priority src={contactBg} className="w-4/5" alt="Contact us now!" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}