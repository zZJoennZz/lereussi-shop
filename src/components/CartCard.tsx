import Image from 'next/image'
import styles from '@/styles/Menu.module.css'
import { Cart } from '@/types'
import { XCircleIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { cartItemsState } from '@/atoms'
import { addToCartInLocalStorage } from '@/utilities'

//TESTONLY
import darkChoco from '@/img/dark-choco.jpg'

export default function CartCard({cartInfo} : {cartInfo: Cart}, props: any): JSX.Element {
  const [ cartItems, setCartItems ] = useRecoilState(cartItemsState)

  function removeItem(itemId: string) {
    const updatedItem = cartItems.filter(cart => cart.id !== itemId)
    addToCartInLocalStorage(updatedItem)
    setCartItems(updatedItem)
  }

  function updateQty(itemId: string, qty: number) {
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

  return (
    <div className={styles.cartItems} {...props}>
      <span onClick={() => removeItem(cartInfo.id)} className="absolute top-0 left-0 z-10 bg-white rounded-full cursor-pointer">
        <XCircleIcon className="inline w-7 h-7 text-red-600" />
      </span>
      <div className="grid grid-cols-12">
        <div className="col-span-4 relative" style={{minHeight: "150px"}}>
          <Image src={cartInfo.img} alt={cartInfo.name} fill className="w-full rounded-xl object-cover" />
        </div>
        <div className="col-span-8 px-4">
          <div className="text-xl font-bold text-slate-600">{cartInfo.name}</div>
          <div>
            <label htmlFor="cart-qty" className="mr-2">
              Quantity:
            </label>
            <input id="cart-qty" type="number" className="border border-slate-300 p-1 w-16" value={cartInfo.qty} onChange={(e) => updateQty(cartInfo.id, parseInt(e.target.value))} />
          </div>
        </div>
      </div>
    </div>
  );
}
