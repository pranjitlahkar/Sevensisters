'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/scrollvideo.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scrollvideo({
  srcMp4 = '/video.mp4',
  srcWebm = '/heritage-film.webm',
  poster = '/logo.png',
  scrollLength = 1800 // px of scroll to scrub through entire video
}) {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const stRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const progressBar = progressRef.current;

    const init = () => {
      if (!video || isNaN(video.duration) || video.duration === 0) return;
      if (stRef.current) stRef.current.kill();

      // Ensure start at 0 for consistent scrubbing
      video.currentTime = 0;

      // Scrub currentTime with scroll
      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollLength}`,
        pin: frameRef.current,
        scrub: 0.5,
        onUpdate: self => {
          const dur = video.duration || 0;
          if (dur > 0) {
            video.currentTime = self.progress * dur;
            if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
          }
        }
      });

      // Subtle parallax on the frame
      gsap.to(frameRef.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    };

    // Run once metadata is ready to get accurate duration
    if (video.readyState >= 2) init();
    else {
      const onMeta = () => init();
      video.addEventListener('loadedmetadata', onMeta, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [scrollLength]);

  return (
    <section className={styles.scrollVideoSection} ref={sectionRef}>
      {/* Decorative background */}
      <div className={styles.bgLayerA} />
      <div className={styles.bgLayerB} />

      {/* Pinned frame */}
      <div className={styles.videoFrame} ref={frameRef}>
        <div className={styles.frameCorners} aria-hidden="true">
          <span className={styles.corner} />
          <span className={styles.corner} />
          <span className={styles.corner} />
          <span className={styles.corner} />
        </div>

        <video
          ref={videoRef}
          className={styles.video}
          playsInline
          preload="metadata"
          poster={poster}
          muted
        >
          <source src={srcWebm} type="video/webm" />
          <source src={srcMp4} type="video/mp4" />
        </video>

        {/* Minimal progress */}
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressFill} ref={progressRef} />
        </div>
      </div>
    </section>
  );
}
