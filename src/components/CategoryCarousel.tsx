import { useKeenSlider } from "keen-slider/react"
import styles from '@/styles/CategoryCarousel.module.css'
import "keen-slider/keen-slider.min.css"
import { Category } from '@/types'

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
            <div className="section-title text-center">
                Shop by Category
            </div>
            <div ref={ref} className="keen-slider mt-10 pb-11">
                {
                    categories.map(cat => 
                        <a href={cat.slug} key={cat.id+cat.name}>
                            <div className="keen-slider__slide bg-pizza-700 hover:bg-pizza-600 transition-colors ease-in-out duration-300 text-white rounded-3xl shadow-lg shadow-slate-300 flex items-center justify-center flex-col">
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
    )
}