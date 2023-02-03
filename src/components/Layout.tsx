import Head from 'next/head'
import { LayoutProps } from '@/types';
import { Inter } from '@next/font/google';

//components
import Menu from './Menu';
import Footer from './Footer';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children, isAuth }: LayoutProps) {
    return (
        <>
            <div className={inter.className}>
                <div className="min-h-screen">
                <Menu isAuth />
                {children}
                <Footer isAuth />
                </div>
            </div>
        </>
    )
}