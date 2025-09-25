'use client'
import React, { useEffect, useRef } from 'react'
import styles from '@/css/valuestats.module.css'
import { gsap } from 'gsap'
import Image from 'next/image'

const ValuesStats = ({ backgroundImage = null }) => {
  const containerRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats cards
      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, x: -50 },
        {
          opacity: 1,  
          x: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power2.out',
          delay: 1.5,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef}>
      <div className={styles.impactSection}>
        {/* Background */}
        {backgroundImage ? (
          <div className={styles.backgroundImageContainer}>
            <Image
              src={backgroundImage} // works with import OR "/public" string
              alt="Background"
              fill
              className={styles.backgroundImage}
              priority={false}
              quality={75}
              sizes="100vw"
            />
          </div>
        ) : (
          // Gradient fallback if no image
          <div className={styles.gradientBackground}></div>
        )}

        {/* Overlay */}
        <div className={styles.overlay}></div>

        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.impactTitle}>Our Impact in Numbers</h2>

          <div className={styles.royalDivider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.centerGem}>
              <div className={styles.gemInner}></div>
            </div>
            <div className={styles.dividerLine}></div>
          </div>

          <div className={styles.impactGrid} ref={statsRef}>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>80%</div>
              <div className={styles.impactLabel}>Women Empowerment</div>
              <div className={styles.impactDesc}>
                Leading workforce diversity
              </div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>5+</div>
              <div className={styles.impactLabel}>Trusted Partners</div>
              <div className={styles.impactDesc}>
                Long-term collaborations
              </div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>100%</div>
              <div className={styles.impactLabel}>Sustainable Practices</div>
              <div className={styles.impactDesc}>
                Environmental commitment
              </div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactNumber}>2003</div>
              <div className={styles.impactLabel}>Community Service</div>
              <div className={styles.impactDesc}>
                Since our establishment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValuesStats
