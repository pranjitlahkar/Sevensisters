"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "@/css/ourstory.module.css";

export default function OurStory() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('[data-animate]');

      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <section className={styles.ourStorySection} ref={containerRef}>
      {/* Hero Section */}
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroText} data-animate>
            <h1 className={styles.mainTitle}>Our Legacy of Excellence</h1>
            <div className={styles.decorativeLine}>
              <div className={styles.lineCircle}></div>
            </div>
            <p className={styles.heroDescription}>
              Seven Sisters Trade and Distilleries Pvt. Ltd., is a leading liquor manufacturing company in Northeast India established in 2003 in Guwahati, Assam with state-of-the-art infrastructure for liquor blending and bottling. The infrastructure includes three production lines, nineteen blending tanks, and five storage tanks of 25,000 liters each.

              Our journey began with an exclusive tie-up with Radico Khaitan, which is a leading liquor company in India, continuing production for over two decades now. We have also been proudly producing for Tilak Nagar Industries. At present, we manufacture for many other reputed companies such as Mohan Meakin, Chowki Liquors, and Omsons Pvt. Ltd., delivering consistent quality and service.

              With a strong reputation for producing premium liquor across the entire Northeast, our products are distributed in Nagaland, Manipur, Sikkim, Arunachal Pradesh, and beyond. After more than two decades of experience, we are now preparing to launch our very own whiskey in the luxury segment under the name Queens Crown. Backed by state-of-the-art infrastructure and a legacy of trust, Seven Sisters Trade and Distilleries remains committed to blending excellence with reliability.
            </p>
            <div className={styles.establishedBadge}>
              <span className={styles.year}>EST. 2003</span>
              <span className={styles.location}>Guwahati, Assam</span>
            </div>
          </div>
          <div className={styles.heroImage} data-animate>
            <img
              src="/images/assets/sevensistersghibli.jpg"
              alt="Seven Sisters Distillery Facility"
              className={styles.mainImage}
            />
          </div>
        </div>
      </div>

      {/* Infrastructure Stats */}


      {/* Partnership Journey */}

      {/* Future Vision */}

    </section>
  );
}
