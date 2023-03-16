import styles from '@/styles/Sidebar.module.css';
import Link from 'next/link';

export default function Sidebar({ categories }: any): JSX.Element {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <div className={styles.sidebarHeader}>Product Types</div>
        <ul className={styles.sidebarByCategoryList}>
          {categories.map((cat: any) => (
            <li key={cat.meta.id}>
              <Link href={`/product?category=${cat.meta.page_slug}`}>{cat.product_type}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
