'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from '../css/animationwhiskey.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function VideoSection({ 
  videoSrc = "/your-video.mp4",
}) {
  const mainContainerRef = useRef(null)
  const videoContainerRef = useRef(null)
  const videoRef = useRef(null)
  const overlayRef = useRef(null)
  const heroContentRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const featuresSectionRef = useRef(null)
  const ctaSectionRef = useRef(null)

  useGSAP(() => {
    const video = videoRef.current
    const videoContainer = videoContainerRef.current
    const overlay = overlayRef.current
    const heroContent = heroContentRef.current

    if (!video || !videoContainer) return

    // Set initial video state
    video.currentTime = 0
    video.pause()
    video.muted = true
    video.playsInline = true

    // Video scrubbing animation with extended trigger area
    ScrollTrigger.create({
      trigger: mainContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        if (video.duration && !isNaN(video.duration)) {
          // Map scroll progress to video duration (20 seconds)
          const progress = Math.min(Math.max(self.progress * 2, 0), 1) // Doubled for more control
          video.currentTime = video.duration * progress
        }
      }
    })

    // Pin video container during scroll
    ScrollTrigger.create({
      trigger: videoContainer,
      start: "top top",
      end: "200vh top",
      pin: true,
      pinSpacing: false
    })

    // Hero content fade out
    gsap.timeline({
      scrollTrigger: {
        trigger: videoContainer,
        start: "top top",
        end: "50vh top",
        scrub: 1
      }
    }).to([heroContent, overlay], {
      opacity: 0,
      y: -50,
      duration: 1
    })

    // Animate content sections as they come into view
    gsap.utils.toArray([aboutSectionRef.current, featuresSectionRef.current, ctaSectionRef.current]).forEach((section, index) => {
      if (!section) return
      
      const elements = section.querySelectorAll('.animate-in')
      
      gsap.set(elements, { 
        y: 60, 
        opacity: 0 
      })
      
      gsap.to(elements, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2
      })
    })

  }, { scope: mainContainerRef })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      video.currentTime = 0
      ScrollTrigger.refresh()
    }

    video.preload = "metadata"
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  return (
    <div ref={mainContainerRef} className={styles.mainContainer}>
      {/* Video Section */}
      <div ref={videoContainerRef} className={styles.videoContainer}>
        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          preload="metadata"
          controls={false}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        <div ref={overlayRef} className={styles.overlay}>
          <div ref={heroContentRef} className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Experience Excellence</h1>
            <p className={styles.heroDescription}>
              Discover innovation through immersive storytelling
            </p>
            <div className={styles.scrollHint}>
              <span>Scroll to explore</span>
              <div className={styles.scrollArrow}>↓</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section ref={aboutSectionRef} className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2 className={`${styles.sectionTitle} animate-in`}>
                Crafting Digital Experiences
              </h2>
              <p className={`${styles.sectionDescription} animate-in`}>
                We blend creativity with technology to deliver exceptional digital experiences that captivate and inspire. Our passion drives innovation, creating solutions that transform ideas into reality.
              </p>
              <div className={`${styles.statsGrid} animate-in`}>
                <div className={styles.stat}>
                  <h3 className={styles.statNumber}>500+</h3>
                  <p className={styles.statLabel}>Projects Completed</p>
                </div>
                <div className={styles.stat}>
                  <h3 className={styles.statNumber}>50+</h3>
                  <p className={styles.statLabel}>Happy Clients</p>
                </div>
              </div>
            </div>
            <div className={`${styles.aboutImage} animate-in`}>
              <div className={styles.imagePlaceholder}>
                <span>Visual Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresSectionRef} className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} ${styles.centered} animate-in`}>
            Our Expertise
          </h2>
          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} animate-in`}>
              <div className={styles.featureIcon}>🎨</div>
              <h3 className={styles.featureTitle}>Creative Design</h3>
              <p className={styles.featureDescription}>
                Innovative visual solutions that capture attention and convey your brand message effectively.
              </p>
            </div>
            <div className={`${styles.featureCard} animate-in`}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Performance</h3>
              <p className={styles.featureDescription}>
                Lightning-fast experiences optimized for all devices and platforms.
              </p>
            </div>
            <div className={`${styles.featureCard} animate-in`}>
              <div className={styles.featureIcon}>🚀</div>
              <h3 className={styles.featureTitle}>Innovation</h3>
              <p className={styles.featureDescription}>
                Cutting-edge technology and creative approaches to solve complex challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={`${styles.ctaTitle} animate-in`}>
              Ready to Start Your Journey?
            </h2>
            <p className={`${styles.ctaDescription} animate-in`}>
              Let's create something extraordinary together. Get in touch and discover what we can achieve.
            </p>
            <div className={`${styles.ctaButtons} animate-in`}>
              <button className={styles.primaryButton}>
                Get Started
              </button>
              <button className={styles.secondaryButton}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
