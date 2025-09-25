'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from '@/css/vision.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Vision = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const dividerRef = useRef(null)
    const imageRef = useRef(null)
    const iconRef = useRef(null)
    const textRef = useRef(null)
    const goalsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline for entrance animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

            // Animate title
            tl.fromTo(titleRef.current, 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            )

            // Animate divider reveal
            tl.fromTo(dividerRef.current, 
                { opacity: 0, scaleX: 0 }, 
                { opacity: 1, scaleX: 1, duration: 1.2, ease: 'power2.out' }, 
                '-=0.5'
            )

            // Animate image with 3D effect
            tl.fromTo(imageRef.current, 
                { opacity: 0, rotationY: -15, scale: 0.9 }, 
                { opacity: 1, rotationY: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, 
                '-=0.8'
            )

            // Animate icon
            tl.fromTo(iconRef.current, 
                { opacity: 0, scale: 0, rotation: -180 }, 
                { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }, 
                '-=1'
            )

            // Animate text content
            tl.fromTo(textRef.current, 
                { opacity: 0, x: 50 }, 
                { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }, 
                '-=0.8'
            )

            // Animate goal cards with stagger
            tl.fromTo(goalsRef.current.children, 
                { opacity: 0, y: 30, x: -20 }, 
                { 
                    opacity: 1, 
                    y: 0, 
                    x: 0, 
                    duration: 0.8, 
                    stagger: 0.2, 
                    ease: 'power2.out' 
                }, 
                '-=0.6'
            )

            // Continuous animations
            // Crown floating animation
            gsap.to(`.${styles.crownIcon}`, {
                y: -10,
                rotation: 5,
                duration: 3,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            })

            // Icon floating animation
            gsap.to(iconRef.current, {
                y: -8,
                duration: 2.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            })

            // Divider line shimmer animation
            gsap.fromTo(`.${styles.dividerLine}::before`, 
                { left: '-100%' },
                { 
                    left: '100%', 
                    duration: 3, 
                    ease: 'power2.inOut', 
                    repeat: -1, 
                    repeatDelay: 1 
                }
            )

            // Circle glow animation
            gsap.to(`.${styles.centerCircle}`, {
                scale: 1.2,
                boxShadow: '0 0 35px rgba(195, 166, 106, 0.7)',
                duration: 2,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            })

            // Inner circle pulse
            gsap.to(`.${styles.circleInner}`, {
                scale: 1.5,
                opacity: 1,
                duration: 1.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div>
            {/* Vision Section */}
            <div className={styles.visionSection} ref={sectionRef}>
                <div className={styles.sectionContainer}>
                    <div className={styles.visualSide}>
                        <div className={styles.luxuryVisual}>
                            <div className={styles.visualFrame} ref={imageRef}>
                                <img
                                    src="/images/logo/logorhino.png"
                                    alt="Global Vision"
                                    className={styles.luxuryImage}
                                />
                                <div className={styles.imageOverlay}></div>
                                {/* <div className={styles.crownOverlay}>
                                    <img
                                        src="/icons/crown-premium.svg"
                                        alt="Crown"
                                        className={styles.crownIcon}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className={styles.contentSide}>
                        <div className={styles.iconContainer}>
                            <div className={styles.luxuryIcon} ref={iconRef}>
                                <span className={styles.iconSymbol}>👑</span>
                                <div className={styles.iconAura}></div>
                            </div>
                        </div>
                        <div className={styles.textContent}>
                            <h2 className={styles.sectionTitle} ref={titleRef}>Our Vision</h2>
                            
                            {/* Premium Animated Divider */}
                            <div className={styles.premiumDivider} ref={dividerRef}>
                                <div className={styles.dividerLine}></div>
                                <div className={styles.centerCircle}>
                                    <div className={styles.circleInner}></div>
                                </div>
                                <div className={styles.dividerLine}></div>
                            </div>
                            
                            <div className={styles.visionText} ref={textRef}>
                                <p className={styles.primaryText}>
                                    Our vision is to become a <span className={styles.highlight}>globally recognized leader</span>
                                    in the liquor industry, celebrated for our craftsmanship, innovation,
                                    and commitment to excellence. We aspire to set new benchmarks in
                                    quality and sustainability, building iconic brands that resonate
                                    across cultures and continents while showcasing the rich heritage of our craft.
                                </p>
                            </div>
                            <div className={styles.visionGoals} ref={goalsRef}>
                                <div className={styles.goalCard}>
                                    <div className={styles.goalIcon}>🌍</div>
                                    <h3 className={styles.goalTitle}>Global Recognition</h3>
                                    <p className={styles.goalDesc}>Leading the industry with exceptional craftsmanship</p>
                                </div>
                                <div className={styles.goalCard}>
                                    <div className={styles.goalIcon}>⚡</div>
                                    <h3 className={styles.goalTitle}>Quality Benchmarks</h3>
                                    <p className={styles.goalDesc}>Setting new standards in sustainability</p>
                                </div>
                                <div className={styles.goalCard}>
                                    <div className={styles.goalIcon}>✨</div>
                                    <h3 className={styles.goalTitle}>Iconic Brands</h3>
                                    <p className={styles.goalDesc}>Resonating across cultures and continents</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vision
