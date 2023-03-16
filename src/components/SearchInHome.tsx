import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import styles from '@/styles/SearchInHome.module.css';
import sectionBg from '@/img/search-bg.png';

export default function SearchInHome(): JSX.Element {
  return (
    <div className={styles.searchSection}>
      <div
        className={styles.searchSectionInner}
        style={{ background: `url(${sectionBg.src})`, backgroundSize: 'contain', backgroundPosition: 'bottom left', backgroundRepeat: 'no-repeat' }}
      >
        <div className="section-title mb-6 text-slate-600">Search your product</div>
        <div className={styles.searchInput}>
          <form action="/product">
            <input type="text" name="search" id="search" className="w-64 p-4 bg-transparent outline-none" placeholder="Search for products..." />
            <button type="submit" className="inline rounded-full bg-gumbo hover:bg-pizza-600 transition-all ease-in-out duration-300 text-white p-4">
              <MagnifyingGlassIcon className="inline w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
