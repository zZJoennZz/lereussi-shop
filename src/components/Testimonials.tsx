import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';
import styles from '@/styles/Testimonials.module.css';
import Image from 'next/image';

export default function Testimonials({ testimonials }: any): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  return (
    <>
      <div className="container-outer my-24">
        <div className="container-inner relative">
          <div className="section-title mb-6 text-slate-600 text-center">Testimonials</div>
          <div className="keen-slider mb-10" ref={sliderRef}>
            {/* <div className="keen-slider__slide flex">
              <TestimonialCard />
            </div>
            <div className="keen-slider__slide flex">
              <TestimonialCard />
            </div>
            <div className="keen-slider__slide flex">
              <TestimonialCard />
            </div> */}
            {testimonials.map((testimonial: any) => {
              return (
                <div key={testimonial.title} className="keen-slider__slide flex">
                  <TestimonialCard image={testimonial.image} name={testimonial.title} testimonial={testimonial.description1} />
                </div>
              );
            })}
          </div>
          {loaded && instanceRef.current && (
            <div className={styles.dots}>
              {Array.from(Array(instanceRef.current.track.details.slides.length).keys()).map((idx) => {
                return (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={styles.dot + (currentSlide === idx ? ' ' + styles.active : '')}
                  ></button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function TestimonialCard({ image, name, testimonial }: any): JSX.Element {
  return (
    <div className={styles.card}>
      <div className="bg-pizza-600 h-96 object-cover relative rounded-3xl shadow-xl shadow-slate-300 overflow-hidden mb-10 md:mb-0">
        <Image src={image} fill alt={name} className="object-cover" />
      </div>
      <div className="flex items-center md:pl-10">
        <div>
          <div className="text-3xl font-bold mb-4">{name}</div>
          <div className="text-2xl">{testimonial}</div>
        </div>
      </div>
    </div>
  );
}
