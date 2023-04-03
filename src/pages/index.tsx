import { GetServerSidePropsContext } from 'next';
import Meta from '@/components/Meta';
import HeroSlider from '@/components/HeroSlider';
import SearchInHome from '@/components/SearchInHome';
import CategoryCarousel from '@/components/CategoryCarousel';
import BeforeFooter from '@/components/BeforeFooter';
import Testimonials from '@/components/Testimonials';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const getHomePage = await fetch(`${process.env.API_URL}v1/shop/getpagecontents/?page_slug=home`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const getCategories = await fetch(`${process.env.API_URL}v1/shop/getproducttypes/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const getProducts = await fetch(`${process.env.API_URL}v1/shop/getproductvariants/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  return {
    props: {
      pageContent: getHomePage,
      categories: getCategories,
      products: getProducts,
    },
  };
}

export default function Home({ pageContent, categories, products }: any) {
  return (
    <>
      <Meta
        title={pageContent[0].pageTitle || 'Le REUSSI'}
        metaDescription={pageContent[0].metaDescription}
        robots={pageContent[0].metaRobots}
        keywords={pageContent[0].metaKeywords}
      />
      <div style={{ minHeight: '60vh' }}>
        {pageContent[0].page_component &&
          pageContent[0].page_component.map((component: any) => {
            return (
              <div key={component.name}>
                {component.name === 'HeroCarousel' && <HeroSlider sliderContent={component.section_component} />}
                {component.name === 'SearchInHome' && <SearchInHome />}
                {component.name === 'CategoriesCarousel' && <CategoryCarousel products={products} categories={categories} />}
                {component.name === 'Testimonials' && <Testimonials testimonials={component.section_component} />}
              </div>
            );
          })}

        {/* <BeforeFooter /> */}
      </div>
    </>
  );
}
