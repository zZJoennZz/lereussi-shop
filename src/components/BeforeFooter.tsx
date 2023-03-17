import styles from '@/styles/BeforeFooter.module.css';
import { QuestionMarkCircleIcon, GiftIcon, ShoppingBagIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

export default function BeforeFooter(): JSX.Element {
  return (
    <div className={styles.beforeFooter}>
      <div className={styles.innerBeforeFooter}>
        <div className="group cursor-pointer">
          <div className="text-gumbo group-hover:text-slate-600 transition-all ease-in-out duration-300">
            <QuestionMarkCircleIcon className="w-20 h-20 mx-auto mb-4" />
          </div>
          <div className="font-bold text-slate-600">24 x 7 Free Support</div>
          {/* <div className="text-slate-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div> */}
        </div>
        <div className="group cursor-pointer">
          <div className="text-gumbo group-hover:text-slate-600 transition-all ease-in-out duration-300">
            <GiftIcon className="w-20 h-20 mx-auto mb-4" />
          </div>
          <div className="font-bold">Vouchers</div>
          {/* <div className="text-slate-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div> */}
        </div>
        <div className="group cursor-pointer">
          <div className="text-gumbo group-hover:text-slate-600 transition-all ease-in-out duration-300">
            <ShoppingBagIcon className="w-20 h-20 mx-auto mb-4" />
          </div>
          <div className="font-bold">Online Shopping</div>
          {/* <div className="text-slate-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div> */}
        </div>
        {/* <div className="group cursor-pointer">
          <div className="text-gumbo group-hover:text-slate-600 transition-all ease-in-out duration-300">
            <BuildingStorefrontIcon className="w-20 h-20 mx-auto mb-4" />
          </div>
          <div className="font-bold">Store Policy</div>
          <div className="text-slate-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
        </div> */}
      </div>
    </div>
  );
}
