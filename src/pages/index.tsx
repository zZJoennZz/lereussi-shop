import { GetServerSidePropsContext } from 'next'
import Meta from '@/components/Meta'
import HeroSlider from '@/components/HeroSlider'
import SearchInHome from '@/components/SearchInHome'
import CategoryCarousel from '@/components/CategoryCarousel'
import BeforeFooter from '@/components/BeforeFooter'

import { Category, HeroSliderContent, Page } from '@/types'

import carousel1 from '@/img/carousel1.jpg'
import carousel2 from '@/img/carousel2.jpeg'

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
  return {
    props: {
      categories: getCategories,
      pageContent: getHomePage
    }
  }
}

export default function Home({categories, pageContent}: {categories: Category[], pageContent: Page[]}) {
  const testSliderItems: HeroSliderContent[] = [
    {
      backgroundImg: carousel1.src,
      promoText: "Save up to 40% TODAY!",
      mainText: "LET GET THAT BREAD!",
      description: "Lorem ipsum!",
      buttonText: "Check it out!",
      buttonUrl: "#",
    },
    {
      backgroundImg: carousel2.src,
      promoText: "Save up to 40% TODAY!",
      mainText: "LET GET THAT BREAD!",
      description: "Lorem ipsum!",
      buttonText: "Check it out!",
      buttonUrl: "#",
    }
  ]

  return (
    <>
      <Meta 
        title={pageContent[0].pageTitle || "Le REUSSI"}
        metaDescription={pageContent[0].metaDescription}
        robots={pageContent[0].metaRobots}
        keywords={pageContent[0].metaKeywords}
      />
      <div style={{minHeight: '60vh'}}>
        <HeroSlider sliderContent={testSliderItems} />
        <SearchInHome />
        <CategoryCarousel categories={categories} />
        <BeforeFooter />
      </div>
    </>
  )
}
