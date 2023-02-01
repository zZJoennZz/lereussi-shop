import Head from 'next/head'
import { ReactNode } from 'react'
import { Inter } from '@next/font/google';

//components
import Menu from './Menu';

interface LayoutProps {
    children: ReactNode
    isAuth: boolean
}

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children, isAuth }: LayoutProps) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="UTF-8" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="30 days" />
            </Head>
            <Menu isAuth />
            <div className={inter.className}>
                {children}
            </div>
        </>
    )
}