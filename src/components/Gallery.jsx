'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../css/gallery.module.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const galleryRef = useRef(null);
  const itemsRef = useRef([]);

  // Gallery categories with filtering
  const categories = [
    { id: 'all', name: 'All Gallery', icon: '⚡' },
    { id: 'distillery', name: 'Distillery', icon: '🏭' },
    { id: 'products', name: 'Products', icon: '🍾' },
    { id: 'awards', name: 'Awards', icon: '🏆' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'heritage', name: 'Heritage', icon: '🏛️' }
  ];

  // Sample gallery items - replace with your actual images
  const galleryItems = [
    {
      id: 1,
      category: 'distillery',
      title: 'State-of-the-Art Distillation Unit',
      description: 'Our modern copper pot stills ensure the finest quality spirits',
      image: '/director1.jpg',
      aspectRatio: 'landscape',
      featured: true
    },
    {
      id: 2,
      category: 'products',
      title: 'Premium Whiskey Collection',
      description: 'Aged to perfection in oak barrels',
      image: '/director2.jpg',
      aspectRatio: 'portrait'
    },
    {
      id: 3,
      category: 'heritage',
      title: 'Founding Fathers Legacy',
      description: 'Historical moments from our establishment in 1998',
      image: '/director3.jpg',
      aspectRatio: 'square'
    },
    {
      id: 4,
      category: 'awards',
      title: 'Excellence in Quality Award 2023',
      description: 'Recognition for outstanding spirits production',
      image: '/director4.jpg',
      aspectRatio: 'landscape'
    },
    {
      id: 5,
      category: 'distillery',
      title: 'Traditional Fermentation Process',
      description: 'Time-honored techniques meet modern precision',
      image: '/director5.jpg',
      aspectRatio: 'portrait',
      featured: true
    },
    {
      id: 6,
      category: 'events',
      title: 'Annual Tasting Event 2024',
      description: 'Celebrating excellence with connoisseurs',
      image: '/director1.jpg',
      aspectRatio: 'landscape'
    },
    {
      id: 7,
      category: 'products',
      title: 'Artisanal Gin Series',
      description: 'Botanically infused with Assamese herbs',
      image: '/director2.jpg',
      aspectRatio: 'square'
    },
    {
      id: 8,
      category: 'heritage',
      title: 'Original Distillery Building',
      description: 'Where it all began - our historic foundation',
      image: '/director3.jpg',
      aspectRatio: 'portrait'
    },
    {
      id: 9,
      category: 'distillery',
      title: 'Quality Control Laboratory',
      description: 'Ensuring every drop meets our standards',
      image: '/director4.jpg',
      aspectRatio: 'landscape'
    },
    {
      id: 10,
      category: 'awards',
      title: 'Best Distillery Northeast India',
      description: 'Regional excellence recognition',
      image: '/director5.jpg',
      aspectRatio: 'square'
    },
    {
      id: 11,
      category: 'events',
      title: 'Industry Leadership Summit',
      description: 'Leading discussions on sustainable distilling',
      image: '/director1.jpg',
      aspectRatio: 'portrait'
    },
    {
      id: 12,
      category: 'products',
      title: 'Limited Edition Reserve',
      description: 'Exclusive blend for discerning palates',
      image: '/director2.jpg',
      aspectRatio: 'landscape',
      featured: true
    }
  ];

  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check which items are visible for animation
      itemsRef.current.forEach((item, index) => {
        if (item) {
          const rect = item.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
          
          if (isVisible) {
            setVisibleItems(prev => new Set([...prev, index]));
          }
        }
      });
    };

    const handleMouseMove = (e) => {
      const rect = galleryRef.current?.getBoundingClientRect();
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
    if (galleryRef.current) {
      galleryRef.current.addEventListener('mousemove', handleMouseThrottled, { passive: true });
    }
    
    // Initial check for visible items
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      if (galleryRef.current) {
        galleryRef.current.removeEventListener('mousemove', handleMouseThrottled);
      }
    };
  }, [mounted]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setVisibleItems(new Set()); // Reset visibility for new animation
  };

  // Handle lightbox
  const openLightbox = (image) => {
    setLightboxImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  // Parallax calculations
  const parallaxOffset = Math.min(scrollY * 0.3, 200);
  const mouseParallaxX = mousePosition.x * 15;
  const mouseParallaxY = mousePosition.y * 10;

  return (
    <section className={styles.gallerySection} ref={galleryRef}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div 
          className={styles.backgroundLayer1}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.2}px, ${parallaxOffset + mouseParallaxY * 0.1}px, 0)`
          }}
        />
        <div 
          className={styles.backgroundLayer2}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.1}px, ${parallaxOffset * 0.6}px, 0)`
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
              className={styles.floatingParticle}
              style={{
                '--delay': `${i * 0.4}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${8 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container}>
        {/* Section Header */}
        <div 
          className={styles.sectionHeader}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.02}px, 0, 0)`
          }}
        >
          <div className={styles.headerContent}>
            <div className={styles.sectionBadge}>
              <span>Visual Journey</span>
            </div>
            
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleMain}>Gallery</span>
              <span className={styles.titleSub}>Of Excellence</span>
            </h2>
            
            <div className={styles.titleDecoration}>
              <div className={styles.decorLine}></div>
              <div className={styles.decorOrb}>
                <div className={styles.orbInner}></div>
              </div>
              <div className={styles.decorLine}></div>
            </div>
            
            <p className={styles.sectionDescription}>
              Discover the artistry behind every bottle, from our state-of-the-art facilities 
              to award-winning moments that define our legacy of excellence in premium spirits.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles.categoryFilters}>
          <div className={styles.filtersContainer}>
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                style={{
                  '--delay': `${index * 0.1}s`
                }}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.name}</span>
                <div className={styles.categoryGlow}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={styles.galleryGrid}>
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
              className={`${styles.galleryItem} ${styles[item.aspectRatio]} ${item.featured ? styles.featured : ''} ${visibleItems.has(index) ? styles.visible : ''}`}
              style={{
                '--item-delay': `${index * 0.1}s`
              }}
              onClick={() => openLightbox(item)}
            >
              <div className={styles.itemContainer}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className={styles.galleryImage}
                  />
                  <div className={styles.imageOverlay}></div>
                  <div className={styles.imageGlow}></div>
                </div>
                
                <div className={styles.itemContent}>
                  <div className={styles.itemCategory}>
                    <span className={styles.categoryTag}>
                      {categories.find(cat => cat.id === item.category)?.icon} 
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                  
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                  
                  <div className={styles.viewButton}>
                    <span>View Full Size</span>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 9V7l-4 4 4 4v-2h-3V9h3zM3 9h3v4H3v2l4-4-4-4v2z"/>
                    </svg>
                  </div>
                </div>
                
                {item.featured && (
                  <div className={styles.featuredBadge}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>25+</div>
              <div className={styles.statLabel}>Years of Heritage</div>
            </div>
            <div className={styles.statSeparator}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Awards Won</div>
            </div>
            <div className={styles.statSeparator}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>100K+</div>
              <div className={styles.statLabel}>Bottles Crafted</div>
            </div>
            <div className={styles.statSeparator}></div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>12</div>
              <div className={styles.statLabel}>States Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeLightbox}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <div className={styles.lightboxImage}>
              <Image
                src={lightboxImage.image}
                alt={lightboxImage.title}
                width={1200}
                height={800}
                className={styles.fullImage}
              />
            </div>
            
            <div className={styles.lightboxInfo}>
              <div className={styles.lightboxCategory}>
                {categories.find(cat => cat.id === lightboxImage.category)?.icon} 
                {categories.find(cat => cat.id === lightboxImage.category)?.name}
              </div>
              <h3 className={styles.lightboxTitle}>{lightboxImage.title}</h3>
              <p className={styles.lightboxDescription}>{lightboxImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
