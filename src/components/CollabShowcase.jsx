'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/css/collabshowcase.module.css';
import { companies } from '../data/products'; // ✅ now imported

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CollabShowcase({
  title = 'Collaborations',
  subtitle = 'Long-term partnerships crafting premium spirits together',
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(`.${styles.headerWrap}`, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: `.${styles.headerWrap}`,
          start: 'top 85%',
        },
      });

      // Per-company animations
      const rows = gsap.utils.toArray(`.${styles.companyRow}`);
      rows.forEach((row) => {
        const img = row.querySelector(`.${styles.brandImage}`);
        const content = row.querySelector(`.${styles.brandContent}`);
        const cards = row.querySelectorAll(`.${styles.productCard}`);

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.from(img, { autoAlpha: 0, x: -40, duration: 0.8 })
          .from(content, { autoAlpha: 0, x: 40, duration: 0.8 }, '<+=0.1')
          .from(cards, { autoAlpha: 0, y: 24, stagger: 0.12, duration: 0.6 }, '-=0.1');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.collabSection} ref={sectionRef}>
      {/* Header */}
      <div className={styles.headerWrap}>
        <div className={styles.badge}>Partners</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.premiumDivider}>
        
        <div className={styles.dividerLine}></div>
        <div className={styles.centerCircle}>
          <div className={styles.circleInner}></div>
        </div>
        <div className={styles.dividerLine}></div>
      </div>


      {/* Companies */}
      <div className={styles.companyList}>
        {companies.map((c) => (
          <article key={c.id} className={styles.companyRow}>
            {/* Left: brand image */}
            <div className={styles.brandMedia}>
              <div className={styles.logoTag}>
                {c.logo && (
                  <Image
                    src={c.logo}
                    alt={`${c.name} logo`}
                    width={120}
                    height={120}
                    className={styles.logoImg}
                  />
                )}
                <span className={styles.logoName}>{c.name}</span>
              </div>

              <div className={styles.heroWrap}>
                <Image
                  src={c.hero}
                  alt={`${c.name} collaboration`}
                  width={720}
                  height={480}
                  className={styles.brandImage}
                  priority={false}
                />
                <div className={styles.imageGlow} />
              </div>
            </div>

            {/* Right: collab history */}
            <div className={styles.brandContent}>
              <h3 className={styles.brandTitle}>In Collaboration with {c.name}</h3>
              <p className={styles.brandBlurb}>{c.blurb}</p>
              <p className={styles.brandHistory}>{c.history}</p>

              <div className={styles.cardsGrid}>
                {c.products?.map((p) => (
                  <div key={p.slug} className={styles.productCard}>
                    <div className={styles.cardImageWrap}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={320}
                        height={220}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <h4 className={styles.productName}>{p.name}</h4>
                      <Link href={`/products/${p.slug}`} className={styles.readMore}>
                        Read More
                        <svg viewBox="0 0 24 24" className={styles.arrow}>
                          <path
                            fill="currentColor"
                            d="M13.172 12 8.222 7.05 9.636 5.636 16 12l-6.364 6.364-1.414-1.414z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
