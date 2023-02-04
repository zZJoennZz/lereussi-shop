import Image from 'next/image'
import styles from '@/styles/Product.module.css'
import Meta from "@/components/Meta"
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

//testing
import { Product as ProdType } from '@/types'
import productList from '@/dummyData/products.json'
import darkChoco from '@/img/dark-choco.jpg'

Product.Layout = "LWS"
export default function Product(): JSX.Element {
    const dummyProducts: ProdType[] = productList;
    return (
        <>
            <Meta title="Products | Le REUSSI" />
            <div className="lws-container mb-2 md:mb-0">
                <div className="lws-container-inner">
                    <div className={styles.productPageHeader}>
                        <div className={styles.productPageHeaderText}>Products</div>
                        <div className="flex items-center text-sm justify-end col-span-5">
                            <label htmlFor="sort-by" className="text-slate-500">Sort by</label>
                            <select name="sort-by" id="sort-by" className={styles.sortBy}>
                                <option value="">Default</option>
                                <option value="">Name (A - Z)</option>
                                <option value="">Name (Z - A)</option>
                                <option value="">Price (Low {'>'} High)</option>
                                <option value="">Price (High {'<'} LowLow)</option>
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
                                                <div className={`font-bold text-right ` + styles.productListingPrice}>PHP 100</div>
                                                <div className="text-xs text-right line-through">PHP 400</div>
                                            </span>
                                            <div className="text-xl text-pizza-600 font-bold">{item.name}</div>
                                            <div className="text-gray-500 text-xs italic mb-3">Product Type: {item.category}</div>
                                            <div>
                                                <Image src={darkChoco} alt="Dark Chocolate" className="rounded-xl" />
                                            </div>
                                            <div className="w-full grid grid-cols-2 pt-2 space-x-1">
                                                <div>
                                                    <button className={styles.addToCartBtn}><ShoppingCartIcon className="inline h-4 w-4 mr-1" />Add to cart</button>
                                                </div>
                                                <div>
                                                    <button className={styles.viewDetailBtn}><MagnifyingGlassIcon className="inline h-4 w-4 mr-1" />View Detail</button>
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