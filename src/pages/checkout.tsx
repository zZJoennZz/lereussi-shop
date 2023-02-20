import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Meta from "@/components/Meta"
import Breadcrumb from '@/components/Breadcrumb'
import CheckoutCart from '@/components/CheckoutCart'

import { useRecoilState, useRecoilValue } from "recoil"
import { authState, cartItemsState } from "@/atoms"
import { Cart, ProductVariant, Breadcrumb as bcType } from "@/types"
import { addToCartInLocalStorage, phpesos } from "@/utilities"

import { BuildingLibraryIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface OrderProdType {
    product_variant: string;
    quantity: number;
    amount: number;
    discount: number;
    total_amount: number;
}

export default function Checkout(): JSX.Element {
    const router = useRouter()
    const isAuth = useRecoilValue(authState)
    const [cartItems, setCartItems] = useRecoilState(cartItemsState)
    
    //page states
    const [isOrderSubmitting, setIsOrderSubmitting] = useState(false)
    const [origPriceTotal, setOrigPriceTotal] = useState(0)
    const [orderDate, setOrderDate] = useState(new Date())
    const [itemTotal, setItemTotal] = useState(0)
    const [receiptPreview, setReceiptPreview] = useState('')
    const [receiptFile, setReceiptFile] = useState<any>([])
    const [deliveryFee, setDeliveryFee] = useState(0)
    const [orderProducts, setOrderProducts] = useState<any[]>([])
    const [codeDiscount, setCodeDiscount] = useState(false)
    const [discountCode, setDiscountCode] = useState('')
    const [promoCodeId, setPromoCodeId] = useState(0)
    const [shippingAddress, setShippingAddress] = useState<any>({
        address1: '',
        address2: '',
        city: '',
        zip: '',
        province: '',
        country: '',
        address_type: 'SHIPPING'
    })
    const [customerDetail, setCustomerDetail] = useState<any>({
        firstName: '',
        lastName: '',
        emailAddress: '',
        contactNumber: ''
    })
    const [orderNotes, setOrderNotes] = useState("")
    
    function onChangeAddress (e: any, type: string = 'SHIPPING') {
        setShippingAddress((prev: any) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
                address_type: 'SHIPPING'
            }
        })
    }

    async function submitOrder() {
        for (let key in shippingAddress) {
            if (shippingAddress[key] === '' || shippingAddress[key] === null || shippingAddress[key] === undefined) {
                alert('Please complete the address form.')
                return
            }
        }

        for (let key in customerDetail) {
            if (customerDetail[key] === undefined || customerDetail[key] === '' || customerDetail[key] === null) {
                alert('Please complete your details.')
                return
            }
        }

        if (orderDate === undefined || String(orderDate) === '' || orderDate === null) {
            alert('Please select order date and time.')
            return
        } 

        if (orderProducts.length === 0) {
            alert('Your cart is empty. Cannot proceed.')
            return
        }
        setIsOrderSubmitting(true)
        let frmData = new FormData()
        frmData.append("total_amount", String(itemTotal))
        const totalDiscount = itemTotal
        frmData.append("total_discount", String(totalDiscount))
        frmData.append("total_fees", String(deliveryFee))
        const orderAmount = (itemTotal - totalDiscount) + deliveryFee
        frmData.append("order_amount", String(orderAmount))
        frmData.append("details", JSON.stringify(orderProducts))
        const feesData = [{"fee_type": "Delivery Fee", "amount": deliveryFee}]
        frmData.append("fees", JSON.stringify(feesData))
        frmData.append("code", String(promoCodeId))
        const custData = {
            "name": customerDetail.firstName + ' ' + customerDetail.lastName,
            "email_address": customerDetail.emailAddress,
            "contact_number": customerDetail.contactNumber,
            "address": [
                {
                    "address1": shippingAddress.address1,
                    "address2": shippingAddress.address1,
                    "city": shippingAddress.city,
                    "zip": shippingAddress.zip,
                    "province": null,
                    "country": null,
                    "address_type": "SHIPPING"
                },{
                    "address1": shippingAddress.address1,
                    "address2": shippingAddress.address1,
                    "city": shippingAddress.city,
                    "zip": shippingAddress.zip,
                    "province": null,
                    "country": null,
                    "address_type": "BILLING"
                }
            ]
        }
        frmData.append("customer", JSON.stringify(custData))
        frmData.append("payment_method", "BANK_TRANSFER")
        frmData.append("order_type", "DELIVERY")
        Array.from(receiptFile).forEach((file: any) => {
            let att = new File([file], file.name)
            frmData.append("attachments", att)
        })
        // frmData.append("attachments", )
        frmData.append("branch", localStorage.getItem("branch") || "0")
        frmData.append("order_notes", orderNotes)
        const convertDate = new Date(orderDate)
        frmData.append("order_date", String(convertDate.toISOString()))
        frmData.append("account", '')
        
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/createorder/`, {
            method: 'POST',
            // headers: {'Content-Type': 'multipart/form-data'},
            body: frmData
        })
            .then(res => {
                localStorage.setItem('cart', '[]')
                setCartItems([])
                localStorage.setItem('code', '')
                router.push('/order-success')
            })
            .catch(err => {
                alert('Cannot submit your order. Reloading the page...')
                window.location.reload()
            })

        // let obj: any = {}
        // frmData.forEach(function(value, key){
        //     obj[key] = value
        // });
        // console.log(obj)
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

    function onChangeText(e: any) {
        setCustomerDetail((prev: any) => { return {...prev, [e.target.name]: e.target.value} })
    }

    function onSelectFile(e: any) {
        if (!e.target.files || e.target.files.length === 0) {
            setReceiptPreview('')
        } else {
            setReceiptPreview(URL.createObjectURL(e.target.files[0]))
            setReceiptFile(e.target.files)
        }
    }

    function onChangeOrderNotes(e: any) {
        setOrderNotes(e.target.value)
    }

    function discountCodeOnChange(e: any) {
        setDiscountCode(e.target.value)
    }

    async function confirmCode() {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/verifycode/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                discount_code: discountCode
            })
        })
            .then(async (res) => {
                let data = await res.json()
                if (data.detail !== 'Not found.' && data.code.code_status === 'ACTIVE') {
                    setCodeDiscount(true)
                    setPromoCodeId(data.code.code)
                } else {
                    setCodeDiscount(false)
                }
            }).catch(err => setCodeDiscount(false))
        
    }

    useEffect(() => {
        let isSubscribe = true
        if (isSubscribe && isAuth) {
            const savedUser = JSON.parse(localStorage.getItem('user') || '')
            if (savedUser !== undefined || savedUser !== '' || savedUser !== null) {
                setCustomerDetail({
                    firstName: savedUser.first_name,
                    lastName: savedUser.last_name,
                    emailAddress: savedUser.email_address,
                    contactNumber: savedUser.contact_number,
                })
    
                setShippingAddress({
                    address1: savedUser.address_info.address1 || '',
                    address2: savedUser.address_info.address2 || '',
                    city: savedUser.address_info.city || '',
                    province: savedUser.address_info.province || '',
                    country: savedUser.address_info.country || '',
                    zip: savedUser.address_info.zip || '',
                    address_type: savedUser.address_info.address_type || '',
                })
            }
        }
        return () => {
            isSubscribe = false
        }
    }, [isAuth])
    

    useEffect(() => {
        let isSubscribed = true

        function getTotal() {
            if (isSubscribed) {
                setItemTotal(cartItems.reduce((acc, item) => acc + ((codeDiscount ? item.discount : item.price) * item.qty), 0))
                setOrigPriceTotal(cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0))
            }
        }

        getTotal()

        return () => {
            isSubscribed = false
        }
    }, [cartItems, codeDiscount])

    useEffect(() => {
        let isSubscribe = true
        if (isSubscribe) {
            setDiscountCode(localStorage.getItem('code') || '')
        }
        return () => {
            isSubscribe = false
        }
    }, [])
    

    useEffect(() => {
        let isSubscribed = true
        let addressData = {
            'city': '',
            'province': '',
            'country': ''
        }
        async function getDeliveryFee() {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/getdeliveryamount/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
            })
                .then(async (res) => {
                    let data = await res.json()
                    if (isSubscribed) {
                        setDeliveryFee(data.amount)
                    }
                })
            
        }
        getDeliveryFee()
        return () => {
            isSubscribed = false
        }
    }, [])

    useEffect(() => {
        let isSubscribed = true
        const promoCode = localStorage.getItem('code' || '')
        async function getDiscountCode() {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/verifycode/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    discount_code: promoCode || 0
                })
            })
                .then(async (res) => {
                    let data = await res.json()
                    if (isSubscribed && data.detail !== 'Not found.' && data.code.code_status === 'ACTIVE') {
                        setCodeDiscount(true)
                        setPromoCodeId(data.code.code)
                    } else {
                        setCodeDiscount(false)
                    }
                }).catch(err => setCodeDiscount(false))
            
        }

        if (promoCode !== '') getDiscountCode()
        
        return () => {
            isSubscribed = false
        }
    }, [])

    useEffect(() => {
        let isSubscribe = true
        async function confirmProducts() {
            cartItems.forEach(async (item) => {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/getproductvariant/?slug=${item.slug}`)
                    .then(async (res) => {
                        let data = await res.json()
                        if (isSubscribe) {
                            setOrderProducts(o => {
                                return [
                                    ...o,
                                    {
                                        variant: data[0].variant_id,
                                        quantity: item.qty,
                                        amount: data[0].price,
                                        discount: data[0].discount,
                                        total_amount: item.qty * (!codeDiscount ? data[0].price : data[0].discount)
                                    }
                                ]
                            })
                        }
                    })
                    .catch(err => alert('Invalid products, please refresh the page.'))
            })
        }
        confirmProducts()
        return () => {
            isSubscribe = false
        }
    }, [cartItems, codeDiscount])

    const bcTree: bcType[] = [{text: 'Home',url: '/'},{text: 'Checkout',url: ''}]
    
    return (
        <>
            <Meta title="Checkout | Le REUSSI" />
            <div className="container-outer">
                <div className="container-inner">
                    <Breadcrumb bcTree={bcTree} />
                    <div className="grid grid-cols-12 py-3 space-x-0 md:space-x-4" style={{ minHeight: "50vh" }}>
                        <div className="col-span-12 md:col-span-8">
                            <div className="text-2xl font-bold text-gumbo">
                                Checkout Order
                            </div>
                            <div className="text-sm text-slate-500 float-right">Total</div>
                            <div className="text-sm text-slate-500 mb-3 border-b border-gray-300">Your cart</div>
                            {
                                cartItems.length > 0 ?
                                <div className="max-h-96 overflow-auto">
                                    <CheckoutCart isDiscounted={codeDiscount} cartItems={cartItems} removeItem={removeItem} updateQty={updateQty} />
                                </div>
                                :
                                <div className="text-slate-400 italic text-center">Your cart is empty.</div>
                            }
                            <div className="mt-4 text-sm text-slate-500 mb-3 border-b border-gray-300">Discount Code</div>
                            <div className="w-full relative">
                                <input 
                                    type="text"
                                    className="textfield"
                                    name="discount_code"
                                    id="discount_code"
                                    value={discountCode}
                                    onChange={discountCodeOnChange}
                                />
                                <button className="float-right absolute right-3 top-3 py-1 px-2 text-sm rounded text-white bg-pizza-700 hover:bg-pizza-600 transition ease-in-out duration-300" onClick={confirmCode}>Apply</button>
                            </div>
                            <div className="mt-4 text-sm text-slate-500 mb-3 border-b border-gray-300">Order Date and Time</div>
                            <div className="w-full">
                                <DatePicker 
                                    selected={orderDate} 
                                    onChange={(date: Date) => setOrderDate(date)} 
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="time"
                                    dateFormat="MM/d/yyyy h:mm aa"
                                    className="textfield"
                                />
                            </div>
                            <div className="float-right mt-3">
                                <Link href={isAuth ? '/profile' : '/login'} className="text-sm text-pizza-700 hover:text-pizza-600 transition-colors ease-in-out duration-300">{isAuth ? 'Edit Profile' : 'Have an account? Login here!'}</Link>
                            </div>
                            <div className="mt-4 text-sm text-slate-500 mb-3 border-b border-gray-300">Customer Details</div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="First name"
                                        id="firstName"
                                        name="firstName"
                                        value={customerDetail.firstName}
                                        onChange={onChangeText} 
                                        readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="Last name" 
                                        id="lastName"
                                        name="lastName"
                                        value={customerDetail.lastName}
                                        onChange={onChangeText}
                                        readOnly={isAuth ? true : false} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-1">
                                    <input 
                                        type="email" 
                                        className="textfield" 
                                        placeholder="Email address"
                                        id="emailAddress"
                                        name="emailAddress"
                                        value={customerDetail.emailAddress}
                                        onChange={onChangeText}
                                        readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="Contact Number" 
                                        name="contactNumber"
                                        id="contactNumber"
                                        value={customerDetail.contactNumber}
                                        onChange={onChangeText}
                                        readOnly={isAuth ? true : false} />
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-slate-500 mb-3 border-b border-gray-300">Shipping Address</div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="Steet/Block/Building/Address 1" 
                                        id="address1"
                                        name="address1"
                                        value={shippingAddress.address1}
                                        onChange={onChangeAddress}
                                        readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="Barangay, City/Address 2" 
                                        id="address2"
                                        name="address2"
                                        value={shippingAddress.address2}
                                        onChange={onChangeAddress}
                                        readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="City"
                                        id="city"
                                        name="city"
                                        value={shippingAddress.city}
                                        onChange={onChangeAddress}
                                        readOnly={isAuth ? true : false} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="Zip Code" 
                                        id="zip"
                                        name="zip"
                                        value={shippingAddress.zip}
                                        onChange={onChangeAddress}
                                        readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="Province" 
                                        id="province"
                                        name="province"
                                        value={shippingAddress.province}
                                        onChange={onChangeAddress}
                                        readOnly={isAuth ? true : false} />
                                </div>
                                <div className="p-1">
                                    <input 
                                        type="text" 
                                        className="textfield" 
                                        placeholder="Country" 
                                        id="country"
                                        name="country"
                                        value={shippingAddress.country}
                                        onChange={onChangeAddress}
                                        readOnly={isAuth ? true : false} />
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
                            <div className="mt-4 text-sm text-slate-500 mb-3 border-b border-gray-300">Notes</div>
                            <textarea className="textfield" name="orderNotes" id="orderNotes" cols={30} rows={3} onChange={onChangeOrderNotes} value={orderNotes}></textarea>
                        </div>
                        <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
                            <div className="pl-0 md:pl-2">
                                <div className="border border-gray-300 text-gray-500 p-2">
                                    Order Summary
                                </div>
                                <div className="border-r border-l border-b border-gray-300 p-2">
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Order Amount:</span> <span className="float-right">{phpesos.format(origPriceTotal)}</span></div>
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Total Discount:</span> <span className="float-right">({phpesos.format(origPriceTotal - itemTotal)})</span></div>
                                    <div className="text-sm text-gray-500 mb-2"><span className="font-bold">Delivery Fee:</span> <span className="float-right">{phpesos.format(deliveryFee)}</span></div>
                                    <div className="text-gray-500"><span className="font-bold">Total Amount:</span> <span className="float-right font-bold">{phpesos.format(itemTotal + deliveryFee)}</span></div>
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
                                                multiple
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
                                    {
                                        isOrderSubmitting ? 
                                            <button 
                                                className="bg-gray-400 hover:bg-gray-300 transition-all ease-in-out duration-300 text-white cursor-default rounded-3xl px-3 py-2 text-sm font-bold flex items-center group w-full md:w-auto justify-end md:justify-center" 
                                                onClick={submitOrder} 
                                                disabled>
                                                    <div className="flex items-center gap-2 text-pizza-200">
                                                        <span className="h-6 w-6 block rounded-full border-4 border-t-pizza-400 animate-spin"></span>
                                                        loading...
                                                    </div>
                                            </button>
                                        :
                                        <>
                                            <button 
                                                className="bg-pizza-700 hover:bg-pizza-600 transition-all ease-in-out duration-300 text-white cursor-pointer rounded-3xl px-3 py-2 text-sm font-bold flex items-center group w-full md:w-auto justify-end md:justify-center" 
                                                onClick={submitOrder} 
                                                disabled={orderProducts.length > 0 ? false : true}>
                                                    {orderProducts.length || cartItems.length > 0 ? 'Submit Order' : 'Empty Cart'} <ChevronRightIcon className="w-4 h-4 inline transition-all ease-in-out duration-300 ml-1 md:-ml-3 opacity-100 md:opacity-0 group-hover:opacity-100 group-hover:ml-1" />
                                            </button>
                                        </>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}