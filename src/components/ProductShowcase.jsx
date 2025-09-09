'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from '../css/productshowcase.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductShowcase({
  product = {
    name: 'Amber Reserve Whisky',
    tagline: 'Aged to Perfection',
    category: 'Single Malt Whisky',
    description: 'A symphony of caramel, oak, and spice notes dance in perfect harmony. Distilled in traditional copper pot stills and aged 12 years in carefully selected oak barrels, this exceptional whisky embodies our commitment to artisanal excellence. Each drop tells the story of patience, precision, and passion.',
    image: '/products/amber-reserve.jpg',
    specs: {
      abv: '43%',
      age: '12 Years',
      volume: '750ml',
      origin: 'Single Malt'
    },
    awards: ['Gold Medal 2023', 'Best Whisky Award'],
    price: '$299'
  }
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Entrance animation timeline
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Staggered reveal animation
    tl.fromTo(containerRef.current, 
        { autoAlpha: 0, y: 60 }, 
        { autoAlpha: 1, y: 0, duration: 1 }
      )
      .fromTo(imageRef.current, 
        { scale: 0.8, rotationY: -15 }, 
        { scale: 1, rotationY: 0, duration: 1.2 }, 
        '-=0.8'
      )
      .fromTo(`.${styles.productName}`, 
        { x: 50, autoAlpha: 0 }, 
        { x: 0, autoAlpha: 1, duration: 0.8 }, 
        '-=0.6'
      )
      .fromTo(`.${styles.tagline}`, 
        { x: 30, autoAlpha: 0 }, 
        { x: 0, autoAlpha: 1, duration: 0.6 }, 
        '-=0.4'
      )
      .fromTo(`.${styles.description}`, 
        { y: 30, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 0.8 }, 
        '-=0.4'
      )
      .fromTo(`.${styles.specs} .${styles.spec}`, 
        { y: 20, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 }, 
        '-=0.6'
      );

    // Parallax effect on product image
    gsap.to(imageRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Floating animation for product image
    gsap.to(imageRef.current, {
      y: -8,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loaded]);

  return (
    <section className={styles.showcase} ref={containerRef}>
      <div className={styles.ambientBg} />
      <div className={styles.glowEffect} />
      
      {/* Product Image Side */}
      <div className={styles.imageSection}>
        <div className={styles.imageContainer} ref={imageRef}>
          <div className={styles.imageFrame}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className={styles.productImage}
              onLoadingComplete={() => setLoaded(true)}
              priority
            />
          </div>
          <div className={styles.imageGlow} />
          <div className={styles.reflectionEffect} />
        </div>
        
        {/* Floating Elements */}
        <div className={styles.floatingElement} style={{'--delay': '0s'}}>
          <span className={styles.award}>{product.awards}</span>
        </div>
        <div className={styles.floatingElement} style={{'--delay': '1s'}}>
          <span className={styles.price}>{product.price}</span>
        </div>
      </div>

      {/* Content Side */}
      <div className={styles.contentSection} ref={contentRef}>
        <div className={styles.glassCard}>
          <div className={styles.glassBackdrop} />
          
          <header className={styles.productHeader}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
          </header>

          <div className={styles.description}>
            <p>{product.description}</p>
          </div>

          <div className={styles.specs}>
            {Object.entries(product.specs).map(([key, value], index) => (
              <div key={key} className={styles.spec}>
                <span className={styles.specLabel}>
                  {key.toUpperCase().replace('_', ' ')}
                </span>
                <span className={styles.specValue}>{value}</span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>
              Discover More
              <svg className={styles.btnIcon} viewBox="0 0 24 24">
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
              </svg>
            </button>
            <button className={styles.secondaryBtn}>
              Add to Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
