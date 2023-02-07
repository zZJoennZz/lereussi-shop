import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import Layout from '@/components/Layout'
import LayoutWithSidebar from '@/components/LayoutWithSidebar'
import Authentication from '@/components/Authentication'

import '@/styles/globals.css'
import { NextRouter, useRouter } from 'next/router'

//Fetching the layouts
const layouts: any = {
  LWS: LayoutWithSidebar,
  L: Layout
}

export default function App({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter()
  //Setting which layout to use
  let comp: any = Component
  const LayoutUsed: any = layouts[comp.Layout] || Layout
  
  return (
    <RecoilRoot>
      <LayoutUsed>
        <Authentication router={router} Component={Component} pageProps={pageProps} />
      </LayoutUsed>
    </RecoilRoot>
  )
}