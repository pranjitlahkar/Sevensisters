// components/ScrollGalleryLuxe.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from '../css/scrollgallery.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollGallery({
  title = 'Signature Gallery',
  subtitle = 'From still to bottle—our craft in motion',
  images = [
    { src: '/gallery/copper-stills.jpg', alt: 'Copper pot stills' },
    { src: '/gallery/fermentation-tanks.jpg', alt: 'Fermentation tanks' },
    { src: '/gallery/oak-warehouse.jpg', alt: 'Oak barrel warehouse' },
    { src: '/gallery/bottling-line.jpg', alt: 'Automated bottling line' }
  ],
  logoSrc = '/logo.png',     // NEW: watermark source
  snap = true
}) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const railRef = useRef(null);
  const [decoded, setDecoded] = useState(false);

  useEffect(() => {
    if (!rootRef.current || !stageRef.current) return;

    const slidesSel = `.${styles.slide}`;
    const imgSel = `.${styles.img}`;
    const dotSel = `.${styles.dot}`;

    gsap.set(slidesSel, { autoAlpha: 0, zIndex: 0 });
    gsap.set(`${slidesSel}:first-child`, { autoAlpha: 1, zIndex: 1 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top top',
        end: `+=${images.length * 720}`,
        pin: true,
        scrub: 0.65,
        snap: snap ? { snapTo: (v) => {
          const seg = 1 / images.length;
          return Math.round(v / seg) * seg;
        }, duration: 0.2, ease: 'power1.out' } : false
      }
    });

    // Progress fill
    const progressFill = railRef.current?.querySelector(`.${styles.progressFill}`);
    if (progressFill) {
      gsap.to(progressFill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }

    // Dots active state
    const dots = gsap.utils.toArray(dotSel);
    const activateDot = (idx) => dots.forEach((d, i) => d.classList.toggle(styles.active, i === idx));

    images.forEach((_, i) => {
      const curr = `${slidesSel}:nth-child(${i + 1})`;
      const next = `${slidesSel}:nth-child(${((i + 1) % images.length) + 1})`;

      tl
        .to(`${curr} ${imgSel}`, { xPercent: -10, scale: 1.06, duration: 0.6 }, i)
        .fromTo(`${next} ${imgSel}`, { xPercent: 12, scale: 1.08 }, { xPercent: 0, scale: 1, duration: 0.6 }, i)
        .to(curr, { autoAlpha: 0, zIndex: 0, duration: 0.35 }, i + 0.35)
        .to(next, { autoAlpha: 1, zIndex: 1, duration: 0.35, onStart: () => activateDot((i + 1) % images.length) }, i + 0.35);
    });

    // Gentle floating watermark animation (subtle)
    gsap.to(`.${styles.watermark}`, {
      y: -8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      duration: 3.5
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener('load', onLoad, { once: true });

    return () => {
      window.removeEventListener('load', onLoad);
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [decoded, images, snap]);

  return (
    <section className={styles.section} ref={rootRef}>
      <div className={styles.bgA} />
      <div className={styles.bgB} />
      <div className={styles.vignette} />

      <div className={styles.header}>
        <span className={styles.badge}>Gallery</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.shell}>
        <div className={styles.progress} ref={railRef} aria-hidden="true">
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} />
          </div>
          <div className={styles.dots}>
            {images.map((_, i) => <span key={i} className={styles.dot} />)}
          </div>
        </div>

        <div className={styles.stage} aria-label="Scroll-controlled gallery" ref={stageRef}>
          {/* Watermark (logo) */}
          <div className={styles.watermark} aria-hidden="true">
            <Image
              src={logoSrc}
              alt=""
              width={640}
              height={640}
              className={styles.watermarkImg}
              priority
            />
          </div>

          {images.map((img, idx) => (
            <figure className={styles.slide} key={idx}>
              <Image
                src={img.src}
                alt={img.alt}
                width={1600}
                height={1000}
                priority={idx === 0}
                className={styles.img}
                onLoadingComplete={() => setDecoded(true)}
              />
              <figcaption className={styles.caption}>
                <span className={styles.captionLine} />
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
