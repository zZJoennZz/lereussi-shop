import { LayoutProps, Category } from '@/types';
import { Inter } from '@next/font/google';
import Sidebar from './Sidebar';

//components
import Menu from './Menu';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export default function LayoutWithSidebar({ children, isAuth }: LayoutProps) {

    const testCategories: Category[] = [
        {
          id: 1,
          name: 'Coffee',
          slug: 'coffee',
        },
        {
          id: 2,
          name: 'Hot Tea',
          slug: 'hottea',
        },
        {
          id: 3,
          name: 'Milk Tea',
          slug: 'milktea',
        },
        {
          id: 4,
          name: 'Bread',
          slug: 'bread',
        },
        {
          id: 5,
          name: 'Roll Cake',
          slug: 'rollcake',
        },
        {
          id: 6,
          name: 'Pastries',
          slug: 'pastries',
        },
      ]

    return (
        <>
          <div className={inter.className}>
              <Menu isAuth />
              <div className="min-h-screen md:w-5/6 lg:w-3/4 mx-auto p-2 mt-3">
                  <div className="grid grid-cols-12 mt-2">
                      <div className="col-span-12 md:col-span-3 order-2 md:order-1">
                          <Sidebar categories={testCategories} />
                      </div>
                      <div className="col-span-12 md:col-span-9 order-1 md:order-2">
                          {children}
                      </div>
                  </div>
              </div>
              <Footer isAuth />
          </div>
        </>
    )
}