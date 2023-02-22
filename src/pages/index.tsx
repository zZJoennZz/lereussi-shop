import { GetServerSidePropsContext } from 'next'
import Meta from '@/components/Meta'
import HeroSlider from '@/components/HeroSlider'
import SearchInHome from '@/components/SearchInHome'
import CategoryCarousel from '@/components/CategoryCarousel'
import BeforeFooter from '@/components/BeforeFooter'

import { Category, HeroSliderContent, Page } from '@/types'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const getHomePage = await fetch(`${process.env.API_URL}v1/shop/getpagecontents/?slug=home`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
  const getCategories = await fetch(`${process.env.API_URL}v1/shop/getproducttypes/`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
  const getHeroSlider = await fetch(`${process.env.API_URL}v1/shop/getsectioncomponents`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .catch(err => console.log(err))
  return {
    props: {
      categories: getCategories,
      pageContent: getHomePage,
      heroSlider: getHeroSlider,
    }
  }
}

export default function Home({categories, pageContent, heroSlider}: {categories: Category[], pageContent: Page[], heroSlider: HeroSliderContent[]}) {

  return (
    <>
      <Meta 
        title={pageContent[0].pageTitle || "Le REUSSI"}
        metaDescription={pageContent[0].metaDescription}
        robots={pageContent[0].metaRobots}
        keywords={pageContent[0].metaKeywords}
      />
      <div style={{minHeight: '60vh'}}>
        <HeroSlider sliderContent={heroSlider} />
        <SearchInHome />
        <CategoryCarousel categories={categories} />
        <BeforeFooter />
      </div>
    </>
  )
}
