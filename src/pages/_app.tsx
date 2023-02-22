import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import Layout from '@/components/Layout'
import LayoutWithSidebar from '@/components/LayoutWithSidebar'
import Authentication from '@/components/Authentication'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import '@/styles/globals.css'
import { NextRouter, useRouter } from 'next/router'

//Fetching the layouts
const layouts: any = {
  LWS: LayoutWithSidebar,
  L: Layout
}

export default function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter()
  const refCode: any = router.query.code;
  useEffect(() => {
    if (refCode) localStorage.setItem('code', refCode)
  }, [refCode])

  //Setting which layout to use
  let comp: any = Component
  const LayoutUsed: any = layouts[comp.Layout] || Layout
  
  return (
    <RecoilRoot>
      <LayoutUsed>
        <Authentication router={router} Component={Component} pageProps={pageProps} />
        <ToastContainer />
      </LayoutUsed>
    </RecoilRoot>
  )
}