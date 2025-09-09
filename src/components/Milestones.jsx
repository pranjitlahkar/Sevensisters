'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../css/milestones.module.css';

const Milestones = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleMilestones, setVisibleMilestones] = useState(new Set());
  const [activeYear, setActiveYear] = useState(null);
  const sectionRef = useRef(null);
  const milestonesRef = useRef([]);

  // Company milestones from 2003 to 2024
  const milestones = [
    {
      year: 2003,
      title: "The Foundation",
      subtitle: "Seven Sisters Born",
      description: "Founded with a vision to create premium spirits that honor Northeast India's rich cultural heritage. Started with a small distillery and big dreams.",
      icon: "🌟",
      category: "foundation",
      achievements: [
        "Initial investment of ₹50 lakhs",
        "First distillery setup in Guwahati",
        "Team of 12 founding members"
      ]
    },
    {
      year: 2005,
      title: "First Success",
      subtitle: "Market Entry",
      description: "Launched our first premium whiskey blend, receiving overwhelming response from local connoisseurs and establishing our brand presence.",
      icon: "🥃",
      category: "product",
      achievements: [
        "First whiskey blend launched",
        "Local market penetration achieved",
        "Quality certification obtained"
      ]
    },
    {
      year: 2008,
      title: "Regional Expansion",
      subtitle: "Breaking Boundaries",
      description: "Extended operations beyond Assam, reaching neighboring northeastern states and building a loyal customer base across the region.",
      icon: "🗺️",
      category: "expansion",
      achievements: [
        "Operations in 4 northeastern states",
        "Regional distribution network established",
        "Brand recognition increased by 200%"
      ]
    },
    {
      year: 2010,
      title: "Innovation Drive",
      subtitle: "Technology Upgrade",
      description: "Invested in state-of-the-art distillation technology and quality control systems, enhancing production capacity and product quality.",
      icon: "⚡",
      category: "innovation",
      achievements: [
        "Modern copper pot stills installed",
        "Production capacity doubled",
        "ISO 9001:2008 certification"
      ]
    },
    {
      year: 2012,
      title: "Quality Recognition",
      subtitle: "First Major Award",
      description: "Won our first national award for excellence in spirits production, marking Seven Sisters as a serious player in India's premium spirits market.",
      icon: "🏆",
      category: "recognition",
      achievements: [
        "National Excellence Award",
        "Quality leadership recognition",
        "Industry peer acknowledgment"
      ]
    },
    {
      year: 2015,
      title: "Product Diversification",
      subtitle: "Beyond Whiskey",
      description: "Launched premium gin and rum variants, expanding our portfolio to cater to diverse consumer preferences and market segments.",
      icon: "🍸",
      category: "product",
      achievements: [
        "Premium gin series launched",
        "Artisanal rum introduced",
        "Portfolio expanded to 12 variants"
      ]
    },
    {
      year: 2017,
      title: "National Presence",
      subtitle: "Pan-India Operations",
      description: "Achieved nationwide distribution, making Seven Sisters available across major Indian cities and establishing partnerships with premium retailers.",
      icon: "🇮🇳",
      category: "expansion",
      achievements: [
        "Presence in 15+ states",
        "Premium retail partnerships",
        "National distribution network"
      ]
    },
    {
      year: 2019,
      title: "Sustainability Initiative",
      subtitle: "Green Operations",
      description: "Launched comprehensive sustainability program focusing on eco-friendly production, renewable energy adoption, and community development.",
      icon: "🌱",
      category: "sustainability",
      achievements: [
        "Carbon-neutral production achieved",
        "Renewable energy adoption",
        "Community development programs"
      ]
    },
    {
      year: 2021,
      title: "Digital Transformation",
      subtitle: "Technology Leadership",
      description: "Embraced digital technologies for enhanced customer experience, online presence, and smart manufacturing processes during the pandemic era.",
      icon: "📱",
      category: "innovation",
      achievements: [
        "Digital customer engagement platform",
        "Smart manufacturing systems",
        "E-commerce presence established"
      ]
    },
    {
      year: 2023,
      title: "International Recognition",
      subtitle: "Global Excellence",
      description: "Received international awards and began export operations, positioning Seven Sisters as a globally recognized premium Indian spirits brand.",
      icon: "🌍",
      category: "recognition",
      achievements: [
        "International Spirit Awards winner",
        "Export operations to 5 countries",
        "Global brand recognition"
      ]
    },
    {
      year: 2024,
      title: "Future Vision",
      subtitle: "Next Generation",
      description: "Celebrating 21 years of excellence while pioneering next-generation spirits with AI-driven quality control and sustainable practices.",
      icon: "🚀",
      category: "innovation",
      achievements: [
        "AI-powered quality systems",
        "Next-gen product development",
        "21 years of excellence milestone"
      ]
    }
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check which milestones are visible
      milestonesRef.current.forEach((milestone, index) => {
        if (milestone) {
          const rect = milestone.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
          
          if (isVisible) {
            setVisibleMilestones(prev => new Set([...prev, index]));
          }
        }
      });
    };

    const handleMouseMove = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
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
    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseThrottled, { passive: true });
    }
    
    // Initial check for visible milestones
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseThrottled);
      }
    };
  }, [mounted]);

  // Parallax calculations
  const parallaxOffset = Math.min(scrollY * 0.4, 300);
  const mouseParallaxX = mousePosition.x * 20;
  const mouseParallaxY = mousePosition.y * 15;

  return (
    <section className={styles.milestonesSection} ref={sectionRef}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div 
          className={styles.backgroundLayer1}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.1}px, ${parallaxOffset + mouseParallaxY * 0.05}px, 0)`
          }}
        />
        <div 
          className={styles.backgroundLayer2}
          style={{
            transform: `translate3d(${mouseParallaxX * 0.05}px, ${parallaxOffset * 0.7}px, 0)`
          }}
        />
        <div 
          className={styles.timelineBackground}
          style={{
            transform: `translate3d(0px, ${parallaxOffset * 0.3}px, 0)`
          }}
        >
          <div className={styles.timelinePath}></div>
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i}
              className={styles.floatingOrb}
              style={{
                '--delay': `${i * 0.3}s`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${10 + Math.random() * 8}s`
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
            <div className={styles.journeyBadge}>
              <span>Our Journey</span>
            </div>
            
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleMain}>Milestones</span>
              <span className={styles.titleSub}>of Excellence</span>
              <span className={styles.titleYear}>2003 - 2024</span>
            </h2>
            
            <div className={styles.titleDecoration}>
              <div className={styles.decorLine}></div>
              <div className={styles.decorOrb}>
                <div className={styles.orbCore}></div>
                <div className={styles.orbRing}></div>
              </div>
              <div className={styles.decorLine}></div>
            </div>
            
            <p className={styles.sectionDescription}>
              Twenty-one years of unwavering commitment to excellence, innovation, and quality. 
              Discover the key moments that shaped Seven Sisters into the premium spirits leader we are today.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.timelineContainer}>
          <div className={styles.timelineTrack}>
            <div className={styles.progressLine}></div>
            
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                ref={el => milestonesRef.current[index] = el}
                className={`${styles.milestoneItem} ${styles[milestone.category]} ${visibleMilestones.has(index) ? styles.visible : ''}`}
                style={{
                  '--milestone-delay': `${index * 0.2}s`,
                  '--index': index
                }}
                onMouseEnter={() => setActiveYear(milestone.year)}
                onMouseLeave={() => setActiveYear(null)}
              >
                {/* Timeline Dot */}
                <div className={styles.timelineDot}>
                  <div className={styles.dotCore}>
                    <span className={styles.milestoneIcon}>{milestone.icon}</span>
                  </div>
                  <div className={styles.dotRipple}></div>
                  <div className={styles.dotGlow}></div>
                </div>

                {/* Milestone Card */}
                <div className={`${styles.milestoneCard} ${index % 2 === 0 ? styles.left : styles.right}`}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.yearBadge}>
                        <span className={styles.yearNumber}>{milestone.year}</span>
                      </div>
                      <div className={styles.categoryTag}>
                        <span className={`${styles.categoryDot} ${styles[milestone.category]}`}></span>
                        <span className={styles.categoryName}>{milestone.category}</span>
                      </div>
                    </div>
                    
                    <div className={styles.cardBody}>
                      <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                      <p className={styles.milestoneSubtitle}>{milestone.subtitle}</p>
                      <p className={styles.milestoneDescription}>{milestone.description}</p>
                      
                      <div className={styles.achievementsList}>
                        <h4 className={styles.achievementsTitle}>Key Achievements</h4>
                        <ul className={styles.achievements}>
                          {milestone.achievements.map((achievement, idx) => (
                            <li key={idx} className={styles.achievementItem}>
                              <span className={styles.achievementBullet}>✦</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.cardConnector}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className={styles.summarySection}>
          <div className={styles.summaryContent}>
            <div className={styles.summaryHeader}>
              <h3>21 Years of Excellence</h3>
              <p>Building the future of premium spirits, one milestone at a time</p>
            </div>
            
            <div className={styles.summaryStats}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>🏆</div>
                <div className={styles.statNumber}>50+</div>
                <div className={styles.statLabel}>Awards Won</div>
              </div>
              <div className={styles.statSeparator}></div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>🗺️</div>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>States Reached</div>
              </div>
              <div className={styles.statSeparator}></div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>🌍</div>
                <div className={styles.statNumber}>5</div>
                <div className={styles.statLabel}>Countries Exported</div>
              </div>
              <div className={styles.statSeparator}></div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>🍾</div>
                <div className={styles.statNumber}>1M+</div>
                <div className={styles.statLabel}>Bottles Crafted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;
