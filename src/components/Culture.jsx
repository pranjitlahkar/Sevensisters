'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from '../css/culture.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Culture = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const ornamentRef = useRef(null);
  const timelineRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Generate particles client-side for SSR safety
  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        delay: `${i * 0.3}s`,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: `${Math.random() * 6 + 2}px`
      }))
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main text timeline
      timelineRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timelineRef.current
        .from('.culture-badge', { y: 60, opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)' })
        .from('.culture-header', { y: 80, opacity: 0, duration: 1.2 }, '-=0.6')
        .from('.culture-subheader', { y: 50, opacity: 0, duration: 1 }, '-=0.8')
        .from('.culture-content', { y: 40, opacity: 0, duration: 1.2 }, '-=0.6')
        .from('.culture-stats', { y: 30, opacity: 0, stagger: 0.15, duration: 0.8 }, '-=0.4');

      // Image entrance
      gsap.fromTo(
        imageRef.current,
        { scale: 0.6, rotation: -15, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, rotation: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'back.out(1.2)', delay: 0.8 }
      );

      // Continuous floating animation
      gsap.to(imageRef.current, { y: -20, rotation: 5, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });

      // Ornament rotation
      gsap.to(ornamentRef.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' });

      // Particle floating
      gsap.utils.toArray('.particle').forEach((particle, i) => {
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 100 - 50,
          rotation: Math.random() * 360,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
      });

      // Scroll-triggered text animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        animation: timelineRef.current,
        toggleActions: 'play none none reverse',
        once: true
      });

      // Hover effects on image
      const imageHover = gsap.timeline({ paused: true });
      imageHover.to(imageRef.current, {
        scale: 1.05,
        rotation: 10,
        filter: 'brightness(1.1) contrast(1.1)',
        duration: 0.5,
        ease: 'power2.out'
      });

      const imgEl = imageRef.current;
      imgEl?.addEventListener('mouseenter', () => imageHover.play());
      imgEl?.addEventListener('mouseleave', () => imageHover.reverse());

      // Cleanup hover listeners
      return () => {
        imgEl?.removeEventListener('mouseenter', () => imageHover.play());
        imgEl?.removeEventListener('mouseleave', () => imageHover.reverse());
      };
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.cultureSection} ref={containerRef}>
      {/* Particles */}
      <div className={styles.particlesContainer}>
        {particles.map(p => (
          <div
            key={p.id}
            className={`${styles.particle} particle`}
            style={{
              '--delay': p.delay,
              '--x': p.x,
              '--y': p.y,
              '--size': p.size
            }}
          />
        ))}
      </div>

      {/* Ornament */}
      <div className={styles.ornamentContainer}>
        <div className={styles.ornament} ref={ornamentRef}>
          <div className={styles.ornamentInner}></div>
        </div>
      </div>

      <div className={styles.container}>
        {/* Text Content */}
        <div className={styles.contentWrapper}>
          <div className={`${styles.badge} culture-badge`}>
            <span>Heritage & Tradition</span>
          </div>

          <h2 className={`${styles.header} culture-header`}>
            <span className={styles.headerMain}>Our Culture</span>
            <span className={styles.headerSub}>& Heritage</span>
          </h2>

          <h3 className={`${styles.subheader} culture-subheader`}>The Soul of Seven Sisters</h3>

          <div className={styles.decorativeLine}>
            <div className={styles.lineLeft}></div>
            <div className={styles.centerOrb}></div>
            <div className={styles.lineRight}></div>
          </div>

          <p className={`${styles.content} culture-content`}>
            Rooted deeply in Assam's rich traditions, Seven Sisters embodies the spirit and passion of generations. Our
            commitment to craft and excellence reflects in every drop of our exquisite spirits, carrying forward the
            legacy of Northeast India's finest distillation heritage.
          </p>

          <div className={styles.heritageStats}>
            <div className={`${styles.statItem} culture-stats`}>
              <div className={styles.statIcon}>🏛️</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>25+</div>
                <div className={styles.statLabel}>Years Legacy</div>
              </div>
            </div>
            <div className={`${styles.statItem} culture-stats`}>
              <div className={styles.statIcon}>🌿</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>7</div>
                <div className={styles.statLabel}>Sister States</div>
              </div>
            </div>
            <div className={`${styles.statItem} culture-stats`}>
              <div className={styles.statIcon}>🍃</div>
              <div className={styles.statContent}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Traditional</div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className={styles.imageWrapper}>
          <div ref={imageRef} className={styles.imageContainer}>
            <Image
              className={styles.image}
              src="/japi.png"
              alt="Seven Sisters Culture and Heritage"
              width={500}
              height={500}
              priority
            />
            <div className={styles.imageGlow}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
