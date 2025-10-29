'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { directors } from '@/data/directors';
import styles from './board.module.css';

export const metadata = {
  title: 'Directors',
};

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DirectorDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const containerRef = useRef(null);
  const profileRef = useRef(null);
  const imageRef = useRef(null);
  const infoRef = useRef(null);
  const noteRef = useRef(null);
  const achievementsRef = useRef(null);
  const visionRef = useRef(null);

  const director = directors.find((d) => d.slug === slug);

  useEffect(() => {
    if (!director) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([profileRef.current, noteRef.current, achievementsRef.current, visionRef.current], { 
        opacity: 0, 
        y: 50 
      });

      // Main timeline
      const masterTl = gsap.timeline({ delay: 0.3 });

      // Profile section animation
      masterTl.to(profileRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out' 
      });

      // Image with 3D effect
      masterTl.fromTo(imageRef.current, 
        { scale: 0.8, rotationY: -15 }, 
        { scale: 1, rotationY: 0, duration: 1.5, ease: 'power3.out' }, 
        '-=0.8'
      );

      // Info staggered animation
      masterTl.fromTo(infoRef.current.children, 
        { opacity: 0, x: 30 }, 
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, 
        '-=1'
      );

      // Sections with ScrollTrigger
      [noteRef.current, achievementsRef.current, visionRef.current].forEach((section, index) => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, [director]);

  if (!director) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundContent}>
          <h1>Director not found</h1>
          <button 
            className={styles.backButton} 
            onClick={() => router.push('/directors')}
          >
            ← Back to Directors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.directorNote} ref={containerRef}>
      {/* Luxury Background Elements */}
      <div className={styles.luxuryBackground}>
        <div className={styles.floatingOrb} style={{'--delay': '0s'}}></div>
        <div className={styles.floatingOrb} style={{'--delay': '3s'}}></div>
        <div className={styles.floatingOrb} style={{'--delay': '6s'}}></div>
      </div>

      {/* Back Button */}
      <button className={styles.backButton} onClick={() => router.push('/directors')}>
        <svg className={styles.backIcon} viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        <span>Back to Directors</span>
        <div className={styles.buttonGlow}></div>
      </button>

      {/* Director Profile */}
      <div className={styles.directorProfile} ref={profileRef}>
        <div className={styles.imageContainer} ref={imageRef}>
          <div className={styles.imageFrame}>
            <Image
              src={director.image}
              alt={director.name}
              width={300}
              height={400}
              className={styles.directorImage}
            />
            <div className={styles.imageOverlay}></div>
            <div className={styles.imageGlow}></div>
          </div>
          <div className={styles.crownIcon}>👑</div>
        </div>

        <div className={styles.profileInfo} ref={infoRef}>
          <h1 className={styles.directorName}>{director.name}</h1>
          <div className={styles.premiumDivider}>
            <div className={styles.dividerLine}></div>
            <div className={styles.centerCircle}></div>
            <div className={styles.dividerLine}></div>
          </div>
          <p className={styles.position}>{director.position}</p>
          <p className={styles.education}>{director.education}</p>
          <p className={styles.awards}>{director.awards}</p>
        </div>
      </div>

      {/* Director's Note */}
      <section className={styles.noteSection} ref={noteRef}>
        <div className={styles.sectionHeader}>
          <h2>Director's Message</h2>
          <div className={styles.headerUnderline}></div>
        </div>
        <div className={styles.noteContent}>
          {director.note.split('\n\n').map((para, i) => (
            <p key={i} className={styles.noteParagraph}>{para}</p>
          ))}
        </div>

        <div className={styles.signature}>
          <div className={styles.signatureContent}>
            <p className={styles.signatureName}>{director.signature}</p>
            <p className={styles.signatureTitle}>{director.position}</p>
            <p className={styles.signatureDate}>{director.date}</p>
          </div>
          <div className={styles.signatureStamp}>
            <span>✦</span>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className={styles.achievements} ref={achievementsRef}>
        <div className={styles.sectionHeader}>
          <h3>Key Achievements</h3>
          <div className={styles.headerUnderline}></div>
        </div>
        <ul className={styles.achievementsList}>
          {director.achievements.map((achievement, i) => (
            <li key={i} className={styles.achievementItem}>
              <div className={styles.achievementIcon}>◆</div>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Vision */}

      <section className={styles.vision} ref={visionRef}>
        <div className={styles.sectionHeader}>
          <h3>Vision Statement</h3>
          <div className={styles.headerUnderline}></div>
        </div>
        <div className={styles.visionContent}>
          <div className={styles.visionQuote}>"</div>
          <p className={styles.visionText}>{director.vision}</p>
          <div className={`${styles.visionQuote} closing`}>"</div>
        </div>
      </section>
    </div>
    
  );
}
