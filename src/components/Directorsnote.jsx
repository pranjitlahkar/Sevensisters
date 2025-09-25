'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../css/directorsnote.module.css';

const DirectorNote = ({ director }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [readingProgress, setReadingProgress] = useState(0);
  const [particles, setParticles] = useState([]);
  
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const router = useRouter();

  // Default director data
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

From our humble beginnings in the heart of Assam, we have grown into a distinguished name in the spirits industry, not merely through expansion, but through an uncompromising dedication to quality and craftsmanship. Each bottle that bears our name carries within it the essence of our values: integrity, tradition, and the relentless pursuit of perfection.`,
    
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

  // Split note into paragraphs
  const paragraphs = useMemo(() => 
    directorData.note.split('\n\n').map(p => p.trim()), 
    [directorData.note]
  );

  // Mount flag
  useEffect(() => {
    setMounted(true);

    // Generate particles (once, hydration-safe)
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: `${i * 0.2}s`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: `${6 + Math.random() * 4}s`
    }));
    setParticles(generated);

  }, []);

  // Scroll & Mouse Parallax
  useEffect(() => {
    if (!mounted) return;

    let tickingScroll = false;
    let tickingMouse = false;

    const handleScroll = () => {
      if (!tickingScroll) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight - window.innerHeight;
            setReadingProgress(Math.min(window.scrollY / contentHeight, 1));
          }

          tickingScroll = false;
        });
        tickingScroll = true;
      }
    };

    const handleMouseMove = (e) => {
      if (!tickingMouse) {
        window.requestAnimationFrame(() => {
          const rect = heroRef.current?.getBoundingClientRect();
          if (rect) {
            setMousePosition({
              x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
              y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
            });
          }
          tickingMouse = false;
        });
        tickingMouse = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (heroRef.current) heroRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (heroRef.current) heroRef.current.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted]);

  const handleBackClick = () => router.back();

  // Parallax offsets
  const parallaxOffset = Math.min(scrollY * 0.6, 300);
  const mouseParallaxX = mousePosition.x * 20;
  const mouseParallaxY = mousePosition.y * 15;
  const contentOpacity = Math.max(0.1, 1 - scrollY * 0.002);

  return (
    <div className={styles.directorNote} ref={contentRef}>
      {/* Reading Progress */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${readingProgress * 100}%` }}></div>
      </div>

      {/* Hero */}
      <section className={styles.heroSection} ref={heroRef}>
        <div className={styles.backgroundElements}>
          <div className={styles.backgroundLayer1}
               style={{ transform: `translate3d(${mouseParallaxX * 0.3}px, ${parallaxOffset + mouseParallaxY * 0.2}px, 0)` }} />
          <div className={styles.backgroundLayer2}
               style={{ transform: `translate3d(${mouseParallaxX * 0.1}px, ${parallaxOffset * 0.7}px, 0)` }} />
          <div className={styles.particleField}
               style={{ transform: `translate3d(${mouseParallaxX * 0.05}px, ${parallaxOffset * 0.4}px, 0)` }}>
            {particles.map(p => (
              <div key={p.id} className={styles.particle} style={{
                '--delay': p.delay,
                '--x': p.x,
                '--y': p.y,
                '--duration': p.duration
              }}/>
            ))}
          </div>
        </div>

        <div className={styles.heroContent} style={{
          transform: `translate3d(${mouseParallaxX * 0.02}px, ${parallaxOffset * 0.2}px, 0)`,
          opacity: contentOpacity
        }}>
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
                <Image src={directorData.image} alt={directorData.name} width={300} height={400} className={styles.directorImage} priority />
                <div className={styles.imageGlow}></div>
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h1 className={styles.directorName}>{directorData.name}</h1>
              <p className={styles.position}>{directorData.position}</p>
              <p className={styles.specialization}>{directorData.specialization}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          {paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>{p}</p>
          ))}

          <div className={styles.signature}>
            <p className={styles.signatureName}>{directorData.signature}</p>
            <p className={styles.signatureDate}>{directorData.date}</p>
          </div>

          {/* Achievements */}
          <div className={styles.achievementsSection}>
            <h3>Key Achievements</h3>
            <ul>
              {directorData.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
            </ul>
          </div>

          {/* Vision */}
          <div className={styles.visionSection}>
            <h3>Vision Statement</h3>
            <p>{directorData.vision}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DirectorNote;
