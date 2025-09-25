'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { managers } from '@/data/managers';
import styles from '@/css/managerialsection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ManagerialSection() {
  const router = useRouter();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const dividerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline with ScrollTrigger
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Header animation
      masterTl.fromTo(headerRef.current.children, 
        { opacity: 0, y: 50 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.3,
          ease: 'power3.out' 
        }
      );

      // Divider reveal
      masterTl.fromTo(dividerRef.current, 
        { opacity: 0, scaleX: 0 }, 
        { opacity: 1, scaleX: 1, duration: 1.2, ease: 'power2.out' }, 
        '-=0.5'
      );

      // Manager cards staggered animation
      masterTl.fromTo(gridRef.current.children, 
        { opacity: 0, y: 60, scale: 0.9 }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.15,
          ease: 'back.out(1.7)' 
        }, 
        '-=0.8'
      );

      // Continuous animations
      // Divider shimmer
      gsap.fromTo(`.${styles.premiumDivider} .${styles.dividerLine}::before`, 
        { left: '-100%' },
        { 
          left: '100%', 
          duration: 4, 
          ease: 'power2.inOut', 
          repeat: -1, 
          repeatDelay: 2 
        }
      );

      // Circle glow animation
      gsap.to(`.${styles.centerCircle}`, {
        scale: 1.15,
        boxShadow: '0 0 30px rgba(195, 166, 106, 0.6)',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.header} ref={headerRef}>
        <div className={styles.premiumBadge}>
          <span className={styles.badgeText}>Leadership Excellence</span>
          <div className={styles.badgeShimmer}></div>
        </div>
        <h2 className={styles.title}>Our Management</h2>
        
        {/* Premium Animated Divider */}
        <div className={styles.premiumDivider} ref={dividerRef}>
          <div className={styles.dividerLine}></div>
          <div className={styles.centerCircle}>
            <div className={styles.circleInner}></div>
          </div>
          <div className={styles.dividerLine}></div>
        </div>
        
        <p className={styles.subtitle}>
          Meet the leaders shaping the future of our distillery with decades 
          of expertise and unwavering commitment to excellence
        </p>
      </div>

      <div className={styles.grid} ref={gridRef}>
        {managers.map((manager) => (
          <div key={manager.slug} className={styles.card}>
            {/* Manager Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={manager.image}
                alt={manager.name}
                width={300}
                height={400}
                className={styles.image}
                priority={false}
              />
              <div className={styles.imageOverlay}></div>
              <div className={styles.imageGlow}></div>
            </div>

            {/* Info */}
            <div className={styles.info}>
              <h3 className={styles.name}>{manager.name}</h3>
              <p className={styles.position}>{manager.position}</p>
              <p className={styles.education}>{manager.education}</p>

              <button
                className={styles.readMoreBtn}
                onClick={() => router.push(`/managerial/${manager.slug}`)}
                aria-label={`Read more about ${manager.name}`}
              >
                <span>Read More</span>
                <svg className={styles.btnIcon} viewBox="0 0 24 24">
                  <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
                </svg>
                <div className={styles.btnGlow}></div>
              </button>
            </div>
            <div className={styles.cardShimmer}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
