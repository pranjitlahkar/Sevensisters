'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '@/css/videoscrubber.module.css';

const CompanyVideo = ({
    videoSrc = "/videos/video2.mp4",
    posterImage = "/images/video-poster.jpg",
    title = "Seven Sisters Distillery",
    subtitle = "Crafting Excellence Since 2003"
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    const videoRef = useRef(null);
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-play video when component mounts
    useEffect(() => {
        if (!mounted || !videoRef.current) return;

        const video = videoRef.current;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;

        const playVideo = async () => {
            try {
                await video.play();
                setIsPlaying(true);
            } catch (error) {
                console.log('Autoplay prevented:', error);
                // Fallback: try to play on user interaction
                const handleInteraction = async () => {
                    try {
                        await video.play();
                        setIsPlaying(true);
                        document.removeEventListener('click', handleInteraction);
                        document.removeEventListener('touchstart', handleInteraction);
                    } catch (err) {
                        console.error('Failed to play video:', err);
                    }
                };

                document.addEventListener('click', handleInteraction);
                document.addEventListener('touchstart', handleInteraction);
            }
        };

        if (video.readyState >= 3) {
            playVideo();
        } else {
            video.addEventListener('canplay', playVideo, { once: true });
        }

        return () => {
            video.removeEventListener('canplay', playVideo);
        };
    }, [mounted]);

    // Parallax and mouse tracking
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
            return function (...args) {
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

    const handleVideoLoad = () => {
        setIsLoaded(true);
    };

    // Parallax calculations
    const parallaxOffset = Math.min(scrollY * 0.1, 50);
    const mouseParallaxX = mousePosition.x * 8;
    const mouseParallaxY = mousePosition.y * 5;

    if (!mounted) {
        return (
            <section className={styles.videoSection}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Loading Premium Experience...</p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.videoSection} ref={sectionRef}>
            {/* Luxury Background Elements */}
            <div className={styles.backgroundElements}>
                <div
                    className={styles.backgroundLayer}
                    style={{
                        transform: `translate3d(${mouseParallaxX * 0.02}px, ${parallaxOffset + mouseParallaxY * 0.01}px, 0)`
                    }}
                />
                <div
                    className={styles.floatingElements}
                    style={{
                        transform: `translate3d(${mouseParallaxX * 0.05}px, ${parallaxOffset * 0.3}px, 0)`
                    }}
                >
                    {Array.from({ length: 8 }, (_, i) => (
                        <div
                            key={i}
                            className={styles.luxuryOrb}
                            style={{
                                '--delay': `${i * 0.6}s`,
                                '--x': `${20 + (i * 12)}%`,
                                '--y': `${15 + (i * 8)}%`,
                                '--duration': `${12 + Math.random() * 6}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Premium Content Overlay */}
            <div className={styles.contentOverlay}>
                <div className={styles.headerContent}>
                    <div className={styles.premiumBadge}>
                        <span className={styles.badgeText}>Premium Craftsmanship</span>
                    </div>

                    <h1 className={styles.mainTitle}>
                        <span className={styles.titleLine1}>{title}</span>
                    </h1>

                    <p className={styles.subtitle}>{subtitle}</p>

                    <div className={styles.decorativeLine}></div>
                </div>
            </div>

            {/* Ultra-Premium Video Container */}
            <div
                className={styles.videoContainer}
                ref={containerRef}
                style={{
                    transform: `translate3d(${mouseParallaxX * 0.3}px, ${mouseParallaxY * 0.2}px, 0)`
                }}
            >
                <div className={`${styles.videoWrapper} ${!isLoaded ? styles.loading : ''}`}>
                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        className={styles.premiumVideo}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster={posterImage}
                        onCanPlay={handleVideoLoad}
                        onLoadedData={handleVideoLoad}
                    >
                        <source src={videoSrc} type="video/mp4" />
                        <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Elegant Loading Overlay */}
                    {!isLoaded && (
                        <div className={styles.videoLoadingOverlay}>
                            <div className={styles.luxurySpinner}></div>
                            <p className={styles.loadingVideoText}>Preparing Your Experience</p>
                        </div>
                    )}

                    {/* Premium Frame Effect */}
                    <div className={styles.videoFrame}></div>

                    {/* Crystalline Overlay Effect */}
                    <div className={styles.crystallineOverlay}></div>
                </div>

                {/* Status Indicator */}
                <div className={styles.statusIndicator}>
                    <div className={`${styles.playStatus} ${isPlaying ? styles.playing : ''}`}>
                        <div className={styles.statusDot}></div>
                        <span className={styles.statusText}>
                            {isPlaying ? 'Live Experience' : 'Preparing...'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Premium Elements */}
           
        </section>
    );
};

export default CompanyVideo;
