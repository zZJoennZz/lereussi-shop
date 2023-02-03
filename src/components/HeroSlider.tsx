import { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import styles from '@/styles/HeroSlider.module.css'
import "keen-slider/keen-slider.min.css"
import { HeroSliderContent } from "@/types";
interface HeroSliderProps {
    sliderContent: HeroSliderContent[];
}
export default function HeroSlider({sliderContent} : HeroSliderProps): JSX.Element {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <>
            <div className={styles['navigation-wrapper']}>
                <div ref={sliderRef} className="keen-slider">
                    {
                        sliderContent.map(slider => 
                                <div key={`slider${slider.backgroundImg}`} className="keen-slider__slide bg-cover bg-center grid grid-cols-1 md:grid-cols-2" style={{ background: `linear-gradient(0deg, rgba(23, 23, 23, 0.5), rgba(153, 140, 116, 0.5)), url(${slider.backgroundImg})`, height: '50vh'}}>
                                    <div className="h-0 md:h-auto order-2 md:order-1"></div>
                                    <div className="flex flex-col order-1 md:order-2 justify-center p-4 md:p-0">
                                        <div className="flex mb-3">
                                            <div className="border rounded-xl text-base md:text-xl py-2 p-4 mb-3 text-white">
                                                {slider.promoText}
                                            </div>
                                        </div>
                                        <div className="md:text-5xl text-3xl font-bold mb-2 text-white">{slider.mainText}</div>
                                        <div className="text-lg md:text-2xl mb-8 text-white">{slider.description}</div>
                                        <div>
                                            <a className="text-base md:text-xl bg-white text-pizza-800 hover:bg-slate-300 transition-all ease-in-out duration-300 py-2 md:py-3 px-3 md:px-5 rounded-xl" href={slider.buttonUrl} target="_blank" rel="noreferrer">{slider.buttonText}</a>
                                        </div>
                                    </div>
                                </div>
                        )
                    }
                </div>
                {
                    loaded && instanceRef.current && (
                        <>
                            <Arrow
                                onClick={() => instanceRef.current?.prev()}
                                instanceRef 
                                left 
                                disabled={currentSlide === 0} 
                            />
                            <Arrow
                                onClick={() => instanceRef.current?.next()}
                                instanceRef 
                                right 
                                disabled={currentSlide === instanceRef.current.track.details.slides.length - 1} 
                            />
                        </>
                    )
                }
            </div>
            {
                loaded && instanceRef.current && (
                    <div className={styles.dots}>  
                        {
                                Array.from(Array(instanceRef.current.track.details.slides.length).keys()).map(idx => {
                                return (
                                    <button 
                                        key={idx}
                                        onClick={() => instanceRef.current?.moveToIdx(idx)}
                                        className={styles.dot + (currentSlide === idx ? " " + styles.active : "")}
                                    >
                                    </button>
                                )
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

function Arrow(props: any) {
    const disabled = props.disabled ? " " + styles.disabled : ""
    return (
        <svg
            onClick={props.onClick}
            className={`${styles.arrow} ${
                props.left ? styles['arrow--left'] : styles['arrow--right']
            } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}