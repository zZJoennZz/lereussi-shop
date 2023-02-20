import Image from "next/image";
import { Cart } from "@/types";
import { phpesos } from "@/utilities";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CheckoutCart({isDiscounted, cartItems, removeItem, updateQty}:{isDiscounted: boolean, cartItems: Cart[], removeItem: any, updateQty: any}): JSX.Element {
    return <>
        {cartItems.map(cart => 
            <div key={cart.id} className="mb-2 grid grid-cols-12 border-b border-gray-300 pb-2">
                <div className="col-span-2 relative">
                    <div className="bg-red-600 text-white rounded-full w-6 h-6 z-10 flex items-center justify-center absolute top-0 -left-0 cursor-pointer" onClick={() => removeItem(cart.id)}><XMarkIcon className="inlinie w-4 h-4" /></div>
                    <Image src={cart.img} alt={cart.name} fill className="w-11/12 h-28 object-cover rounded-lg" />
                </div>
                <div className="col-span-8 pl-2">
                    <div className="text-2xl font-bold text-pizza-700 mb-1">{cart.name}</div>
                    <div>
                        <label htmlFor="" className="text-sm text-gray-500">Qty:</label> <input type="number" className="border border-gray-300 p-2 w-16 rounded-lg" value={cart.qty} onChange={(e) => updateQty(e, cart.id, parseInt(e.target.value))} />
                    </div>
                </div>
                <div className="col-span-2 text-right relative">
                    <div className="text-xs text-gray-500">PHP</div>
                    <div className="text-pottersclay">{isDiscounted ? <>{phpesos.format(cart.discount * cart.qty || 0)} <span className="line-through text-sm">{phpesos.format(cart.price * cart.qty || 0)}</span></> : cart.price }</div>
                </div>
            </div>
        )}
    </>
}