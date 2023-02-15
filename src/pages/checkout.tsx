import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Meta from "@/components/Meta"
import Breadcrumb from '@/components/Breadcrumb'
import CheckoutCart from '@/components/CheckoutCart'

import { useRecoilState, useRecoilValue } from "recoil"
import { authState, cartItemsState } from "@/atoms"
import { Cart, ProductVariant, Breadcrumb as bcType } from "@/types"
import { addToCartInLocalStorage, phpesos } from "@/utilities"

import { BuildingLibraryIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface OrderProdType {
    product_variant: string;
    quantity: number;
    amount: number;
    discount: number;
    total_amount: number;
}

export default function Checkout(): JSX.Element {
    const isAuth = useRecoilValue(authState)
    const [cartItems, setCartItems] = useRecoilState(cartItemsState)
    const [itemTotal, setItemTotal] = useState(0)
    const [receiptPreview, setReceiptPreview] = useState('')
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email_address: '',
        contact_number: '',
    })
    const [shippingAddress, setShippingAddress] = useState({
        address1: '',
        address2: '',
        city: '',
        zip: '',
        province: '',
        country: '',
        address_type: 'SHIPPING'
    })
    const [orderProducts, setOrderProducts] = useState<OrderProdType[]>([])

    async function submitOrder() {
        let frmData = new FormData()
        frmData.append("total_amount", "1100")
        frmData.append("total_discount", "0")
        frmData.append("total_fees", "100")
        frmData.append("order_amount", "1000")
        frmData.append("details", JSON.stringify(orderProducts))
    }

    async function confirmProducts() {
        cartItems.forEach(async (item) => {
            let checkItem: ProductVariant[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/getproductvariant/?slug=${item.slug}`)
                .then(res => res.json())
                .catch(err => alert('Invalid products, please refresh the page.'))
            setOrderProducts((prev) => {
                return [
                    ...prev,
                    {
                        product_variant: checkItem[0].variant_id,
                        quantity: item.qty,
                        amount: checkItem[0].price,
                        discount: checkItem[0].discount,
                        total_amounnt: item.qty * (checkItem[0].price - checkItem[0].discount)
                    }
                ]
            })
        })
    }

    function updateQty(e: any, itemId: string, qty: number) {
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

    function removeItem(itemId: string) {
        const updatedItem = cartItems.filter(cart => cart.id !== itemId)
        addToCartInLocalStorage(updatedItem)
        setCartItems(updatedItem)
    }

    function onSelectFile(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setReceiptPreview('')
        } else {
            setReceiptPreview(URL.createObjectURL(e.target.files[0]))
        }
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
                    <div className="grid grid-cols-12 py-3" style={{ minHeight: "50vh" }}>
                        <div className="col-span-12 md:col-span-8">
                            <div className="text-2xl font-bold text-gumbo">
                                Checkout Order
                            </div>
                            <div className="text-sm text-slate-500 float-right">Total</div>
                            <div className="text-sm text-slate-500 mb-3 border-b border-gray-300">Your cart</div>
                            {
                                cartItems.length > 0 ?
                                <div className="max-h-96 overflow-auto">
                                    <CheckoutCart cartItems={cartItems} removeItem={removeItem} updateQty={updateQty} />
                                </div>
                                :
                                <div className="text-slate-400 italic text-center">Your cart is empty.</div>
                            }
                            <div className="float-right mt-3">
                                <Link href={isAuth ? '/profile' : '/login'} className="text-sm text-pizza-700 hover:text-pizza-600 transition-colors ease-in-out duration-300">{isAuth ? 'Edit Profile' : 'Have an account? Login here!'}</Link>
                            </div>
                            <div className="mt-4 text-sm text-slate-500 mb-3 border-b border-gray-300">Customer Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="First name" readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Last name" readOnly={isAuth ? true : false} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-1">
                                    <input type="email" className="textfield" placeholder="Email address" readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Contact Number" readOnly={isAuth ? true : false} />
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-slate-500 mb-3 border-b border-gray-300">Shipping Address</div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Steet/Block/Building/Address 1" readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Barangay, City/Address 2" readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="City" readOnly={isAuth ? true : false} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Zip Code" readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Province" readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Country" readOnly={isAuth ? true : false} />
                                </div>
                            </div>
                            {/* <div className="mt-2 float-right text-sm text-slate-500">
                                <div className="flex justify-end items-center">
                                    <input type="checkbox" name="" id="sameAddress" className="mr-1" /> <label htmlFor="sameAddress">Same as shipping address</label>
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-slate-500 mb-3 border-b border-gray-300">Billing Address</div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Steet/Block/Building/Address 1" />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Barangay, City/Address 2" />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="City" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Zip Code" />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Province" />
                                </div>
                                <div className="p-1">
                                    <input type="text" className="textfield" placeholder="Country" />
                                </div>
                            </div> */}
                        </div>
                        <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
                            <div className="pl-0 md:pl-2">
                                <div className="border border-gray-300 text-gray-500 p-2">
                                    Order Summary
                                </div>
                                <div className="border-r border-l border-b border-gray-300 p-2">
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Order Amount:</span> <span className="float-right">{phpesos.format(itemTotal)}</span></div>
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Total Discount:</span> <span className="float-right">{phpesos.format(0)}</span></div>
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Delivery Fee:</span> <span className="float-right">{phpesos.format(100)}</span></div>
                                    <div className="text-sm text-gray-500"><span className="font-bold">Total Amount:</span> <span className="float-right">{phpesos.format(itemTotal + 100)}</span></div>
                                </div>
                                <div className="border-r border-l border-b border-gray-300 text-gray-500 p-2">
                                    Payment
                                </div>
                                <div className="border-r border-l border-b border-gray-300 p-2">
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Payment Method:</span> <span className="float-right"><div className="flex items-center"><BuildingLibraryIcon className="w-4 h-4 inline mr-2" /> Bank Transfer</div></span></div>
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Transfer Receipt:</span></div>
                                    <div className="w-full flex items-center justify-center mb-2">
                                        <label htmlFor="attachment">
                                            <input 
                                                id="attachment"
                                                type="file" 
                                                className="
                                                    text-sm 
                                                    text-grey-500
                                                    file:mr-5 
                                                    file:py-3 
                                                    file:px-2
                                                    xl:file:px-5
                                                    file:rounded-full file:border-0
                                                    file:text-md file:font-semibold file:text-white
                                                    file:bg-pizza-700
                                                    hover:file:cursor-pointer 
                                                    hover:file:opacity-80 
                                                    file:transition-all file:ease-in-out file:duration-300 
                                                    bg-gray-300 rounded-3xl p-1
                                                    text-gray-500 w-full"
                                                accept="image/png, image/gif, image/jpeg"
                                                onChange={onSelectFile}
                                            />
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        {
                                            receiptPreview && 
                                            <Image 
                                                src={receiptPreview}
                                                height={100} 
                                                width={100} 
                                                alt="Receipt Preview"
                                                className="rounded-lg"
                                            />
                                        }
                                    </div>
                                </div>
                                <div className="fixed w-full bg-white bottom-0 left-0 border-t md:border-t-0 md:relative border-r border-l border-b border-gray-300 p-2 flex justify-end">
                                    <button className="bg-pizza-700 hover:bg-pizza-600 transition-all ease-in-out duration-300 text-white cursor-pointer rounded-3xl px-3 py-2 text-sm font-bold flex items-center group w-full md:w-auto justify-end md:justify-center" onClick={confirmProducts}>
                                        Submit Order <ChevronRightIcon className="w-4 h-4 inline transition-all ease-in-out duration-300 ml-1 md:-ml-3 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}