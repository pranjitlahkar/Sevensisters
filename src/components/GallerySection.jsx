'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/gallerysection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GallerySection({
  title = 'Signature Gallery',
  subtitle = 'From grain to glass — a visual journey through our craft',
  images = [
    { src: '/gallery/whisky-stills.jpg', alt: 'Copper Whisky Stills' },
    { src: '/gallery/rum-barrels.jpg', alt: 'Aged Rum Barrels' },
    { src: '/gallery/gin-botanicals.jpg', alt: 'Fresh Gin Botanicals' },
    { src: '/gallery/vodka-distillation.jpg', alt: 'Vodka Distillation' },
    { src: '/gallery/oak-warehouse.jpg', alt: 'Oak Barrel Warehouse' },
    { src: '/gallery/quality-lab.jpg', alt: 'Quality Testing Lab' }
  ]
}) {
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!rootRef.current || !gridRef.current) return;

    // Header reveal animation
    const headerTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top 85%'
      }
    });

    headerTl
      .fromTo(`.${styles.headerTitle}`, 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(`.${styles.headerSubtitle}`, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8 }, 
        '-=0.6'
      );

    // Gallery cards stagger animation
    const cards = gsap.utils.toArray(`.${styles.card}`);
    gsap.set(cards, { autoAlpha: 0, y: 40 });
    
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Subtle parallax effect on images
    cards.forEach((card) => {
      const img = card.querySelector(`.${styles.cardImage}`);
      if (img) {
        gsap.fromTo(img, 
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'bottom 10%',
              scrub: 0.6
            }
          }
        );
      }
    });

    // Refresh ScrollTrigger after images load
    const handleLoad = () => {
      ScrollTrigger.refresh();
      setImagesLoaded(true);
    };

    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.gallerySection} ref={rootRef}>
      <div className={styles.background} />
      
      <header className={styles.header}>
        <h2 className={styles.headerTitle}>{title}</h2>
        <p className={styles.headerSubtitle}>{subtitle}</p>
      </header>

      <div className={styles.grid} ref={gridRef} role="list">
        {images.map(({ src, alt }, index) => (
          <article className={styles.card} key={index} role="listitem">
            <div className={styles.cardImageWrapper}>
              <Image 
                src={src} 
                alt={alt} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.cardImage}
                onLoadingComplete={() => setImagesLoaded(true)}
              />
              <div className={styles.overlay} />
            </div>
            <footer className={styles.cardContent}>
              <h3 className={styles.cardCaption}>{alt}</h3>
              <button 
                className={styles.cardButton} 
                aria-label={`Read more about ${alt}`}
              >
                Read More
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
