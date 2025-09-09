'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from '@/components/boardofdirectors.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * BoardOfDirectors Component
 * A premium, animated showcase of company leadership with glass morphism effects
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {Array} props.directors - Array of director objects
 * @param {string} props.basePath - Base path for director detail pages (default: '/directors')
 * @param {Function} props.onDirectorClick - Optional callback when director card is clicked
 * @param {boolean} props.enableAnimations - Enable/disable GSAP animations (default: true)
 * @param {string} props.className - Additional CSS classes
 */
export default function BoardOfDirectors({
  title = 'Board of Directors',
  subtitle = 'Visionary leadership guiding our legacy of excellence',
  directors = [],
  basePath = '/directors',
  onDirectorClick,
  enableAnimations = true,
  className = '',
  ...props
}) {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Handle image load completion
  const handleImageLoad = useCallback((directorSlug) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(directorSlug);
      
      // If all images are loaded, trigger animations
      if (newSet.size === directors.length) {
        setImagesLoaded(true);
      }
      
      return newSet;
    });
  }, [directors.length]);

  // GSAP Animations
  useEffect(() => {
    if (!enableAnimations || !sectionRef.current || !imagesLoaded) return;

    const ctx = gsap.context(() => {
      // Header animation
      const headerTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      headerTl
        .fromTo(`.${styles.badge}`, 
          { scale: 0, autoAlpha: 0, rotationZ: -180 }, 
          { scale: 1, autoAlpha: 1, rotationZ: 0, duration: 0.8 }
        )
        .fromTo(`.${styles.title}`, 
          { y: 60, autoAlpha: 0, skewY: 3 }, 
          { y: 0, autoAlpha: 1, skewY: 0, duration: 1 }, 
          '-=0.4'
        )
        .fromTo(`.${styles.subtitle}`, 
          { y: 30, autoAlpha: 0 }, 
          { y: 0, autoAlpha: 1, duration: 0.8 }, 
          '-=0.6'
        );

      // Cards stagger animation
      const cards = gsap.utils.toArray(`.${styles.directorCard}`);
      if (cards.length > 0) {
        gsap.set(cards, { 
          y: 80, 
          autoAlpha: 0, 
          rotationY: -20, 
          scale: 0.8 
        });

        gsap.to(cards, {
          y: 0,
          autoAlpha: 1,
          rotationY: 0,
          scale: 1,
          stagger: {
            amount: 0.8,
            from: 'start',
            ease: 'power2.out'
          },
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        // Individual card hover effects and parallax
        cards.forEach((card, index) => {
          const cardImage = card.querySelector(`.${styles.directorImage}`);
          const cardContent = card.querySelector(`.${styles.cardContent}`);
          
          if (cardImage) {
            // Subtle parallax on scroll
            gsap.fromTo(cardImage,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1
                }
              }
            );
          }

          // Magnetic hover effect
          const handleMouseMove = (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            gsap.to(card, {
              rotationX: y * 8,
              rotationY: x * 8,
              duration: 0.3,
              ease: 'power2.out'
            });
            
            if (cardContent) {
              gsap.to(cardContent, {
                x: x * 10,
                y: y * 10,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              duration: 0.5,
              ease: 'power2.out'
            });
            
            if (cardContent) {
              gsap.to(cardContent, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);

          return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
          };
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [imagesLoaded, enableAnimations]);

  // Handle director card click
  const handleDirectorClick = useCallback((director, event) => {
    if (onDirectorClick) {
      event.preventDefault();
      onDirectorClick(director);
    }
  }, [onDirectorClick]);

  // Error boundary for individual director cards
  const DirectorCard = ({ director, index }) => {
    if (!director || !director.slug) {
      console.warn('BoardOfDirectors: Invalid director data', director);
      return null;
    }

    return (
      <article 
        key={director.slug} 
        className={styles.directorCard}
        data-director={director.slug}
      >
        <div className={styles.cardGlass}>
          <div className={styles.cardGlassOverlay} />
          
          {/* Director Image */}
          <div className={styles.imageContainer}>
            <div className={styles.imageFrame}>
              <Image
                src={director.image}
                alt={`${director.name} - ${director.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.directorImage}
                onLoadingComplete={() => handleImageLoad(director.slug)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                priority={index < 2}
                quality={85}
              />
              <div className={styles.imageOverlay} />
            </div>
            
            {/* Floating Year Badge */}
            <div className={styles.yearBadge}>
              Since {director.joinedYear || 'N/A'}
            </div>
          </div>

          {/* Director Info */}
          <div className={styles.cardContent}>
            <header className={styles.directorHeader}>
              <h3 className={styles.directorName}>{director.name}</h3>
              <p className={styles.directorTitle}>{director.title}</p>
            </header>

            <p className={styles.shortBio}>
              {director.shortBio || 'Bio coming soon...'}
            </p>

            {/* Expertise Tags */}
            {director.expertise && director.expertise.length > 0 && (
              <div className={styles.expertiseTags}>
                {director.expertise.slice(0, 2).map((skill, idx) => (
                  <span key={idx} className={styles.expertiseTag}>
                    {skill}
                  </span>
                ))}
                {director.expertise.length > 2 && (
                  <span className={styles.expertiseTag}>
                    +{director.expertise.length - 2} more
                  </span>
                )}
              </div>
            )}

            {/* Read More Button */}
            <Link 
              href={`${basePath}/${director.slug}`}
              className={styles.readMoreBtn}
              onClick={(e) => handleDirectorClick(director, e)}
              aria-label={`Read full profile and director's note from ${director.name}`}
            >
              <span className={styles.btnText}>Read Director's Note</span>
              <svg className={styles.btnIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
              </svg>
              <div className={styles.btnShimmer} />
            </Link>
          </div>
        </div>
      </article>
    );
  };

  if (!directors || directors.length === 0) {
    return (
      <section className={`${styles.boardSection} ${className}`} {...props}>
        <div className={styles.emptyState}>
          <h2>Board information coming soon</h2>
          <p>We're updating our leadership profiles.</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`${styles.boardSection} ${className}`} 
      ref={sectionRef}
      role="region"
      aria-labelledby="board-title"
      {...props}
    >
      <div className={styles.ambientBg} aria-hidden="true" />
      <div className={styles.gradientOverlay} aria-hidden="true" />
      
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.badge} aria-hidden="true">Leadership</div>
        <h2 id="board-title" className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      {/* Directors Grid */}
      <div 
        className={styles.directorsGrid} 
        ref={cardsRef}
        role="list"
        aria-label="Board of Directors"
      >
        {directors.map((director, index) => (
          <DirectorCard 
            key={director.slug || index} 
            director={director} 
            index={index} 
          />
        ))}
      </div>

      {/* Loading indicator */}
      {!imagesLoaded && (
        <div className={styles.loadingIndicator} aria-hidden="true">
          <div className={styles.spinner} />
        </div>
      )}
    </section>
  );
}
