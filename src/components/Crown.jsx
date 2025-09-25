// QueensCrownIntro.jsx
'use client'
import React, { useEffect, useRef } from 'react';
import styles from '@/css/crown.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QueensCrownIntro = () => {
  const containerRef = useRef(null);
  const crownRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const crown = crownRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const cta = ctaRef.current;

    // Animation setup
    gsap.set([title, subtitle, description, cta], { opacity: 0, y: 50 });
    gsap.set(crown, { opacity: 0, scale: 0.8, rotation: -15 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.to(crown, { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power3.out" })
      .to(title, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .to(description, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .to(cta, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // Crown hover
    const crownHover = gsap.to(crown, {
      scale: 1.05,
      rotation: 2,
      duration: 0.3,
      ease: "power2.out",
      paused: true
    });

    crown.addEventListener('mouseenter', () => crownHover.play());
    crown.addEventListener('mouseleave', () => crownHover.reverse());

    return () => {
      tl.kill();
      crownHover.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.queensCrownIntro}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Crown Icon */}
          <div ref={crownRef} className={styles.crownIcon}>
            <svg className={styles.crown} viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D2A11B" />
                  <stop offset="50%" stopColor="#F4E6CE" />
                  <stop offset="100%" stopColor="#D2A11B" />
                </linearGradient>
              </defs>
              <path d="M10 45 L20 20 L30 35 L40 15 L50 30 L60 15 L70 35 L80 20 L90 45 L85 50 L15 50 Z"
                    fill="url(#crownGradient)"
                    stroke="#672800"
                    strokeWidth="1"/>
              <circle cx="25" cy="25" r="3" fill="#A93E3E" />
              <circle cx="40" cy="20" r="4" fill="#A93E3E" />
              <circle cx="50" cy="35" r="3" fill="#A93E3E" />
              <circle cx="60" cy="20" r="4" fill="#A93E3E" />
              <circle cx="75" cy="25" r="3" fill="#A93E3E" />
            </svg>
          </div>
          <h1 ref={titleRef} className={styles.brandTitle}>
            Queen's Crown
          </h1>
          <h2 ref={subtitleRef} className={styles.subtitle}>
            Premium Bourbon Whiskey
          </h2>
          <p ref={descriptionRef} className={styles.description}>
            Crafted with uncompromising dedication to excellence, Queen's Crown represents
            the pinnacle of bourbon artistry. Each bottle embodies centuries of distilling
            tradition, delivering a taste that commands respect and admiration.
          </p>
          <div ref={ctaRef} className={styles.ctaContainer}>
            <button className={styles.primaryCta}>
              Discover the Legacy
            </button>
            <button className={styles.secondaryCta}>
              View Collection
            </button>
          </div>
        </div>
        <div className={styles.decorativeElements}>
          <div className={styles.ornament}></div>
          <div className={styles.ornament}></div>
        </div>
      </div>
    </section>
  );
};

export default QueensCrownIntro;
