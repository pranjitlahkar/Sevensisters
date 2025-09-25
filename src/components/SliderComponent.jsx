'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import gsap from 'gsap';
import styles from '@/css/slidercomponent.module.css';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSlider = () => {
    const [mounted, setMounted] = useState(false);
    const [swiper, setSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const slideRefs = useRef([]);
    const canvasRef = useRef(null);

    const slides = [
        {
            id: 1,
            image: '/images/slider/slider.jpg',
            title: 'Seven Sisters Distillery',
            subtitle: 'Crafting Heritage in Every Sip',
        },
        {
            id: 2,
            image: '/images/slider/slider2.jpg',
            title: 'Timeless Elegance',
            subtitle: 'Where Tradition Meets Perfection',
        },
        {
            id: 3,
            image: '/images/slider/slider3.jpg',
            title: 'A Legacy of Excellence',
            subtitle: 'Distilled with Passion Since 2003',
        },
    ];

    useEffect(() => setMounted(true), []);

    // ✅ Rebind navigation
    useEffect(() => {
        if (swiper && prevRef.current && nextRef.current) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [swiper]);

    // ✅ Animate titles, subtitles, and buttons
   

    if (!mounted) {
        return (
            <section className={styles.heroSection}>
                <div className={styles.loader}></div>
            </section>
        );
    }

    return (
        <section className={styles.heroSection}>
            {/* Golden dust */}
            <canvas ref={canvasRef} className={styles.particles}></canvas>

            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ clickable: true }}
                loop={true}
                speed={1200}
                slidesPerView={1}
                onSwiper={setSwiper}
                className={styles.swiper}
            >
                {slides.map((slide, i) => (
                    <SwiperSlide
                        key={slide.id}
                        className={styles.slide}
                        ref={(el) => (slideRefs.current[i] = el)}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority
                                className={styles.slideImage}
                            />
                            <div className={styles.overlay}></div>
                        </div>
                        <div className={styles.content}>
                            <h2 className={`${styles.title} shimmer-text`}>{slide.title}</h2>
                            <p className={styles.subtitle}>{slide.subtitle}</p>

                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom nav */}
                <button ref={prevRef} className={`${styles.nav} ${styles.prev}`}>‹</button>
                <button ref={nextRef} className={`${styles.nav} ${styles.next}`}>›</button>
            </Swiper>
        </section>
    );
};

export default HeroSlider;
