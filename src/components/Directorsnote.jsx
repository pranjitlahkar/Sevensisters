'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../css/directorsnote.module.css';

const DirectorNote = ({ director }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [readingProgress, setReadingProgress] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  // Default director data in case none is provided
  const defaultDirector = {
    name: "Rajesh Kumar Sharma",
    position: "Chairman & Managing Director",
    image:"/director1.jpg",
    education: "MBA, IIM Calcutta",
    awards: "Business Leader of the Year 2023",
    specialization: "Corporate Strategy & Leadership",
    philosophy: "Leading with integrity and innovation to create lasting value for all stakeholders.",
    note: `Dear Valued Stakeholders,

    It is with immense pride and gratitude that I address you as the Chairman and Managing Director of Seven Sisters Trade & Distilleries Pvt. Ltd. Our journey, which began in 1998, has been one of unwavering commitment to excellence, innovation, and the rich heritage of premium spirits.

    From our humble beginnings in the heart of Assam, we have grown into a distinguished name in the spirits industry, not merely through expansion, but through an uncompromising dedication to quality and craftsmanship. Each bottle that bears our name carries within it the essence of our values: integrity, tradition, and the relentless pursuit of perfection.

    Our success is rooted in three fundamental pillars that guide every decision we make. First, our commitment to quality remains absolute – we source only the finest ingredients and employ time-tested methods refined through decades of expertise. Second, our embrace of innovation ensures we remain at the forefront of industry developments while honoring traditional distillation techniques. Finally, our responsibility to sustainability drives us to create value not just for our shareholders, but for our communities and the environment.

    The challenges of today's global marketplace demand visionary leadership and adaptive strategies. We have consistently demonstrated our ability to navigate complex market dynamics while maintaining our core principles. Our diverse portfolio of premium spirits reflects our understanding of evolving consumer preferences and our commitment to meeting the highest international standards.

    Looking ahead, I envision Seven Sisters continuing to set new benchmarks in the industry. We are investing in state-of-the-art facilities, expanding our research and development capabilities, and fostering partnerships that will drive sustainable growth. Our focus on digital transformation and operational excellence positions us well for the opportunities that lie ahead.

    I extend my heartfelt appreciation to our dedicated team, whose passion and expertise make our vision a reality. To our valued customers, thank you for your trust and loyalty. To our business partners, your collaboration strengthens our collective success. And to our shareholders, your continued confidence enables us to pursue ambitious goals with determination.

    As we write the next chapter of our story, I am confident that Seven Sisters will continue to embody the spirit of excellence that has defined us for over two decades. Together, we will create a legacy that honors our past while embracing the promise of a bright future.

    With warm regards and best wishes,`,
    
    signature: "Rajesh Kumar Sharma",
    date: "January 2024",
    
    achievements: [
      "Led company through 300% revenue growth over 5 years",
      "Expanded operations to 12 states across India",
      "Pioneered sustainable distillation practices",
      "Established international export partnerships"
    ],
    
    vision: "To position Seven Sisters as the leading premium spirits brand in India while maintaining our commitment to quality, sustainability, and community development."
  };

  const directorData = director || defaultDirector;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate reading progress
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight - window.innerHeight;
        const progress = Math.min(window.scrollY / contentHeight, 1);
        setReadingProgress(progress);
      }
    };

    const handleMouseMove = (e) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        });
      }
    };

    const throttle = (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    };

    const handleScrollThrottled = throttle(handleScroll, 16);
    const handleMouseThrottled = throttle(handleMouseMove, 32);

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    if (heroRef.current) {
      heroRef.current.addEventListener('mousemove', handleMouseThrottled, { passive: true });
    }
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseThrottled);
      }
    };
  }, [mounted]);

  const handleBackClick = () => {
    router.back();
  };

  // Parallax calculations
  const parallaxOffset = Math.min(scrollY * 0.6, 300);
  const mouseParallaxX = mousePosition.x * 20;
  const mouseParallaxY = mousePosition.y * 15;
  const contentOpacity = Math.max(0.1, 1 - scrollY * 0.002);

  return (
    <div className={styles.directorNote} ref={contentRef}>
      {/* Reading Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${readingProgress * 100}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection} ref={heroRef}>
        {/* Background Elements */}
        <div className={styles.backgroundElements}>
          <div 
            className={styles.backgroundLayer1}
            style={{
              transform: `translate3d(${mouseParallaxX * 0.3}px, ${parallaxOffset + mouseParallaxY * 0.2}px, 0)`
            }}
          />
          <div 
            className={styles.backgroundLayer2}
            style={{
              transform: `translate3d(${mouseParallaxX * 0.1}px, ${parallaxOffset * 0.7}px, 0)`
            }}
          />
          <div 
            className={styles.particleField}
            style={{
              transform: `translate3d(${mouseParallaxX * 0.05}px, ${parallaxOffset * 0.4}px, 0)`
            }}
          >
            {Array.from({ length: 15 }, (_, i) => (
              <div 
                key={i}
                className={styles.particle}
                style={{
                  '--delay': `${i * 0.2}s`,
                  '--x': `${Math.random() * 100}%`,
                  '--y': `${Math.random() * 100}%`,
                  '--duration': `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div 
          className={styles.heroContent}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.02}px, ${parallaxOffset * 0.2}px, 0)`,
            opacity: contentOpacity
          }}
        >
          {/* Back Button */}
          <button className={styles.backButton} onClick={handleBackClick}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11h12z"/>
            </svg>
            <span>Back to Board</span>
          </button>

          {/* Director Profile */}
          <div className={styles.directorProfile}>
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={directorData.image}
                  alt={directorData.name}
                  width={300}
                  height={400}
                  className={styles.directorImage}
                  priority
                />
                <div className={styles.imageGlow}></div>
              </div>
            </div>

            <div className={styles.profileInfo}>
              <div className={styles.nameSection}>
                <h1 className={styles.directorName}>{directorData.name}</h1>
                <p className={styles.position}>{directorData.position}</p>
              </div>

              <div className={styles.credentials}>
                <div className={styles.credentialItem}>
                  <svg className={styles.credentialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z"/>
                  </svg>
                  <span>{directorData.education}</span>
                </div>
                <div className={styles.credentialItem}>
                  <svg className={styles.credentialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{directorData.awards}</span>
                </div>
              </div>

              <div className={styles.specialization}>
                <h3>Core Expertise</h3>
                <p>{directorData.specialization}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={styles.scrollIndicator}
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.005)
          }}
        >
          <span>Read Director's Message</span>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
          </svg>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          {/* Director's Message */}
          <div className={styles.messageSection}>
            <div className={styles.messageHeader}>
              <h2>Director's Message</h2>
              <div className={styles.headerDecoration}>
                <div className={styles.decorLine}></div>
                <div className={styles.decorOrb}></div>
                <div className={styles.decorLine}></div>
              </div>
            </div>

            <div className={styles.messageContent}>
              <div className={styles.philosophyQuote}>
                <div className={styles.quoteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                </div>
                <p>"{directorData.philosophy}"</p>
              </div>

              <div className={styles.noteText}>
                {directorData.note.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={styles.paragraph}>
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              <div className={styles.signature}>
                <div className={styles.signatureLine}></div>
                <div className={styles.signatureInfo}>
                  <p className={styles.signatureName}>{directorData.signature}</p>
                  <p className={styles.signatureTitle}>{directorData.position}</p>
                  <p className={styles.signatureDate}>{directorData.date}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className={styles.achievementsSection}>
            <h3>Key Achievements</h3>
            <div className={styles.achievementsList}>
              {directorData.achievements.map((achievement, index) => (
                <div key={index} className={styles.achievementItem}>
                  <div className={styles.achievementIcon}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Section */}
          <div className={styles.visionSection}>
            <h3>Vision Statement</h3>
            <div className={styles.visionContent}>
              <div className={styles.visionIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p>{directorData.vision}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectorNote;
