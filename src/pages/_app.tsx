import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/Layout'
import LayoutWithSidebar from '@/components/LayoutWithSidebar'
import '@/styles/globals.css'

//Fetching the layouts
const layouts: any = {
  LWS: LayoutWithSidebar,
  L: Layout
}

export default function App({ Component, pageProps }: AppProps) {

  //Setting which layout to use
  let comp: any = Component
  const LayoutUsed: any = layouts[comp.Layout] || Layout

  return (
    <RecoilRoot>
      <LayoutUsed>
        <Component {...pageProps} />
      </LayoutUsed>
    </RecoilRoot>
  )
}
