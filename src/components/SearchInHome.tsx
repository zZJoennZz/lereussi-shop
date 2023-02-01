import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import styles from '@/styles/SearchInHome.module.css'
import sectionBg from '@/img/search-bg.png'

export default function SearchInHome(): JSX.Element {
    return (
        <div className={styles.searchSection}>
            <div className={styles.searchSectionInner} style={{ background: `url(${sectionBg.src})`, backgroundSize: 'contain', backgroundPosition: 'bottom left', backgroundRepeat: 'no-repeat'}}>
                <div className="section-title">Search your product</div>
                <div className={styles.searchInput}>
                    <input type="text" name="search-site" id="search-site" className="w-64 p-4 bg-transparent outline-none" placeholder="Search for products..." />
                    <button className="inline rounded-full bg-pizza-700 hover:bg-pizza-600 transition-all ease-in-out duration-300 text-white p-4"><MagnifyingGlassIcon className="inline w-6 h-6" /></button>
                </div>
            </div>
        </div>
    )
}