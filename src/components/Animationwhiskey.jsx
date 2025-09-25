"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "@/css/animationwhiskey.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DistilleryShowcase() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === Video scrub ===
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (videoRef.current) {
            const duration = videoRef.current.duration || 0;
            videoRef.current.currentTime = duration * self.progress;
          }
        },
      });

      // === Parallax effect for sections ===
      gsap.utils.toArray(`.${styles.section}`).forEach((section, i) => {
        gsap.fromTo(
          section.querySelector(`.${styles.contentWrapper}`),
          { y: 100, opacity: 0 },
          {
            y: -100,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.showcase} ref={containerRef}>
      {/* === Hero Section === */}
      <section className={styles.hero}>
        <div className={styles.videoWrapper}>
          <video
            ref={videoRef}
            className={styles.heroVideo}
            src="/videos/video.mp4"
            muted
            playsInline
            preload="auto"
          />
          <div className={styles.overlay}>
            <h1 className={styles.heroTitle}>Crafted with Heritage</h1>
            <p className={styles.heroSubtitle}>
              Experience the artistry of fine spirits, where tradition meets
              innovation.
            </p>
          </div>
        </div>
      </section>

      {/* === About Section === */}
      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.sectionText}>
            Rooted in the lush valleys of tradition, our distillery preserves
            centuries of craftsmanship. Every sip reflects a timeless journey of
            patience, purity, and passion.
          </p>
        </div>
      </section>

      {/* === Process Section === */}
      <section className={`${styles.section} ${styles.process}`}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.sectionTitle}>The Craft</h2>
          <p className={styles.sectionText}>
            From copper stills to hand-selected barrels, our process is an art
            form. Guided by master distillers, we create spirits that embody
            both heritage and innovation.
          </p>
        </div>
      </section>

      {/* === Heritage Section === */}
      <section className={`${styles.section} ${styles.heritage}`}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.sectionTitle}>Heritage</h2>
          <p className={styles.sectionText}>
            A legacy passed down through generations — each bottle carries the
            story of our land, our people, and our dedication to excellence.
          </p>
        </div>
      </section>

      {/* === CTA Section === */}
      <section className={styles.cta}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.ctaTitle}>
            Raise Your Glass to Timeless Spirits
          </h2>
          <button className={styles.ctaButton}>Discover More</button>
        </div>
      </section>
    </main>
  );
}
