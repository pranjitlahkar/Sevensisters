'use client';

import { useEffect, useRef } from 'react';
import styles from '../css/featurecard.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: 'Artisanal Craftsmanship',
    subtitle: 'Handcrafted in small batches',
    img: '/images/gallery/distillery14.jpg',
  },
  {
    title: 'Premium Quality',
    subtitle: 'Strict QC at every step',
    img: '/images/gallery/distillery16.jpg',
  },
  {
    title: 'Heritage Since 2003',
    subtitle: 'Two decades of mastery',
    img: '/images/logo/logo.png',
  },
];

const FeatureCard = () => {
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.grid} ref={gridRef}>
        {features.map((f, i) => (
          <div
            key={f.title}
            className={styles.card}
            style={{ backgroundImage: `url(${f.img})` }}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.subtitle}>{f.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCard;
