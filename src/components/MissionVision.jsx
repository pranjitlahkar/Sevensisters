"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "@/css/missionvision.module.css";

export default function MissionVision() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);



  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.timeline()
        .fromTo(
          heroRef.current.children,
          { opacity: 0, y: 60 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.3, 
            duration: 1.5, 
            ease: "power3.out" 
          }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.ultraSection} ref={containerRef}>
      {/* Floating Luxury Elements */}
      <div className={styles.luxuryElements}>
        <div className={styles.goldParticle} style={{'--delay': '0s', '--duration': '15s'}}></div>
        <div className={styles.goldParticle} style={{'--delay': '3s', '--duration': '18s'}}></div>
        <div className={styles.goldParticle} style={{'--delay': '6s', '--duration': '20s'}}></div>
        <div className={styles.goldParticle} style={{'--delay': '9s', '--duration': '16s'}}></div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroContainer} ref={heroRef}>
        <div className={styles.premiumBadge}>
          <span className={styles.badgeText}>Seven Sisters Excellence</span>
          <div className={styles.badgeGlow}></div>
        </div>
        <h1 className={styles.heroTitle}>Our Purpose & Vision</h1>
        <div className={styles.masterLine}>
          <div className={styles.lineLeft}></div>
          <div className={styles.diamondCenter}>
            <div className={styles.innerDiamond}></div>
          </div>
          <div className={styles.lineRight}></div>
        </div>
        <p className={styles.heroSubtitle}>
          Guided by unwavering commitment to excellence, authenticity, and innovation 
          in every drop we craft
        </p>
      </div>

     
    </section>
  );
}
