import { useKeenSlider } from "keen-slider/react"
import styles from '@/styles/CategoryCarousel.module.css'
import "keen-slider/keen-slider.min.css"
import { Category } from '@/types'

import sectionBg from '@/img/category-bg.svg'

interface CategoryCarouselProps {
    categories: Category[]
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps): JSX.Element {
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
                        categories.map(cat =>
                            <a href={cat.slug} key={cat.id+cat.name}>
                                <div className="keen-slider__slide bg-ebb hover:bg-pizza-600 transition-colors ease-in-out duration-300 text- rounded-3xl text-slate-700 flex items-center justify-center flex-col">
                                    <div>
                                        {cat.icon}
                                    </div>
                                    <div className="text-center font-bold mb-4">{cat.name}</div>
                                </div>
                            </a>
                        )
                    }
                </div>
            </div>
        </div>
    )
}