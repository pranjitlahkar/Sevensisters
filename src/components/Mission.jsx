'use client'
import React from 'react'
import styles from '@/css/mission.module.css';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Mission = () => {
  const containerRef = useRef(null);
  const missionRef = useRef(null);
  const titleRef = useRef(null);
  const dividerRef = useRef(null);
  const iconRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline with ScrollTrigger
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Title animation
      masterTl.fromTo(titleRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Divider reveal animation
      masterTl.fromTo(dividerRef.current, 
        { opacity: 0, scaleX: 0 }, 
        { opacity: 1, scaleX: 1, duration: 1.2, ease: 'power2.out' }, 
        '-=0.5'
      );

      // Icon entrance with rotation
      masterTl.fromTo(iconRef.current, 
        { opacity: 0, scale: 0, rotation: -180 }, 
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }, 
        '-=0.8'
      );

      // Image with 3D effect
      masterTl.fromTo(imageRef.current, 
        { opacity: 0, rotationY: 15, scale: 0.9 }, 
        { opacity: 1, rotationY: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, 
        '-=1'
      );

      // Text content staggered
      masterTl.fromTo(textRef.current.children, 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }, 
        '-=0.8'
      );

      // Pillars with stagger
      masterTl.fromTo(pillarsRef.current.children, 
        { opacity: 0, y: 20, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }, 
        '-=0.4'
      );

      // Continuous floating animations
      gsap.to(iconRef.current, {
        y: -8,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

      // Floating elements animation
      gsap.to(`.${styles.floatElement}`, {
        y: -10,
        x: 5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
      });

      // Divider shimmer animation
      gsap.fromTo(`.${styles.titleUnderline}::before`, 
        { left: '-100%' },
        { 
          left: '100%', 
          duration: 4, 
          ease: 'power2.inOut', 
          repeat: -1, 
          repeatDelay: 2 
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* Mission Section */}
      <div className={styles.missionSection}>
        <div className={styles.sectionContainer} ref={missionRef}>
          <div className={styles.contentSide}>
            <div className={styles.iconContainer}>
              <div className={styles.luxuryIcon} ref={iconRef}>
                <span className={styles.iconSymbol}>⚜</span>
                <div className={styles.iconAura}></div>
              </div>
            </div>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle} ref={titleRef}>Our Mission</h2>
              
              {/* Premium Animated Divider */}
              <div className={styles.premiumDivider} ref={dividerRef}>
                <div className={styles.dividerLine}></div>
                <div className={styles.centerCircle}>
                  <div className={styles.circleInner}></div>
                </div>
                <div className={styles.dividerLine}></div>
              </div>
              
              <div className={styles.missionText} ref={textRef}>
                <p className={styles.primaryText}>
                  Our mission is to craft and deliver exceptional liquors that embody 
                  <span className={styles.highlight}> quality, authenticity, and innovation</span>. 
                  We are committed to using the finest ingredients, sustainable practices, 
                  and advanced bottling standards to ensure every product we create makes 
                  a continuous and lasting impact in our clients' journey with us.
                </p>
                <p className={styles.secondaryText}>
                  By blending state-of-the-art infrastructure with modern expertise, we aim 
                  to build lasting relationships with our customers, partners, and communities 
                  while contributing to a culture of responsibility and excellence in the 
                  distilling, bottling and liquor manufacturing industry.
                </p>
              </div>
              <div className={styles.keyPillars} ref={pillarsRef}>
                <div className={styles.pillar}>
                  <div className={styles.pillarIcon}>◈</div>
                  <span>Finest Ingredients</span>
                </div>
                <div className={styles.pillar}>
                  <div className={styles.pillarIcon}>◈</div>
                  <span>Sustainable Practices</span>
                </div>
                <div className={styles.pillar}>
                  <div className={styles.pillarIcon}>◈</div>
                  <span>Advanced Standards</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.visualSide}>
            <div className={styles.luxuryVisual}>
              <div className={styles.visualFrame} ref={imageRef}>
                <img 
                  src="/images/logo/logoheritage.png" 
                  alt="Crafting Excellence" 
                  className={styles.luxuryImage}
                />
                <div className={styles.imageOverlay}></div>
                <div className={styles.floatingElements}>
                  <div className={styles.floatElement} style={{'--position': '20% 30%'}}></div>
                  <div className={styles.floatElement} style={{'--position': '80% 70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mission
