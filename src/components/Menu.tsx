import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Menu.module.css'
import logo from '@/img/logo.png'
import { EnvelopeIcon, ChevronDownIcon, ShoppingCartIcon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

interface MenuProps { 
    isAuth: boolean;
}

export default function Menu({ isAuth = true } : MenuProps): JSX.Element {
    return (
        <>
            <div className={styles.menu}>
                <div className={styles.innerMenu}>
                    <div className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 inline mr-2" /> info@lereussi.com
                    </div>
                    <div className="text-right">
                        {
                            !isAuth ? 
                            <>
                                <input type="checkbox" className="hidden" id={styles["account-drop"]} />
                                <label htmlFor={styles["account-drop"]}>
                                    <div className="group cursor-pointer">
                                        My Account <ChevronDownIcon className="inline h-5 w-5" />
                                    </div>
                                </label>
                                <div id={styles["account-menu"]}>
                                    <ul>
                                        <li>Settings</li>
                                        <li>Logout</li>
                                    </ul>
                                </div>
                            </>
                            :
                            <>
                                <div className="cursor-pointer hover:text-pizza-200 flex items-center justify-end">
                                    Have an account? Login here! <ArrowRightOnRectangleIcon className="ml-2 inline h-5 w-5" />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.navMenu}>
                <div className={styles.navMenuInner}>
                    <div id="logo" className={styles.navMenuLogo}>
                        <Image src={logo} priority alt="Le REUSSI Logo" />
                    </div>
                    <div className={styles.navMenuBar}>
                        <input className="hidden" type="checkbox" id={styles['hamburger']} aria-hidden />
                        <label htmlFor={styles['hamburger']}>
                            <div className={styles.navHamburger}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </label>
                        <div className={styles.navLinks}>
                            <ul>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="#">Products</Link></li>
                                <li><Link href="/about">About Us</Link></li>
                                <li><Link href="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.navMenuCart}>
                        <input className="hidden" type="checkbox" id={styles['cart-button']} />
                        <label htmlFor={styles['cart-button']}>
                            <div className={styles.cartBtn}>
                                <div id={styles['cart-count']} className="rounded-full bg-red-600 text-xs absolute w-5 h-5 flex items-center justify-center top-0 right-0 text-white">
                                    1
                                </div>
                                <ShoppingCartIcon id={styles['cart-icon']} className="h-6 w-6 md:h-7 md:w-7 inline" />
                                <XMarkIcon id={styles['close-cart']} className="h-6 w-6 md:h-7 md:w-7 inline" />
                            </div>
                        </label>
                        <div className={styles.cartList}></div>
                    </div>
                </div>
            </div>
        </>
    )
}
