// FutureVision.jsx
"use client"
import React, { useEffect, useRef } from 'react';
import styles from '@/css/futurevision.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FutureVision = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    // Simple fade in animation
    gsap.fromTo(content, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

    <section className={styles.futureVision} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.content} ref={contentRef}>
          <h2 className={styles.title}>Introducing Queens Crown</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            After more than two decades of excellence, we are proud to launch our very own whiskey
            in the luxury segment under the prestigious name <strong>Queens Crown</strong>.
            Backed by state-of-the-art infrastructure and a legacy of trust.
          </p>
          <div className={styles.badge}>
            Blending Excellence with Reliability
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FutureVision;
