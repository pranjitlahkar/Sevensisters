'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../css/ourstory.module.css';

const OurStory = () => {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  const sectionRef = useRef(null);
  const observerRefs = useRef([]);

  // Story content data
  const storyContent = [
    {
      year: '1998',
      title: 'The Genesis',
      subtitle: 'Where Dreams Began',
      content: `In the heart of Assam, a vision was born. Founded with an unwavering commitment to excellence, Seven Sisters began as a modest venture with grand aspirations. Our founders recognized the untapped potential of Northeast India's rich agricultural heritage and decided to transform it into liquid gold.`,
      image: '/story/founding-story.jpg',
      highlights: [
        'Founded in the scenic hills of Assam',
        'Initial investment of ₹50 lakhs',
        'Vision to create premium spirits',
        'Team of passionate pioneers'
      ]
    },
    {
      year: '2003',
      title: 'First Milestone',
      subtitle: 'The Breakthrough',
      content: `Our first premium whiskey hit the market, instantly capturing the attention of connoisseurs across the region. This wasn't just a product launch; it was the birth of a legacy. The perfect blend of traditional techniques and modern precision set us apart from day one.`,
      image: '/story/first-whiskey.jpg',
      highlights: [
        'First premium whiskey launched',
        'Immediate regional recognition',
        'Traditional distillation methods',
        'Quality over quantity approach'
      ]
    },
    {
      year: '2010',
      title: 'Innovation Era',
      subtitle: 'Embracing Technology',
      content: `A decade of growth culminated in significant technological advancement. We invested in state-of-the-art copper pot stills and modern quality control systems while preserving our time-honored traditions. This perfect marriage of old and new became our signature approach.`,
      image: '/story/innovation-lab.jpg',
      highlights: [
        'State-of-the-art distillery equipment',
        'Advanced quality control systems',
        'Preserved traditional methods',
        'Doubled production capacity'
      ]
    },
    {
      year: '2018',
      title: 'National Recognition',
      subtitle: 'Beyond Boundaries',
      content: `Our spirits crossed regional boundaries, earning national acclaim and prestigious awards. Seven Sisters became synonymous with premium quality, establishing distribution networks across major Indian cities and building a loyal nationwide customer base.`,
      image: '/story/awards-recognition.jpg',
      highlights: [
        'Pan-India distribution network',
        'Multiple industry awards',
        'National brand recognition',
        'Premium market position'
      ]
    },
    {
      year: '2024',
      title: 'Global Aspirations',
      subtitle: 'The Future Unfolds',
      content: `Today, we stand at the threshold of international expansion. With over two decades of excellence behind us, Seven Sisters is ready to share India's finest spirits with the world. Our journey from a local dream to a global vision continues.`,
      image: '/story/global-vision.jpg',
      highlights: [
        'International export initiatives',
        '25+ years of excellence',
        'Global quality standards',
        'Sustainable future practices'
      ]
    }
  ];

  // Company values and achievements
  const achievements = [
    {
      icon: '🏆',
      number: '50+',
      label: 'Awards Won',
      description: 'Recognition for excellence in spirits production'
    },
    {
      icon: '🗺️',
      number: '15+',
      label: 'States Covered',
      description: 'Pan-India presence with premium distribution'
    },
    {
      icon: '🍾',
      number: '1M+',
      label: 'Bottles Crafted',
      description: 'Premium spirits delivered to connoisseurs'
    },
    {
      icon: '⭐',
      number: '25+',
      label: 'Years Legacy',
      description: 'Decades of unwavering commitment to quality'
    }
  ];

  useEffect(() => {
    const observers = [];
    
    observerRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, index]));
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Auto-advance story timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStoryIndex(prev => (prev + 1) % storyContent.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [storyContent.length]);

  const parallaxOffset = Math.min(scrollY * 0.3, 200);
  const mouseParallaxX = mousePosition.x * 15;
  const mouseParallaxY = mousePosition.y * 10;

  return (
    <section className={styles.ourStorySection} ref={sectionRef}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div 
          className={styles.backgroundLayer}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.05}px, ${parallaxOffset * 0.3}px, 0)`
          }}
        />
        <div 
          className={styles.floatingElements}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.02}px, ${parallaxOffset * 0.5}px, 0)`
          }}
        >
          {Array.from({ length: 15 }, (_, i) => (
            <div 
              key={i}
              className={styles.floatingParticle}
              style={{
                '--delay': `${i * 0.3}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div 
          className={styles.sectionHeader}
          ref={el => observerRefs.current[0] = el}
        >
          <div className={`${styles.headerContent} ${visibleSections.has(0) ? styles.visible : ''}`}>
            <div className={styles.badge}>Our Journey</div>
            
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleMain}>Our Story</span>
              <span className={styles.titleSub}>of Excellence</span>
            </h2>
            
            <div className={styles.titleDecoration}>
              <div className={styles.decorLine}></div>
              <div className={styles.decorOrb}>
                <div className={styles.orbCore}></div>
              </div>
              <div className={styles.decorLine}></div>
            </div>
            
            <p className={styles.sectionDescription}>
              From humble beginnings in 1998 to becoming India's premier spirits brand, 
              discover the passion, innovation, and unwavering commitment that defines Seven Sisters.
            </p>
          </div>
        </div>

        {/* Interactive Story Timeline */}
        <div 
          className={styles.storyTimeline}
          ref={el => observerRefs.current[1] = el}
        >
          <div className={`${styles.timelineContainer} ${visibleSections.has(1) ? styles.visible : ''}`}>
            <div className={styles.timelineTrack}></div>
            
            {storyContent.map((story, index) => (
              <div 
                key={story.year}
                className={`${styles.timelineItem} ${index === activeStoryIndex ? styles.active : ''}`}
                style={{ '--index': index }}
                onClick={() => setActiveStoryIndex(index)}
              >
                <div className={styles.timelineDot}>
                  <span className={styles.timelineYear}>{story.year}</span>
                </div>
                
                <div className={styles.timelineContent}>
                  <div className={styles.timelineCard}>
                    <div className={styles.cardImage}>
                      <Image
                        src={story.image}
                        alt={story.title}
                        width={400}
                        height={300}
                        className={styles.storyImage}
                      />
                      <div className={styles.imageOverlay}></div>
                    </div>
                    
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.storyTitle}>{story.title}</h3>
                        <p className={styles.storySubtitle}>{story.subtitle}</p>
                      </div>
                      
                      <p className={styles.storyContent}>{story.content}</p>
                      
                      <div className={styles.storyHighlights}>
                        <h4>Key Highlights</h4>
                        <ul>
                          {story.highlights.map((highlight, idx) => (
                            <li key={idx}>
                              <span className={styles.highlightBullet}>✦</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div 
          className={styles.achievementsSection}
          ref={el => observerRefs.current[2] = el}
        >
          <div className={`${styles.achievementsContainer} ${visibleSections.has(2) ? styles.visible : ''}`}>
            <div className={styles.achievementsHeader}>
              <h3>Milestones of Excellence</h3>
              <p>Numbers that tell our story of growth, quality, and recognition</p>
            </div>
            
            <div className={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={styles.achievementCard}
                  style={{ '--card-delay': `${index * 0.1}s` }}
                >
                  <div className={styles.achievementIcon}>{achievement.icon}</div>
                  <div className={styles.achievementNumber}>{achievement.number}</div>
                  <div className={styles.achievementLabel}>{achievement.label}</div>
                  <div className={styles.achievementDescription}>{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div 
          className={styles.valuesSection}
          ref={el => observerRefs.current[3] = el}
        >
          <div className={`${styles.valuesContainer} ${visibleSections.has(3) ? styles.visible : ''}`}>
            <div className={styles.valuesContent}>
              <div className={styles.valuesText}>
                <h3>Our Core Values</h3>
                <p className={styles.valuesDescription}>
                  The principles that guide every decision, every process, and every drop 
                  of our premium spirits. These values have remained constant throughout 
                  our journey from a local distillery to a nationally recognized brand.
                </p>
                
                <div className={styles.valuesList}>
                  <div className={styles.valueItem}>
                    <div className={styles.valueIcon}>🎯</div>
                    <div>
                      <h4>Excellence</h4>
                      <p>Uncompromising commitment to quality in every aspect</p>
                    </div>
                  </div>
                  <div className={styles.valueItem}>
                    <div className={styles.valueIcon}>🤝</div>
                    <div>
                      <h4>Integrity</h4>
                      <p>Transparent practices and ethical business conduct</p>
                    </div>
                  </div>
                  <div className={styles.valueItem}>
                    <div className={styles.valueIcon}>🌱</div>
                    <div>
                      <h4>Innovation</h4>
                      <p>Continuous improvement and forward-thinking approach</p>
                    </div>
                  </div>
                  <div className={styles.valueItem}>
                    <div className={styles.valueIcon}>💚</div>
                    <div>
                      <h4>Sustainability</h4>
                      <p>Responsible practices for a better tomorrow</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.valuesImage}>
                <Image
                  src="/story/values-craftsmanship.jpg"
                  alt="Our Values in Action"
                  width={500}
                  height={600}
                  className={styles.craftImage}
                />
                <div className={styles.imageFrame}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
