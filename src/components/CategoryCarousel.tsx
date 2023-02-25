import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import styles from '@/styles/CategoryCarousel.module.css'
import "keen-slider/keen-slider.min.css"
import { Category } from '@/types'

// import sectionBg from '@/img/category-bg.svg'

export default function CategoryCarousel({ categories }: { categories: Category[] }): JSX.Element {
    const [ref] = useKeenSlider<HTMLDivElement>({
        slides: {
            perView: 4,
            spacing: 15,
        },
        breakpoints: {
            "(max-width: 650px)": {
                slides: { perView: 2, spacing: 5 },
            },
            "(max-width: 450px)": {
                slides: { perView: 1 },
            },
        },
    })

    return (
        <div className={styles.categoryCarousel}>
            <div className={styles.categoryCarouselInner}>
                <div className="section-title text-center mb-10 text-ebb">
                    Shop by Category
                </div>
                <div ref={ref} className="keen-slider">
                    {
                        categories ? categories.map((cat: Category) =>
                            <a href={cat.meta.page_slug} key={cat.meta.id}>
                                <div className="keen-slider__slide bg-ebb hover:bg-pizza-600 transition-colors ease-in-out duration-300 rounded-3xl text-slate-700 flex items-center justify-center flex-col">
                                    <div className="h-16 w-16 relative mt-3">
                                        <Image 
                                            src={cat.product_type_image || ''} 
                                            alt={cat.product_type}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="text-center font-bold my-3">
                                        {cat.product_type}
                                    </div>
                                </div>
                            </a>
                        )
                        :
                        <div className="keen-slider__slide">No Category Found</div>
                    }
                </div>
            </div>
        </div>
    )
}