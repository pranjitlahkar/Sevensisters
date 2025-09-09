'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../css/herosection.module.css';
import { Lato } from 'next/font/google'; // 1) switch to Lato [component-level]
import FeatureCard from './FeatureCard';

const lato = Lato({
    subsets: ['latin'],
    weight: ['400', '700'], // pick what you actually use
    display: 'swap',        // good FOUT behavior
    variable: '--font-lato' // enables CSS variable usage
});
const features = [
  { title: 'Craftsmanship', img: '/images/feature-craft.jpg', text: 'Small-batch precision' },
  { title: 'Quality',       img: '/images/feature-quality.jpg', text: 'Strict QC at every step' },
  { title: 'Since 2003',    img: '/images/feature-heritage.jpg', text: 'Two decades of mastery' },
];

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [viewportHeight, setViewportHeight] = useState(0);
    const heroRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        // Set initial viewport height
        setViewportHeight(window.innerHeight);

        // Update viewport height on resize
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const throttledScroll = throttle(handleScroll, 16);
        window.addEventListener('scroll', throttledScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', throttledScroll);
        };
    }, [mounted]);

    const throttle = (func, limit) => {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };

    const handleCTAClick = (action) => {
        console.log(`CTA clicked: ${action}`);
    };

    const handleScrollDown = () => {
        const nextSection = document.getElementById('next-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Safe parallax calculations
    const parallaxOffset = Math.min(scrollY * 0.2, 100);
    const overlayOpacity = Math.min(scrollY / 1500, 0.4);

    return (
        <section
            className={`${styles.hero} , ${lato.variable}`}
            ref={heroRef}
            style={{ minHeight: `${Math.max(viewportHeight, 700)}px` }}
        >
            {/* Background Elements */}
            <div className={styles.background}>
                <div
                    className={styles.backgroundLayer}
                    style={{ transform: `translateY(${parallaxOffset}px)` }}
                />
                <div
                    className={styles.overlay}
                    style={{ opacity: overlayOpacity }}
                />
            </div>

            {/* Content Container */}
            <div className={styles.container}>
                <div className={styles.content}>

                    {/* Logo */}
                    <div className={styles.logoSection}>
                        <div className={styles.logoContainer}>
                            <Image
                                src="/logo.png"
                                alt="Seven Sisters Logo"
                                width={80}
                                height={80}
                                className={styles.logo}
                                priority
                            />
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className={styles.heading}>
                        <h1 className={styles.title}>
                            <span className={styles.line1}>
                                <span className={styles.word}>Seven</span>
                                <span className={styles.word}>Sisters</span>
                            </span>
                            <span className={styles.line2}>
                                <span className={styles.word}>Trade</span>
                                <span className={styles.connector}>&</span>
                                <span className={styles.word}>Distilleries</span>
                            </span>
                            <span className={styles.company}>Pvt. Ltd</span>
                        </h1>

                        <div className={styles.tagline}>
                            <div className={styles.line}></div>
                            <span className={styles.premium}>Premium Spirits</span>
                            <div className={styles.line}></div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.description}>
                        <p>
                            Where <em>tradition meets innovation</em>, crafting spirits of
                            <strong> unparalleled excellence</strong>. Each bottle represents
                            <strong> artisanal mastery</strong> and <em>heritage</em>.
                        </p>
                    </div>
                    

                    {/* Features */}
                    <div className={styles.features} >
                        



                        <div className={styles.feature}>
                            
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </svg>
                            </div>
                            <h3>Artisanal</h3>
                            <p>Craftsmanship</p>
                        </div>

                        <div className={styles.feature}>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                                </svg>
                            </div>
                            <h3>Premium</h3>
                            <p>Quality</p>
                        </div>

                        <div className={styles.feature}>
                            <div className={styles.icon}>
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l1.09 2.19L15.3 4c.5 0 .9.4.9.9" />
                                </svg>
                            </div>
                            <h3>Heritage</h3>
                            <p>Since 2003</p>
                        </div>
                    </div>


                    {/* Call to Actions */}
                    <div className={styles.actions}>
                        <button
                            className={`${styles.btn} ${styles.primary}`}
                            onClick={() => handleCTAClick('explore')}
                        >
                            <span>Explore Collection</span>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z" />
                            </svg>
                        </button>

                        <button
                            className={`${styles.btn} ${styles.secondary}`}
                            onClick={() => handleCTAClick('heritage')}
                        >
                            <span>Our Heritage</span>
                        </button>
                    </div>

                    {/* Heritage Badge */}
                    <div className={styles.badge}>
                        <span className={styles.est}>Est.2003</span>
                        <span className={styles.sep}>•</span>
                        <span className={styles.loc}>Guwahati, Assam, India</span>
                    </div>

                </div>

                {/* Scroll Indicator */}
                <button
                    className={styles.scroll}
                    onClick={handleScrollDown}
                    style={{ opacity: Math.max(0, 1 - scrollY * 0.002) }}
                >
                    <span>Discover Excellence</span>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
