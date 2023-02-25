import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from "next/router"
import { branchState, cartItemsState } from '@/atoms'
import { ProductVariant, Cart, Breadcrumb as bcType } from "@/types"
import { useKeenSlider } from "keen-slider/react"
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid"
import { addToCartInLocalStorage } from '@/utilities'
import Breadcrumb from "@/components/Breadcrumb"
import ThumbnailPlugin from "@/plugins/ThumbnailPlugin"
import Meta from '@/components/Meta'
import "keen-slider/keen-slider.min.css"

ProductPage.Layout = "LWS"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const product = await fetch(`${process.env.API_URL}v1/shop/getproductvariant/?slug=${context.query.slug}`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err))
    return {
        props: {
            product: product[0]
        }
    }
}

export default function ProductPage({product}: {product: ProductVariant}): JSX.Element {
    const selectedBranch = useRecoilValue(branchState)
    const [quantity, setQuantity] = useState(1)
    const [stocks, setStocks] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0
    })
    const [thumbnailRef] = useKeenSlider<HTMLElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10
            }
        },
        [ThumbnailPlugin(instanceRef)]
    )
    
    const [cartItems, setCartItems] = useRecoilState(cartItemsState)

    function addToCart (itemId: string, qty: number) {
        let selectedItem = cartItems.filter(cart => cart.id === itemId)
        if (selectedItem.length > 0) {
            setCartItems((items): Cart[] => {
                let newItems = items.map((item) => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            qty: selectedItem[0].qty + qty
                        }
                    }
                    return item
                })
                addToCartInLocalStorage(newItems)
                return newItems
            })
        } else {
            setCartItems(items => {
                let newRec = [
                    ...items,
                    {
                        id: product.variant_id,
                        name: product.variant_name,
                        qty: qty,
                        price: product.price,
                        img: product.variant_image,
                        slug: product.meta.page_slug,
                        discount: product.discount
                    }
                ]
                addToCartInLocalStorage(newRec)
                return newRec
            })
        }
    }

    function handleQty (e: React.ChangeEvent<HTMLInputElement>) {
        setQuantity(parseInt(e.target.value))
    }

    useEffect(() => {
        let isSubscribe = true

        async function getStock() {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/getproductvariant/?` + new URLSearchParams({
                slug: product.meta.page_slug,
                branch_id: selectedBranch
            }))
                .then(async (res) => {
                    let data = await res.json()
                    if (isSubscribe) {
                        setStocks(data[0].stocks)
                    }
                })
                .catch(err => alert('Cannot fetch item!'))
        }

        getStock()

        return () => {
            isSubscribe = false
        }
    }, [selectedBranch])

    if (!product) return <div className="flex justify-center">Loading...</div>

    const bcTree: bcType[] = [{text: 'Home',url: '/'},{text: 'Product',url: '/product'},{text: product.variant_name, url: ''}]

    
    return (
        <>
            <Meta title={ product.variant_name + ` | Le REUSSI`} />
            <div className="lws-container">
                <div className="lws-container-inner">
                    <Breadcrumb bcTree={bcTree} />
                    <div className="grid grid-cols-12 space-x-0 md:space-x-2 mb-3">
                        <div className="col-span-12 md:col-span-7 order-2 md:order-1 flex flex-col items-start justify-center">
                            <div className="text-4xl font-bold text-gumbo mb-2">{ product.variant_name }</div>
                            <div className="mb-4">
                                <StarIcon className="inline h-6 w-6 text-pizza-500" />
                                <StarIcon className="inline h-6 w-6 text-pizza-500" />
                                <StarIcon className="inline h-6 w-6 text-pizza-500" />
                                <StarIcon className="inline h-6 w-6 text-pizza-500" />
                                <StarIcon className="inline h-6 w-6 text-pizza-500" />
                            </div>
                            <div className="mb-4">
                                <span className="text-gray-500 font-bold">PHP</span> <span className="text-3xl font-bold text-slate-700">{ product.price }</span>
                            </div>
                            <div className="mb-3">
                                <input type="number" min={0} value={quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleQty(e)} className="w-24 p-2 float-left mr-3 outline-none border border-slate-300 rounded-lg" placeholder="Qty" /> <button className="bg-pizza-600 text-white p-2 rounded-3xl flex items-center justify-center" onClick={() => addToCart(product.variant_id, quantity)}><ShoppingCartIcon className="inline h-6 w-6" /> Add to cart</button>
                            </div>
                            <div className="mb-5 text-sm text-gray-600">
                                <span className="font-bold">Stocks:</span> {stocks}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-5 order-1 md:order-2 mb-2 md:mb-0">
                            <div ref={sliderRef} className="keen-slider min-h-[250px] mb-2">
                                <div className="keen-slider__slide" style={{ backgroundImage: `url(${product.variant_image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                                {
                                    product.media.map(media =>  <div key={media.id} className="keen-slider__slide" style={{ backgroundImage: `url(${media.attachment})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>)
                                }
                            </div>

                            <div ref={thumbnailRef} className="keen-slider thumbnail min-h-[50px]">
                            <div className="keen-slider__slide" style={{ backgroundImage: `url(${product.variant_image})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                                {
                                    product.media.map(media =>  <div key={media.id} className="keen-slider__slide" style={{ backgroundImage: `url(${media.attachment})`, backgroundPosition: 'center', backgroundSize: 'cover' }}></div>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mb-3 md:mb-0">
                        <div className="text-sm uppercase text-gray-400 font-bold">Description</div>
                        {product.variant_description}
                    </div>
                </div>
            </div>
        </>
    )
}