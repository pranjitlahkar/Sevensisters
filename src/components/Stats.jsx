'use client';

import React, { useState, useEffect } from 'react';
import styles from '@/css/stats.module.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const section = document.querySelector(`.${styles.statsContainer}`);
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsContent}>
        <h2 className={`${styles.sectionTitle} ${isVisible ? styles.sectionTitleAnimated : ''}`}>
          State-of-the-Art Infrastructure
        </h2>
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${isVisible ? styles.statCardAnimated : ''}`}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Production Lines</div>
            <p className={styles.statDescription}>Advanced manufacturing capabilities</p>
          </div>
          <div className={`${styles.statCard} ${isVisible ? styles.statCardAnimated : ''}`}>
            <div className={styles.statNumber}>19</div>
            <div className={styles.statLabel}>Blending Tanks</div>
            <p className={styles.statDescription}>Precision blending for quality</p>
          </div>
          <div className={`${styles.statCard} ${isVisible ? styles.statCardAnimated : ''}`}>
            <div className={styles.statNumber}>5</div>
            <div className={styles.statLabel}>Storage Tanks</div>
            <p className={styles.statDescription}>25,000 liters each capacity</p>
          </div>
          <div className={`${styles.statCard} ${isVisible ? styles.statCardAnimated : ''}`}>
            <div className={styles.statNumber}>20+</div>
            <div className={styles.statLabel}>Years Experience</div>
            <p className={styles.statDescription}>Decades of expertise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
