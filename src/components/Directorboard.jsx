'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { directors } from '@/data/directors';
import styles from '@/css/directorpage.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DirectorsPage() {
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

      // Header animations
      masterTl.fromTo(headerRef.current.children, 
        { opacity: 0, y: 60 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.3,
          ease: 'power3.out' 
        }
      );

      // Divider reveal
      masterTl.fromTo(dividerRef.current, 
        { opacity: 0, scaleX: 0 }, 
        { opacity: 1, scaleX: 1, duration: 1.5, ease: 'power2.out' }, 
        '-=0.6'
      );

      // Director cards with elegant entrance
      masterTl.fromTo(gridRef.current.children, 
        { opacity: 0, y: 80, rotationX: -15, scale: 0.8 }, 
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
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
          repeatDelay: 3 
        }
      );

      // Circle glow animation
      gsap.to(`.${styles.centerCircle}`, {
        scale: 1.2,
        boxShadow: '0 0 35px rgba(195, 166, 106, 0.7)',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // Inner circle pulse
      gsap.to(`.${styles.circleInner}`, {
        scale: 1.4,
        opacity: 1,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.directorsSection} ref={sectionRef}>
      <div className={styles.headerWrap} ref={headerRef}>
        <div className={styles.luxuryBadge}>
          <span className={styles.badgeText}>Board Excellence</span>
          <div className={styles.badgeShimmer}></div>
        </div>
        <h2 className={styles.title}>Board of Directors</h2>
        
        {/* Premium Animated Divider */}
        <div className={styles.premiumDivider} ref={dividerRef}>
          <div className={styles.dividerLine}></div>
          <div className={styles.centerCircle}>
            <div className={styles.circleInner}></div>
          </div>
          <div className={styles.dividerLine}></div>
        </div>
        
        <p className={styles.subtitle}>
          Meet the visionaries shaping the future of our company with strategic 
          leadership and decades of industry expertise
        </p>
      </div>

      <div className={styles.directorsGrid} ref={gridRef}>
        {directors.map((director) => (
          <div key={director.slug} className={styles.directorCard}>
            <div className={styles.cardGlow}></div>
            <div className={styles.imageWrapper}>
              <Image
                src={director.image}
                alt={director.name}
                width={300}
                height={400}
                className={styles.directorImage}
              />
              <div className={styles.imageOverlay}></div>
              <div className={styles.imageFrame}></div>
            </div>

            <div className={styles.infoWrapper}>
              <h3 className={styles.directorName}>{director.name}</h3>
              <p className={styles.position}>{director.position}</p>
              <p className={styles.education}>{director.education}</p>

              <button
                className={styles.readMoreBtn}
                onClick={() => router.push(`/directors/${director.slug}`)}
              >
                <span>Read More</span>
                <svg className={styles.btnIcon} viewBox="0 0 24 24">
                  <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
                </svg>
                <div className={styles.btnRipple}></div>
              </button>
            </div>
            <div className={styles.cardShimmer}></div>
          </div>
        ))}
      </div>
    </section>
  );
}
