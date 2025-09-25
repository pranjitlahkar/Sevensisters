'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../css/videoshowcase.module.css';

const Videoshowcase = ({ autoplay = true, muted = true, loop = true }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !videoRef.current) return;

        const video = videoRef.current;
        video.muted = muted;
        video.loop = loop;

        if (autoplay) {
            const playVideo = async () => {
                try {
                    await video.play();
                } catch (error) {
                    console.log('Autoplay prevented:', error);
                }
            };

            if (video.readyState >= 3) {
                playVideo();
            } else {
                video.addEventListener('canplay', playVideo, { once: true });
            }
        }

        return () => {
            if (video) {
                video.removeEventListener('canplay', () => {});
            }
        };
    }, [mounted, autoplay, muted, loop]);

    useEffect(() => {
        if (!mounted) return;

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
            });
        };

        const throttle = (func, limit) => {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };

        const handleScrollThrottled = throttle(handleScroll, 16);
        const handleMouseThrottled = throttle(handleMouseMove, 32);

        window.addEventListener('scroll', handleScrollThrottled, { passive: true });
        if (sectionRef.current) {
            sectionRef.current.addEventListener('mousemove', handleMouseThrottled, { passive: true });
        }

        return () => {
            window.removeEventListener('scroll', handleScrollThrottled);
            if (sectionRef.current) {
                sectionRef.current.removeEventListener('mousemove', handleMouseThrottled);
            }
        };
    }, [mounted]);

    const handleLoadedMetadata = () => {
        setIsLoaded(true);
    };

    const parallaxOffset = Math.min(scrollY * 0.2, 100);
    const mouseParallaxX = mousePosition.x * 15;
    const mouseParallaxY = mousePosition.y * 10;

    if (!mounted) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
            </div>
        );
    }

    return (
        <section 
            ref={sectionRef}
            className={styles.videoSection}
            style={{
                transform: `translateY(${parallaxOffset}px)`
            }}
        >
            {/* Artistic Background Elements */}
            <div className={styles.backgroundElements}>
                {Array.from({ length: 6 }, (_, i) => (
                    <div
                        key={i}
                        className={styles.floatingOrb}
                        style={{
                            '--x': `${Math.random() * 100}%`,
                            '--y': `${Math.random() * 100}%`,
                            '--duration': `${8 + Math.random() * 4}s`,
                            '--delay': `${Math.random() * 2}s`,
                            transform: `translate(${mouseParallaxX}px, ${mouseParallaxY}px)`
                        }}
                    />
                ))}
            </div>

            {/* Section Header */}
            <div className={styles.sectionHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleBadge}>Behind the Craft</div>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.titleMain}>Our Story</span>
                    </h2>
                    <p className={styles.sectionDescription}>
                        Journey into the heart of Seven Sisters, where tradition meets innovation
                    </p>
                    {/* Animated Divider Line with Circle */}
                    <div className={styles.animatedDivider}>
                        <div className={styles.dividerLineLeft}></div>
                        <div className={styles.dividerCircle}></div>
                        <div className={styles.dividerLineRight}></div>
                    </div>
                </div>
            </div>

            {/* Full-Width Video Container */}
            <div className={styles.videoContainer}>
                <div 
                    className={`${styles.videoPlayer} ${!isLoaded ? styles.loading : ''}`}
                    style={{
                        transform: `translate(${mouseParallaxX * 0.5}px, ${mouseParallaxY * 0.3}px)`
                    }}
                >
                    {/* Video Player */}
                    <video
                        ref={videoRef}
                        className={styles.video}
                        onLoadedMetadata={handleLoadedMetadata}
                        onCanPlay={() => setIsLoaded(true)}
                        playsInline
                        preload="metadata"
                    >
                        <source src="/videos/production.mp4" type="video/mp4" />
                        <source src="/videos/production.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Loading Overlay */}
                    {!isLoaded && (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.loadingSpinner}></div>
                            <p>Loading video...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Videoshowcase;
