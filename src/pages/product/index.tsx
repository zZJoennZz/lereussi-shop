import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Product.module.css'
import Meta from "@/components/Meta"
import Breadcrumb from "@/components/Breadcrumb"
import Pagination from '@/components/Pagination'
import { useRecoilState } from 'recoil'
import { cartItemsState } from '@/atoms'
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { addToCartInLocalStorage, paginate } from '@/utilities'
import { ProductVariant, Breadcrumb as bcType, Cart } from '@/types'

Product.Layout = "LWS"

// export async function getServerSideProps(context: GetServerSideProps) {
//     let getProducts = await fetch(`${process.env.API_URL}v1/shop/getproductvariants/`)
//         .then(res => res.json())
//         .catch(err => console.log(err))
//     return {
//         props: {
//             products : getProducts
//         }
//     }
// }

export default function Product(): JSX.Element {
    const [products, setProducts] = useState<ProductVariant[]>([])
    const [sortMode, setSortMode] = useState('default');
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    function onPageChange(page: number) {
        setCurrentPage(page)
    }

    const [cartItems, setCartItems] = useRecoilState(cartItemsState)

    const bcTree: bcType[] = [{text: 'Home',url: '/'},{text: 'Product',url: ''}]

    function addToCart (itemId: string) {
        let selectedItem = cartItems.filter(cart => cart.id === itemId)
        let itemPrice = products.filter(prod => prod.variant_id === itemId)[0].price
        if (selectedItem.length > 0) {
            setCartItems((items): Cart[] => {
                let newItems = items.map((item) => {
                    if (item.id === itemId) {
                        return {
                            ...item,
                            qty: selectedItem[0].qty + 1
                        }
                    }
                    return item
                })
                addToCartInLocalStorage(newItems)
                return newItems
            })
        } else {
            const newItem = products.filter(item => item.variant_id === itemId)
            setCartItems(items => {
                let newRec = [
                    ...items,
                    {
                        id: itemId,
                        name: newItem[0].variant_name,
                        qty: 1,
                        price: itemPrice,
                        img: newItem[0].variant_image,
                        slug: newItem[0].meta.page_slug,
                        discount: newItem[0].discount
                    }
                ]
                addToCartInLocalStorage(newRec)
                return newRec
            })
        }
    }

    let paginatedProducts = paginate(products, currentPage, pageSize)

    function sortProducts(a: ProductVariant, b: ProductVariant): any {
        if (sortMode === 'a2z' || sortMode === 'z2a') {
            let textA = a.variant_name.toUpperCase()
            let textB = b.variant_name.toUpperCase()
            if (sortMode === 'a2z') return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            else return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        } else if (sortMode === 'l2h' || sortMode === 'h2l') {
            let priceA = a.price
            let priceB = b.price
            if (sortMode === 'l2h') return (priceA > priceB) ? -1 : (priceA < priceB) ? 1 : 0;
            else return (priceA < priceB) ? -1 : (priceA > priceB) ? 1 : 0;
        } else {
            return a;
        }
    }

    useEffect(() => {
        let isSub = true

        async function getProducts() {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/getproductvariants/?branch_id=${localStorage.getItem('branch') || ''}`)
                .then(async (res) => {
                    let data = await res.json()
                    setProducts(data)
                })
                .catch(err => alert('Cannot fetch item!'))
        }

        getProducts()

        return () => {
            let isSub = false
        }
    }, [])
    
    
    return (
        <>
            <Meta title="Products | Le REUSSI" />
            <div className="lws-container mb-2 md:mb-0">
                <div className="lws-container-inner">
                    <Breadcrumb bcTree={bcTree} />
                    <div className={styles.productPageHeader}>
                        <div className={styles.productPageHeaderText}>Products</div>
                        <div className="flex items-center text-sm justify-end col-span-5">
                            <label htmlFor="sort-by" className="text-slate-500">Sort by</label>
                            <select name="sort-by" id="sort-by" onChange={(e: any) => setSortMode(e.target.value)} className={styles.sortBy}>
                                <option value="default">Default</option>
                                <option value="a2z">Name (A - Z)</option>
                                <option value="z2a">Name (Z - A)</option>
                                <option value="l2h">Price (Low {'>'} High)</option>
                                <option value="h2l">Price (High {'<'} Low)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className={styles.productsListContainer}>
                            {
                                paginatedProducts.sort((a, b) => {
                                    return sortProducts(a, b)
                                }).map((item: ProductVariant) => 
                                    <div key={item.variant_id} className="col-span-12 md:col-span-6 xl:col-span-4 p-1">
                                        <div className={styles.productsListCard}>
                                            <span className="absolute top-3 right-3">
                                                <div className={`font-bold text-right ` + styles.productListingPrice}>PHP {item.price}</div>
                                            </span>
                                            <div className="text-xl text-pizza-600 font-bold" style={{ maxWidth: '150px' }}><Link href={`/product/${item.meta.page_slug}`}>{item.variant_name}</Link></div>
                                            <div className="text-gray-500 text-xs italic mb-3">Product Type: {item.product_type}</div>
                                            <div className="w-full h-52 relative">
                                                <Image src={item.variant_image} fill alt={item.variant_name} className="rounded-xl object-cover" />
                                            </div>
                                            <div className="w-full grid grid-cols-2 pt-2 space-x-1">
                                                {
                                                    item.stocks === 0 ? <>
                                                        <div className="bg-red-600 text-white text-center col-span-2 text-sm py-1 rounded">
                                                            Availability: Out of stock!
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div>
                                                            <button onClick={() => addToCart(item.variant_id)} className={styles.addToCartBtn}><ShoppingCartIcon className="inline h-3 w-3 mr-1" />Add to cart</button>
                                                        </div>
                                                        <div>
                                                            <Link href={`/product/${item.meta.page_slug}`} className={styles.viewDetailBtn}><MagnifyingGlassIcon className="inline h-3 w-3 mr-1" />View Detail</Link>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <Pagination
                            items={products.length}
                            currentPage={currentPage}
                            pageSize={pageSize}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}