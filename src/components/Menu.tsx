import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartCard from './CartCard'

import styles from '@/styles/Menu.module.css'
import { Cart } from '@/types'
import logo from '@/img/logo.png'
import { EnvelopeIcon, ChevronDownIcon, ShoppingCartIcon, XMarkIcon, ArrowRightOnRectangleIcon, XCircleIcon } from '@heroicons/react/24/outline'

import { useRecoilState } from 'recoil'
import { cartItemsState } from '@/atoms'

interface MenuProps { 
    isAuth: boolean;
}

export default function Menu({ isAuth = true } : MenuProps): JSX.Element {
    const [cartItems, setCartItems] = useRecoilState(cartItemsState)

    // const items: any[] = itemList

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem("cart") || "");
        if (cartData.length > 0) {
            setCartItems(cartData);
        }
    }, [setCartItems]);

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
                                    <Link href="/login">Have an account? Login here! <ArrowRightOnRectangleIcon className="ml-2 inline h-5 w-5" /></Link>
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
                        <input className='hidden' type="checkbox" id={styles['hamburger']} aria-hidden />
                        <label htmlFor={styles['hamburger']}>
                            <div className={styles.navHamburger}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        
                            <div className={styles.navLinks}>
                                <ul>
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/product">Products</Link></li>
                                    <li><Link href="/about">About Us</Link></li>
                                    <li><Link href="/contact">Contact Us</Link></li>
                                </ul>
                            </div>
                        </label>
                    </div>
                    <div className={styles.navMenuCart}>
                        <input className="hidden" type="checkbox" id={styles['cart-button']} />
                        <label htmlFor={styles['cart-button']}>
                            <div className={styles.cartBtn}>
                                <div id={styles['cart-count']} className="rounded-full bg-red-600 text-xs absolute w-5 h-5 flex items-center justify-center top-0 right-0 text-white">
                                    {cartItems.length}
                                </div>
                                <ShoppingCartIcon id={styles['cart-icon']} className="h-6 w-6 md:h-7 md:w-7 inline" />
                                <XMarkIcon id={styles['close-cart']} className="h-6 w-6 md:h-7 md:w-7 inline" />
                            </div>
                        </label>
                        <div className={styles.cartList}>
                            {
                                cartItems.length > 0 ? cartItems.map((item: Cart) => 
                                    <CartCard cartInfo={item} key={item.id} />
                                )
                                :
                                <div className="text-center text-3xl text-gray-400 italic">You cart is empty.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
