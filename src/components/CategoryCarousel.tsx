import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import styles from '@/styles/CategoryCarousel.module.css';
import 'keen-slider/keen-slider.min.css';
import { Category } from '@/types';

// import sectionBg from '@/img/category-bg.svg'

export default function CategoryCarousel({ categories, products }: { categories: any[]; products: any[] }): JSX.Element {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 650px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(max-width: 450px)': {
        slides: { perView: 1 },
      },
    },
  });

  return (
    <div className={styles.categoryCarousel}>
      <div className={styles.categoryCarouselInner}>
        <div className="section-title text-center mb-10 text-gray-600">Shop by {categories.length >= 2 ? 'Category' : 'Product'}</div>
        <div ref={ref} className="keen-slider py-10">
          {categories.length >= 2
            ? categories.map((cat: Category) => (
                <a href={`/product/?category=${cat.meta.page_slug}`} key={cat.meta.id}>
                  <div className="keen-slider__slide bg-ebb hover:bg-pizza-600 transition-colors ease-in-out duration-300 rounded-3xl text-slate-700 flex items-center justify-center flex-col shadow-lg shadow-pizza-400 w-36 h-64 group">
                    <Image src={cat.product_type_image || ''} alt={cat.product_type} fill className="object-cover" />
                    <div className="text-center absolute bottom-0 my-3 z-10 text-white bg-pizza-700 w-full transition-all ease-in-out duration-300">
                      <div className="font-bold text-xl">{cat.product_type}</div>
                    </div>
                  </div>
                </a>
              ))
            : products &&
              products.map((prod: any) => (
                <a href={`/product/${prod.meta.page_slug}`} key={prod.variant_id}>
                  <div className="keen-slider__slide bg-ebb hover:bg-pizza-600 transition-colors ease-in-out duration-300 rounded-3xl text-slate-700 flex items-center justify-center flex-col shadow-lg shadow-pizza-400 w-36 h-64 group">
                    <Image src={prod.variant_image || ''} alt={prod.variant_name} fill className="object-cover" />
                    <div className="text-center absolute bottom-0 my-3 z-10 text-white bg-pizza-700 w-full transition-all ease-in-out duration-300">
                      <div className="font-bold text-xl">{prod.variant_name}</div>
                      <div>₱ {prod.price}</div>
                    </div>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}
