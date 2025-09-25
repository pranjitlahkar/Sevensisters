'use client';

import { useState, useEffect } from 'react';
import styles from '../css/partnership.module.css';

const Partnership = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const section = document.querySelector(`.${styles.partnershipSection}`);
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
    <div className={styles.partnershipSection}>
      <div className={styles.partnersContainer}>
        <div className={styles.partnersContent}>
          <div className={`${styles.partnersText} ${isVisible ? styles.partnersTextAnimated : ''}`}>
            <h2 className={styles.sectionTitle}>Trusted Partnerships</h2>
            <div className={styles.partnersList}>
              <div className={`${styles.partnerItem} ${isVisible ? styles.partnerItemAnimated : ''}`}>
                <h3 className={styles.partnerName}>Radico Khaitan</h3>
                <p className={styles.partnerDesc}>
                  Exclusive tie-up with India's leading liquor company, continuing production excellence for over two decades.
                </p>
              </div>
              <div className={`${styles.partnerItem} ${isVisible ? styles.partnerItemAnimated : ''}`}>
                <h3 className={styles.partnerName}>Tilak Nagar Industries</h3>
                <p className={styles.partnerDesc}>
                  Proud production partnership delivering consistent quality and reliable service.
                </p>
              </div>
              <div className={`${styles.partnerItem} ${isVisible ? styles.partnerItemAnimated : ''}`}>
                <h3 className={styles.partnerName}>Premium Brands</h3>
                <p className={styles.partnerDesc}>
                  Manufacturing for Mohan Meakin, Chowki Liquors, and Omsons Pvt. Ltd.
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.partnersImage} ${isVisible ? styles.partnersImageAnimated : ''}`}>
            <img
              src="/images/partners/partner.jpg"
              alt="Partnership Excellence"
              className={styles.partnerImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
