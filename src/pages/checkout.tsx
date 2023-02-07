import { useEffect, useState } from 'react'
import Image from "next/image"

import Meta from "@/components/Meta"
import Breadcrumb from '@/components/Breadcrumb'

import { useRecoilState } from "recoil"
import { cartItemsState } from "@/atoms"
import { Cart, Breadcrumb as bcType } from "@/types"
import { addToCartInLocalStorage, phpesos } from "@/utilities"

import { XMarkIcon } from '@heroicons/react/24/solid'

//TESTONLY
import darkChoco from '@/img/dark-choco.jpg'

export default function Checkout(): JSX.Element {
    const [cartItems, setCartItems] = useRecoilState(cartItemsState)
    const [itemTotal, setItemTotal] = useState(0)

    function updateQty(e: any, itemId: number, qty: number) {
        if (qty === 0 || Number.isNaN(qty)) {
            let remove = confirm("Are you sure to remove this item?")
            if (remove) {
                removeItem(itemId)
            }
            return
        }
        setCartItems((items): Cart[] => {
            let newItems = items.map((item) => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        qty: qty
                    }
                }
                return item
            })
            addToCartInLocalStorage(newItems)
            return newItems
        })
    }

    function removeItem(itemId: number) {
        const updatedItem = cartItems.filter(cart => cart.id !== itemId)
        addToCartInLocalStorage(updatedItem)
        setCartItems(updatedItem)
    }

    useEffect(() => {
        let isSubscribed = true
        
        
        function getTotal() {
            if (isSubscribed) {
                setItemTotal(cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0))
            }
        }

        getTotal()

        return () => {
            isSubscribed = false
        }
    }, [cartItems])

    const bcTree: bcType[] = [{text: 'Home',url: '/'},{text: 'Checkout',url: ''}]
    
    return (
        <>
            <Meta title="Checkout | Le REUSSI" />
            <div className="container-outer">
                <div className="container-inner">
                    <Breadcrumb bcTree={bcTree} />
                    <div className="grid grid-cols-12 py-10">
                        <div className="col-span-12 md:col-span-8">
                            <div className="text-2xl font-bold text-gumbo">
                                Checkout Order
                            </div>
                            <div className="text-sm text-slate-500 float-right">Total</div>
                            <div className="text-sm text-slate-500 mb-3 border-b border-gray-300">Your cart</div>
                            {
                                cartItems.length > 0 ?
                                cartItems.map(cart => 
                                    <div key={cart.id} className="mb-2 grid grid-cols-12 border-b border-gray-300 pb-2">
                                        <div className="col-span-2 pr-2 relative">
                                            <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center absolute top-0 -left-0 cursor-pointer" onClick={() => removeItem(cart.id)}><XMarkIcon className="inlinie w-4 h-4" /></div>
                                            <Image src={darkChoco} alt="Dark Choco" className="w-full h-28 object-cover rounded-lg" />
                                        </div>
                                        <div className="col-span-8">
                                            <div className="text-2xl font-bold text-pizza-700 mb-1">{cart.name}</div>
                                            <div>
                                                <label htmlFor="" className="text-sm text-gray-500">Qty:</label> <input type="number" className="border border-gray-300 p-2 w-16 rounded-lg" value={cart.qty} onChange={(e) => updateQty(e, cart.id, parseInt(e.target.value))} />
                                            </div>
                                        </div>
                                        <div className="col-span-2 text-right relative">
                                            <div className="text-xs text-gray-500">PHP</div>
                                            <div className="text-pottersclay">{phpesos.format(cart.price * cart.qty || 0)}</div>
                                        </div>
                                    </div>
                                )
                                :
                                <div className="text-slate-400 italic text-center">Your cart is empty.</div>
                            }
                            
                        </div>
                        <div className="col-span-4">
                            <div className="pl-0 md:pl-2">
                                <div className="border border-gray-300 text-gray-500 p-2">
                                    Order Summary
                                </div>
                                <div className="border-r border-l border-b border-gray-300 p-2">
                                    <div className="text-sm text-gray-500"><span className="font-bold">Order Total:</span> <span className="float-right">{phpesos.format(itemTotal)}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}