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
  const [swiperInstance, setSwiperInstance] = useState(null);
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

  // Fix navigation binding
  useEffect(() => {
    if (swiperInstance) {
      // Update navigation elements
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      
      // Re-initialize navigation
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  // Handle navigation clicks manually as backup
  const handlePrevClick = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  if (!mounted) {
    return (
      <div className={styles.heroSection}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return (
    <section className={styles.heroSection}>
      {/* Golden dust particles */}
      <canvas ref={canvasRef} className={styles.particles}></canvas>
      
      <Swiper
        className={styles.swiper}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop={true}
        speed={1500}
        onSwiper={setSwiperInstance}
        onSlideChange={() => {
          // Enhanced slide animations can be added here
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div 
              className={styles.imageWrapper}
              ref={(el) => (slideRefs.current[i] = el)}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={i === 0}
                className={styles.slideImage}
                sizes="100vw"
              />
              <div className={styles.overlay}></div>
            </div>
            
            <div className={styles.content}>
              <h1 className={`${styles.title} ${styles['shimmer-text']}`}>
                {slide.title}
              </h1>
              <p className={styles.subtitle}>
                {slide.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons with manual click handlers */}
      <button 
        ref={prevRef} 
        className={`${styles.nav} ${styles.prev}`}
        onClick={handlePrevClick}
        type="button"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button 
        ref={nextRef} 
        className={`${styles.nav} ${styles.next}`}
        onClick={handleNextClick}
        type="button"
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
};

export default HeroSlider;
