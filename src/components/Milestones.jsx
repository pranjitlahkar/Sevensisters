'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../css/milestones.module.css';

const Milestones = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleMilestones, setVisibleMilestones] = useState(new Set());
  const [activeYear, setActiveYear] = useState(null);
  const [particles, setParticles] = useState([]);

  const sectionRef = useRef(null);
  const milestonesRef = useRef([]);

  const milestones = [
  {
    year: 2003,
    title: "Foundation & Vision",
    backgroundImage:'/images/inventory/mineral.jpg', 
    date: "March 2003",
    description: "Seven Sisters Trade and Distillery was established with a vision to create premium spirits that honor traditional craftsmanship while embracing modern innovation. Our founders recognized the untapped potential of the northeastern region for world-class distillation.",
    achievements: [
      {
        icon: "🏢",
        text: "Company incorporation and initial setup"
      },
      {
        icon: "📋",
        text: "Secured distillery licensing and permits"
      },
      {
        icon: "💰",
        text: "Initial seed funding of ₹2.5 crores raised"
      },
      {
        icon: "👥",
        text: "Core founding team of 8 professionals assembled"
      }
    ],
    stats: [
      {
        value: "8",
        label: "Team Members"
      },
      {
        value: "₹2.5Cr",
        label: "Initial Investment"
      }
    ]
  },
  {
    year: 2005,
    title: "Infrastructure Development",
    date: "September 2005",
    description: "Major infrastructure milestone with the completion of our state-of-the-art distillery facility in Assam. This marked the beginning of our production capabilities with imported Scottish copper pot stills and modern fermentation systems.",
    achievements: [
      {
        icon: "🏭",
        text: "50,000 sq ft distillery facility constructed"
      },
      {
        icon: "⚗️",
        text: "First copper pot stills imported from Scotland"
      },
      {
        icon: "🔬",
        text: "Quality control laboratory established"
      },
      {
        icon: "📦",
        text: "Initial storage capacity of 100,000 liters"
      }
    ],
    stats: [
      {
        value: "4",
        label: "Pot Stills"
      },
      {
        value: "100K",
        label: "Liters Capacity"
      },
      {
        value: "50K",
        label: "Sq Ft Facility"
      }
    ]
  },
  {
    year: 2007,
    title: "First Production & Launch",
    date: "June 2007",
    description: "Historic milestone with the launch of our flagship whiskey 'Northeast Heritage'. This marked our entry into the premium spirits market with a product that captured the essence of our region's unique terroir and traditional distillation methods.",
    achievements: [
      {
        icon: "🥃",
        text: "Northeast Heritage Whiskey launched"
      },
      {
        icon: "🏆",
        text: "First batch of 10,000 bottles produced"
      },
      {
        icon: "🎯",
        text: "Distribution network established in 5 states"
      },
      {
        icon: "📈",
        text: "Revenue milestone of ₹50 lakhs achieved"
      }
    ],
    stats: [
      {
        value: "10K",
        label: "Bottles Produced"
      },
      {
        value: "5",
        label: "States Coverage"
      },
      {
        value: "₹50L",
        label: "Revenue"
      }
    ]
  },
  {
    year: 2010,
    title: "Market Expansion",
    date: "April 2010",
    description: "Significant expansion phase with the introduction of premium gin and rum variants. Our product portfolio diversified to cater to evolving consumer preferences while maintaining our commitment to quality and craftsmanship.",
    achievements: [
      {
        icon: "🍸",
        text: "Seven Sisters Premium Gin launched"
      },
      {
        icon: "🥃",
        text: "Heritage Rum collection introduced"
      },
      {
        icon: "🌏",
        text: "Export operations to Southeast Asia began"
      },
      {
        icon: "👥",
        text: "Team expanded to 45 professionals"
      }
    ],
    stats: [
      {
        value: "3",
        label: "Product Lines"
      },
      {
        value: "12",
        label: "States Coverage"
      },
      {
        value: "45",
        label: "Team Members"
      },
      {
        value: "₹2.5Cr",
        label: "Annual Revenue"
      }
    ]
  },
  {
    year: 2013,
    title: "Technology Upgrade",
    date: "November 2013",
    description: "Major technological advancement with the installation of advanced column stills and automated quality control systems. This enhancement significantly improved our production efficiency and product consistency while maintaining artisanal quality.",
    achievements: [
      {
        icon: "🏗️",
        text: "4 advanced column stills installed"
      },
      {
        icon: "🤖",
        text: "Automated quality control system deployed"
      },
      {
        icon: "📊",
        text: "Production capacity increased to 500K liters"
      },
      {
        icon: "🔧",
        text: "Preventive maintenance program implemented"
      }
    ],
    stats: [
      {
        value: "500K",
        label: "Liters Capacity"
      },
      {
        value: "98%",
        label: "Efficiency Rate"
      },
      {
        value: "8",
        label: "Total Stills"
      }
    ]
  },
  {
    year: 2016,
    title: "Awards & Recognition",
    date: "August 2016",
    description: "Landmark year for recognition with multiple national and international awards. Our Northeast Heritage Whiskey won the 'Best Indian Whiskey' at the International Spirits Competition, establishing our reputation in the global market.",
    achievements: [
      {
        icon: "🏆",
        text: "Best Indian Whiskey - International Spirits Competition"
      },
      {
        icon: "🥇",
        text: "Gold Medal - India Spirits Championship"
      },
      {
        icon: "🌟",
        text: "Premium Brand of the Year - Northeast India"
      },
      {
        icon: "📜",
        text: "ISO 9001:2015 certification achieved"
      }
    ],
    stats: [
      {
        value: "5",
        label: "Awards Won"
      },
      {
        value: "95%",
        label: "Quality Score"
      },
      {
        value: "₹8Cr",
        label: "Annual Revenue"
      }
    ]
  },
  {
    year: 2018,
    title: "Sustainability Initiative",
    date: "March 2018",
    description: "Pioneering sustainability efforts with the launch of our 'Green Distillery' program. We became the first distillery in Northeast India to achieve carbon-neutral production through renewable energy adoption and waste management innovations.",
    achievements: [
      {
        icon: "🌱",
        text: "100% renewable energy adoption"
      },
      {
        icon: "♻️",
        text: "Zero liquid discharge system implemented"
      },
      {
        icon: "🌿",
        text: "Organic grain sourcing program launched"
      },
      {
        icon: "📋",
        text: "B-Corp certification achieved"
      }
    ],
    stats: [
      {
        value: "0%",
        label: "Carbon Footprint"
      },
      {
        value: "100%",
        label: "Renewable Energy"
      },
      {
        value: "75%",
        label: "Waste Recycled"
      }
    ]
  },
  {
    year: 2020,
    title: "Digital Transformation",
    date: "July 2020",
    description: "Strategic digital transformation during the pandemic, launching our e-commerce platform and virtual tasting experiences. This innovation helped us maintain customer engagement and sales growth despite challenging market conditions.",
    achievements: [
      {
        icon: "🛒",
        text: "E-commerce platform launched nationwide"
      },
      {
        icon: "💻",
        text: "Virtual tasting experiences introduced"
      },
      {
        icon: "📱",
        text: "Mobile app with 50K+ downloads"
      },
      {
        icon: "🚚",
        text: "Direct-to-consumer delivery network"
      }
    ],
    stats: [
      {
        value: "50K",
        label: "App Downloads"
      },
      {
        value: "15%",
        label: "Online Sales"
      },
      {
        value: "85%",
        label: "Customer Retention"
      }
    ]
  },
  {
    year: 2022,
    title: "International Expansion",
    date: "January 2022",
    description: "Global expansion milestone with exports to 15 countries across Asia, Europe, and North America. Our premium spirits gained international recognition, establishing Seven Sisters as a global brand representing Indian craftsmanship.",
    achievements: [
      {
        icon: "🌍",
        text: "Exports to 15 countries established"
      },
      {
        icon: "🏪",
        text: "Premium retail partnerships in 5 countries"
      },
      {
        icon: "🎖️",
        text: "International Trade Excellence Award"
      },
      {
        icon: "📈",
        text: "300% growth in export revenue"
      }
    ],
    stats: [
      {
        value: "15",
        label: "Countries"
      },
      {
        value: "₹25Cr",
        label: "Export Revenue"
      },
      {
        value: "120",
        label: "Team Members"
      },
      {
        value: "1.2M",
        label: "Liters Capacity"
      }
    ]
  },
  {
    year: 2025,
    title: "Innovation & Future",
    date: "Current",
    description: "Continuing our journey of innovation with cutting-edge distillation technologies, sustainable practices, and premium product development. We're pioneering the future of Indian spirits while honoring our traditional roots and regional heritage.",
    achievements: [
      {
        icon: "🔬",
        text: "AI-powered quality optimization system"
      },
      {
        icon: "🌟",
        text: "Limited edition heritage collection launched"
      },
      {
        icon: "🎓",
        text: "Distillery education center opened"
      },
      {
        icon: "🤝",
        text: "Strategic partnerships with global distributors"
      }
    ],
    stats: [
      {
        value: "2.5M",
        label: "Liters Capacity"
      },
      {
        value: "22",
        label: "Years Legacy"
      },
      {
        value: "₹150Cr",
        label: "Annual Revenue"
      },
      {
        value: "25",
        label: "Countries"
      }
    ]
  }
];




  // Mount check
  useEffect(() => {
    setMounted(true);

    // Generate floating orbs after mount to prevent SSR mismatch
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: `${i * 0.3}s`,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        duration: `${10 + Math.random() * 8}s`
      }))
    );
  }, []);

  // Scroll & mouse parallax effects
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      milestonesRef.current.forEach((milestone, index) => {
        if (milestone) {
          const rect = milestone.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2) {
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
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    const handleScrollThrottled = throttle(handleScroll, 16);
    const handleMouseThrottled = throttle(handleMouseMove, 32);

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    sectionRef.current?.addEventListener('mousemove', handleMouseThrottled, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      sectionRef.current?.removeEventListener('mousemove', handleMouseThrottled);
    };
  }, [mounted]);

  if (!mounted) {
    // Placeholder during SSR to prevent hydration errors
    return <div className={styles.milestonesSectionPlaceholder}></div>;
  }

  const parallaxOffset = Math.min(scrollY * 0.4, 300);
  const mouseParallaxX = mousePosition.x * 20;
  const mouseParallaxY = mousePosition.y * 15;

 return (
  <section className={styles.milestonesSection} ref={sectionRef}>
    {/* Background floating orbs */}
    <div className={styles.timelineBackground}>
      <div className={styles.timelinePath}></div>
      {particles.map(p => (
        <div
          key={p.id}
          className={styles.floatingOrb}
          style={{
            '--delay': p.delay,
            '--x': p.x,
            '--y': p.y,
            '--duration': p.duration
          }}
        />
      ))}
    </div>

    {/* Section Header */}
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Our Journey</h2>
      <p className={styles.sectionSubtitle}>
        Milestones that shaped our legacy of excellence in premium distillery craftsmanship
      </p>
    </div>

    {/* Milestones content */}
    <div className={styles.container}>
      {milestones.map((milestone, index) => (
        <div
          key={milestone.year}
          ref={el => milestonesRef.current[index] = el}
          className={`${styles.milestoneItem} ${visibleMilestones.has(index) ? styles.visible : ''}`}
          data-active={activeYear === milestone.year}
          onMouseEnter={() => setActiveYear(milestone.year)}
          onMouseLeave={() => setActiveYear(null)}
        >
          <div className={styles.milestoneYear}>{milestone.year}</div>
          
          <div 
            className={styles.milestoneContent}
            style={{
              backgroundImage: `url(${milestone.backgroundImage || '/milestones/default-milestone.jpg'})`
            }}
          >
            <div className={styles.milestoneContentWrapper}>
              <div className={styles.milestoneHeader}>
                <h3 className={styles.milestoneTitle}>{milestone.title}</h3>
                <p className={styles.milestoneDate}>{milestone.date}</p>
              </div>
              
              <p className={styles.milestoneDescription}>{milestone.description}</p>
              
              {milestone.achievements && (
                <div className={styles.milestoneAchievements}>
                  {milestone.achievements.map((achievement, idx) => (
                    <div key={idx} className={styles.achievementItem}>
                      <div className={styles.achievementIcon}>{achievement.icon}</div>
                      <span className={styles.achievementText}>{achievement.text}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {milestone.stats && (
                <div className={styles.milestoneStats}>
                  {milestone.stats.map((stat, idx) => (
                    <div key={idx} className={styles.statItem}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

}

export default Milestones;
