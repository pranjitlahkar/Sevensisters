// components/CollabShowcasePro.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/collabshowcase.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger); // ensure plugin is registered on the client [GSAP]
}

export default function CollabShowcasePro({
  title = 'Collaborations',
  subtitle = 'Crafting premium spirits with trusted partners',
  companies = [],
  onReadMore
}) {
  const rootRef = useRef(null);
  const [decoded, setDecoded] = useState(false);

  // One-time refresh after images decode and on window 'load'
  useEffect(() => {
    let did = false;
    const mark = () => {
      if (did) return;
      did = true;
      setDecoded(true);
      setTimeout(() => ScrollTrigger.refresh(), 0); // refresh after layout settles [10]
    };
    if (document.readyState === 'complete') mark();
    else window.addEventListener('load', mark, { once: true });
    return () => window.removeEventListener('load', mark);
  }, []);

  useEffect(() => {
    // Don’t create triggers until first render + image decode pass
    if (!rootRef.current) return;

    const mm = gsap.matchMedia(); // create responsive scope [6]

    // Shared header animation
    mm.add('(min-width: 0px)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: `.${styles.header}`, start: 'top 85%' }
      });
      tl.from(`.${styles.badge}`, { y: 30, autoAlpha: 0, duration: 0.5 })
        .from(`.${styles.title}`, { y: 50, autoAlpha: 0, duration: 0.8 }, '-=0.2')
        .from(`.${styles.subtitle}`, { y: 30, autoAlpha: 0, duration: 0.6 }, '-=0.3');
    }, rootRef); // scope selectors to this section [6]

    // Desktop+
    mm.add('(min-width: 1025px)', () => {
      gsap.utils.toArray(`.${styles.company}`, rootRef.current).forEach((row) => {
        const img = row.querySelector(`.${styles.brandImage}`);
        const content = row.querySelector(`.${styles.brandContent}`);
        const cards = row.querySelectorAll(`.${styles.card}`);

        // Parallax scrub on image
        gsap.to(img, {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.6
          }
        });

        // Reveal sequence
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none reverse' }
        });
        tl.from(row, { y: 40, autoAlpha: 0, duration: 0.6 })
          .from(img, { x: -40, autoAlpha: 0, duration: 0.7 }, '-=0.3')
          .from(content, { x: 40, autoAlpha: 0, duration: 0.7 }, '-=0.5')
          .from(cards, {
            y: 28,
            rotationX: 15,
            transformOrigin: '50% 100%',
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.12
          }, '-=0.2');
      });
    }, rootRef);

    // Tablet & mobile
    mm.add('(max-width: 1024px)', () => {
      gsap.utils.toArray(`.${styles.company}`, rootRef.current).forEach((row) => {
        const img = row.querySelector(`.${styles.brandImage}`);
        const content = row.querySelector(`.${styles.brandContent}`);
        const cards = row.querySelectorAll(`.${styles.card}`);

        gsap.from([img, content], {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none reverse' }
        });

        gsap.from(cards, {
          y: 20,
          autoAlpha: 0,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: { trigger: row, start: 'top 80%' }
        });
      });
    }, rootRef);

    // Reduced motion: disable triggers
    mm.add('(prefers-reduced-motion: reduce)', () => {
      ScrollTrigger.getAll().forEach((t) => t.disable(false));
    });

    // Cleanup on unmount or breakpoint change
    return () => mm.revert(); // auto-revert GSAP + ScrollTriggers from this mm [6]
  }, [decoded]);

  const handleMore = (slug) => {
    if (onReadMore) onReadMore(slug);
    else window.location.assign(`/products/${slug}`);
  };

  return (
    <section className={styles.section} ref={rootRef}>
      <div className={styles.bgA} />
      <div className={styles.bgB} />

      <div className={styles.header}>
        <span className={styles.badge}>Partners</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.list}>
        {companies.map((c) => (
          <article key={c.id} className={styles.company}>
            <div className={styles.media}>
              <div className={styles.logoRow}>
                {c.logo ? (
                  <Image src={c.logo} alt={`${c.name} logo`} width={28} height={28} className={styles.logo} />
                ) : null}
                <span className={styles.brandName}>{c.name}</span>
              </div>
              <div className={styles.imageWrap}>
                <Image
                  src={c.hero}
                  alt={`${c.name} collaboration`}
                  width={880}
                  height={560}
                  className={styles.brandImage}
                  onLoadingComplete={() => setDecoded(true)} // will trigger a refresh cycle [10]
                />
                <div className={styles.frameGlow} />
              </div>
            </div>

            <div className={styles.brandContent}>
              <h3 className={styles.h3}>In Collaboration with {c.name}</h3>
              {c.blurb ? <p className={styles.blurb}>{c.blurb}</p> : null}
              {c.history ? <p className={styles.history}>{c.history}</p> : null}

              <div className={styles.grid}>
                {c.products?.map((p) => (
                  <div key={p.slug} className={styles.card}>
                    <div className={styles.cardImgWrap}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={420}
                        height={280}
                        className={styles.cardImg}
                        onLoadingComplete={() => setDecoded(true)} // batch-refresh once [10]
                      />
                      <div className={styles.cardBorder} />
                    </div>
                    <div className={styles.cardBody}>
                      <h4 className={styles.product}>{p.name}</h4>
                      <button className={styles.cta} onClick={() => handleMore(p.slug)}>
                        Read More
                        <svg viewBox="0 0 24 24" className={styles.icon}>
                          <path fill="currentColor" d="M13.172 12 8.222 7.05 9.636 5.636 16 12l-6.364 6.364-1.414-1.414z" />
                        </svg>
                      </button>
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
