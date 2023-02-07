import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/Product.module.css'
import Meta from "@/components/Meta"
import { useRecoilState } from 'recoil'
import { cartItemsState } from '@/atoms'
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { addToCartInLocalStorage } from '@/utilities'
import Breadcrumb from "@/components/Breadcrumb"

//testing
import { Product as ProdType, Breadcrumb as bcType, Cart } from '@/types'
import productList from '@/dummyData/products.json'
import darkChoco from '@/img/dark-choco.jpg'

Product.Layout = "LWS"
export default function Product(): JSX.Element {
    const [cartItems, setCartItems] = useRecoilState(cartItemsState)
    const dummyProducts: ProdType[] = productList;
    const bcTree: bcType[] = [{text: 'Home',url: '/'},{text: 'Product',url: ''}]

    function addToCart (itemId: number) {
        let selectedItem = cartItems.filter(cart => cart.id === itemId)
        let itemPrice = dummyProducts.filter(prod => prod.id === itemId)[0].salePrice
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
            const newItem = dummyProducts.filter(item => item.id === itemId)
            setCartItems(items => {
                let newRec = [
                    ...items,
                    {
                        id: itemId,
                        name: newItem[0].name,
                        qty: 1,
                        price: itemPrice
                    }
                ]
                addToCartInLocalStorage(newRec)
                return newRec
            })
        }
    }
    
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
                            <select name="sort-by" id="sort-by" className={styles.sortBy}>
                                <option value="">Default</option>
                                <option value="">Name (A - Z)</option>
                                <option value="">Name (Z - A)</option>
                                <option value="">Price (Low {'>'} High)</option>
                                <option value="">Price (High {'<'} Low)</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className={styles.productsListContainer}>
                            {
                                dummyProducts.map(item => 
                                    <div key={item.id} className="col-span-12 md:col-span-6 xl:col-span-4 p-1">
                                        <div className={styles.productsListCard}>
                                            <span className="absolute top-3 right-3">
                                                <div className={`font-bold text-right ` + styles.productListingPrice}>PHP {item.price === item.salePrice ? item.price : item.salePrice}</div>
                                                
                                                {item.price === item.salePrice ? '' : <div className="text-xs text-right line-through">PHP {item.price}</div> }
                                            </span>
                                            <div className="text-xl text-pizza-600 font-bold"><Link href={`/product/${item.slug}`}>{item.name}</Link></div>
                                            <div className="text-gray-500 text-xs italic mb-3">Product Type: {item.category}</div>
                                            <div>
                                                <Image src={darkChoco} priority alt="Dark Chocolate" className="rounded-xl" />
                                            </div>
                                            <div className="w-full grid grid-cols-2 pt-2 space-x-1">
                                                <div>
                                                    <button onClick={() => addToCart(item.id)} className={styles.addToCartBtn}><ShoppingCartIcon className="inline h-3 w-3 mr-1" />Add to cart</button>
                                                </div>
                                                <div>
                                                    <Link href={`/product/${item.slug}`} className={styles.viewDetailBtn}><MagnifyingGlassIcon className="inline h-3 w-3 mr-1" />View Detail</Link>
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