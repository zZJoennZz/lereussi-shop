import Image from 'next/image'
import Link from 'next/link'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { cartItemsState } from '@/atoms'
import styles from '@/styles/Menu.module.css'
import logo from '@/img/logo.png'
import { EnvelopeIcon, ChevronDownIcon, ShoppingCartIcon, XMarkIcon, ArrowRightOnRectangleIcon, XCircleIcon } from '@heroicons/react/24/outline'

//for testing
import darkChoco from '@/img/dark-choco.jpg'

interface MenuProps { 
    isAuth: boolean;
}

export default function Menu({ isAuth = true } : MenuProps): JSX.Element {
    const cartItems = useRecoilValue(cartItemsState)
    const setCartItems = useSetRecoilState(cartItemsState)

    // const items: any[] = itemList

    function removeItem(itemId: number) {
        if (cartItems.length > 0) {
            const filteredFromList: any[] = cartItems.filter(i => i.id !== itemId)
            setCartItems(filteredFromList)
        }
    }

    function adjustItem(itemId: number, qty: number) {
        const filteredFromList: any[] = cartItems.filter(i => i.id === itemId)
        filteredFromList[0].quantity = qty
    }
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
                                cartItems.map(item => 
                                    <div className={styles.cartItems} key={item.id}>
                                        <span onClick={() => removeItem(item.id)} className="absolute top-0 left-0 bg-white rounded-full"><XCircleIcon className="inline w-7 h-7 text-red-600" /></span>
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-4">
                                                <Image 
                                                    src={darkChoco}
                                                    alt="Dark Chocolate"
                                                    className="w-full rounded-xl"
                                                />
                                            </div>
                                            <div className="col-span-8 px-4">
                                                <div className="text-xl font-bold text-slate-600">{item.name}</div>
                                                <div>
                                                    <label htmlFor="cart-qty" className="mr-2">Quantity:</label><input id="cart-qty" type="number" className="border border-slate-300 p-1 w-10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
