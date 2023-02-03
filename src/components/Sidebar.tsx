import styles from '@/styles/Sidebar.module.css'
import Link from 'next/link'
import { Category } from '@/types'
interface SidebarProps {
    categories: Category[]
}
export default function Sidebar({categories} : SidebarProps ): JSX.Element {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarInner}>
                <div className={styles.sidebarHeader}>
                    Product Types
                </div>
                <ul className={styles.sidebarByCategoryList}>
                    {
                        categories.map(cat => <li key={cat.id}><Link href={`product-type/${cat.slug}`}>{cat.name}</Link></li>)
                    }
                </ul>
            </div>
        </div>
    )
}