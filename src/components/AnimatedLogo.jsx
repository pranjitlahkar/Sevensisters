'use client';

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "@/css/animatedlogo.module.css";
import Image from "next/image";

const AnimatedLogo = ({
  src = "/logo.png", // point this to your actual logo file, e.g. "/1000285999.jpeg"
  alt = "Seven Sisters Distillery Logo",
  size = "large", // small | medium | large
  autoPlay = true,
  tagline = "Trade & Distilleries Pvt. Ltd",
  subtitle = "Premium Spirits Since 2003",
}) => {
  const containerRef = useRef();
  const imageRef = useRef();
  const glowRef = useRef();
  const headingRef = useRef();
  const taglineRef = useRef();
  const subtitleRef = useRef();

  useEffect(() => {
    if (!autoPlay) return;
    gsap.set([imageRef.current, glowRef.current, headingRef.current, taglineRef.current, subtitleRef.current], { opacity: 0, scale: 0.92, y: 30 });

    const tl = gsap.timeline();
    tl.to(glowRef.current, {
      opacity: 1,
      scale: 1.09,
      duration: 1,
      ease: "power1.out"
    }, 0)
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        boxShadow: "0px 2px 48px #c3a66a55",
        duration: 1,
        ease: "power4.out"
      }, 0.15)
      .to(headingRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, 0.45)
      .to(taglineRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, 0.8)
      .to(subtitleRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, 1.0);

    // Subtle floating logo
    gsap.to(imageRef.current, {
      y: -8,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Subtle glow breathing
    gsap.to(glowRef.current, {
      opacity: 0.16,
      scale: 1.14,
      duration: 3.7,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    return () => tl.kill();
  }, [autoPlay]);

  return (
    <section className={`${styles.logoBg} ${styles[size]}`} ref={containerRef}>
      {/* Understated background blending gradient with soft vignette */}
      <div className={styles.bgBlend}></div>

      {/* Soft gold ambient glow */}
      <div className={styles.logoGlow} ref={glowRef}></div>

      {/* Main Logo Image */}
      <div className={styles.logoImgWrapper}>
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={220}
          height={220}
          priority
          className={styles.logoImg}
          draggable={false}
        />
      </div>

      {/* Company Name, tagline, subtitle */}
      <h1 className={styles.logoHeading} ref={headingRef}>
        Seven Sisters
      </h1>
      <span className={styles.logoTagline} ref={taglineRef}>{tagline}</span>
      <span className={styles.logoSubtitle} ref={subtitleRef}>{subtitle}</span>
    </section>
  );
};

export default AnimatedLogo;
