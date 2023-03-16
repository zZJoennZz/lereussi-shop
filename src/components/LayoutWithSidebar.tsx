import { LayoutProps } from '@/types';
import { Inter } from '@next/font/google';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';

//components
import Menu from './Menu';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export default function LayoutWithSidebar({ children }: LayoutProps) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let isSub = true;

    async function getCategories() {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}v1/shop/getproducttypes/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (isSub) {
            setCategories(res);
          }
        })
        .catch((err) => console.log(err));
    }

    getCategories();

    return () => {
      isSub = false;
    };
  }, []);

  return (
    <>
      <div className={inter.className}>
        <Menu />
        <div className="min-h-screen md:w-5/6 lg:w-3/4 mx-auto p-2 mt-3">
          <div className="grid grid-cols-12 mt-2">
            <div className="col-span-12 md:col-span-3 order-2 md:order-1">
              {categories.length > 0 ? <Sidebar categories={categories} /> : 'Loading...'}
            </div>
            <div className="col-span-12 md:col-span-9 order-1 md:order-2">{children}</div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
