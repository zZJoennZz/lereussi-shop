import Meta from '@/components/Meta'
import HeroSlider from '@/components/HeroSlider'
import SearchInHome from '@/components/SearchInHome'
import CategoryCarousel from '@/components/CategoryCarousel'
import BeforeFooter from '@/components/BeforeFooter'

import { Category, HeroSliderContent } from '@/types'

import { AcademicCapIcon } from '@heroicons/react/24/solid'
import carousel1 from '@/img/carousel1.jpg'
import carousel2 from '@/img/carousel2.jpeg'

export default function Home() {

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

  const testCategories: Category[] = [
    {
      id: 1,
      name: 'Coffee',
      slug: 'coffee',
      icon: <AcademicCapIcon className="h-32 w-32 lg:h-52 lg:w-52" />
    },
    {
      id: 2,
      name: 'Hot Tea',
      slug: 'hottea',
      icon: <AcademicCapIcon className="h-32 w-32 lg:h-52 lg:w-52" />
    },
    {
      id: 1,
      name: 'Milk Tea',
      slug: 'milktea',
      icon: <AcademicCapIcon className="h-32 w-32 lg:h-52 lg:w-52" />
    },
    {
      id: 1,
      name: 'Bread',
      slug: 'bread',
      icon: <AcademicCapIcon className="h-32 w-32 lg:h-52 lg:w-52" />
    },
    {
      id: 1,
      name: 'Roll Cake',
      slug: 'rollcake',
      icon: <AcademicCapIcon className="h-32 w-32 lg:h-52 lg:w-52" />
    },
    {
      id: 1,
      name: 'Pastries',
      slug: 'pastries',
      icon: <AcademicCapIcon className="h-32 w-32 lg:h-52 lg:w-52" />
    },
  ]


  return (
    <>
      <Meta title='Home | Le REUSSI' />
      <div style={{minHeight: '60vh'}}>
        <HeroSlider sliderContent={testSliderItems} />
        <SearchInHome />
        <CategoryCarousel categories={testCategories} />
        <BeforeFooter />
      </div>
    </>
  )
}
