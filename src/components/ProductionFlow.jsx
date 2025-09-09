'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/css/productionflow.module.css';

gsap.registerPlugin(ScrollTrigger);

const ProductionFlow = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const connectorsRef = useRef([]);

  const processSteps = [
    {
      id: 1,
      title: "DM Water Plant",
      description: "Demineralized water production through advanced ion exchange technology ensuring pure water for premium distillation.",
      icon: "💧",
      details: "Removes all mineral ions to achieve ultra-pure water quality"
    },
    {
      id: 2,
      title: "Bottle Washing",
      description: "Automated bottle cleaning system with multi-stage washing including alkaline wash, acid rinse, and sterile water final rinse.",
      icon: "🧽",
      details: "Ensures complete sterilization and removes all contaminants"
    },
    {
      id: 3,
      title: "Blending Section",
      description: "Precision blending of premium spirits with demineralized water to achieve perfect alcohol concentration and flavor profile.",
      icon: "⚗️",
      details: "Master blenders create consistent quality and taste profiles"
    },
    {
      id: 4,
      title: "Filling Section",
      description: "High-speed automated filling machines ensure accurate volume measurement and contamination-free bottling process.",
      icon: "🍶",
      details: "Precise volumetric filling with nitrogen purging system"
    },
    {
      id: 5,
      title: "Sealing Section",
      description: "Advanced capping technology with torque control ensures perfect seal integrity and tamper-evident security features.",
      icon: "🔒",
      details: "Multi-stage sealing with leak detection and quality control"
    },
    {
      id: 6,
      title: "Labeling Section",
      description: "Automated labeling system applies front, back, and neck labels with precision alignment and adhesive quality control.",
      icon: "🏷️",
      details: "High-speed labeling with vision systems for perfect placement"
    },
    {
      id: 7,
      title: "Hologram Section",
      description: "Application of security holograms and anti-counterfeiting measures to ensure product authenticity and brand protection.",
      icon: "✨",
      details: "Advanced security features prevent counterfeit products"
    },
    {
      id: 8,
      title: "Scanning Section",
      description: "Comprehensive quality inspection using advanced vision systems for label placement, fill levels, and defect detection.",
      icon: "📷",
      details: "AI-powered inspection ensures 100% quality compliance"
    },
    {
      id: 9,
      title: "Packing Section",
      description: "Automated case packing and shrink wrapping systems prepare products for distribution with protective packaging.",
      icon: "📦",
      details: "Secure packaging optimized for safe transportation"
    },
    {
      id: 10,
      title: "Finished Goods Godown",
      description: "Climate-controlled warehouse storage with inventory management system and quality preservation protocols.",
      icon: "🏪",
      details: "Temperature and humidity controlled storage facility"
    },
    {
      id: 11,
      title: "Dispatch Section",
      description: "Final quality checks, documentation, and loading coordination for timely delivery to distributors and retailers.",
      icon: "🚛",
      details: "Logistics coordination with real-time tracking systems"
    }
  ];

  useEffect(() => {
    const cards = cardsRef.current;
    const connectors = connectorsRef.current;

    // Initial setup
    gsap.set(cards, { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotationX: 15 
    });
    
    gsap.set(connectors, { 
      scaleX: 0, 
      transformOrigin: "left center" 
    });

    // Animate cards in sequence
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Animate connectors
      if (index < connectors.length) {
        gsap.to(connectors[index], {
          scaleX: 1,
          duration: 0.6,
          delay: index * 0.2 + 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });

    // Hover animations
    cards.forEach((card, index) => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.flowSection} ref={containerRef}>
      <div className={styles.header}>
        <h2 className={styles.title}>Production Flow Process</h2>
        <p className={styles.subtitle}>
          From raw materials to finished products - Experience our world-class manufacturing process
        </p>
      </div>

      <div className={styles.flowContainer}>
        {processSteps.map((step, index) => (
          <div key={step.id} className={styles.stepWrapper}>
            <div 
              className={styles.processCard}
              ref={el => cardsRef.current[index] = el}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{step.icon}</span>
                </div>
                <div className={styles.stepNumber}>
                  {step.id.toString().padStart(2, '0')}
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDescription}>{step.description}</p>
                <div className={styles.processDetails}>
                  <span className={styles.detailsIcon}>ℹ️</span>
                  <span className={styles.detailsText}>{step.details}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.qualityBadge}>
                  <span>✓</span>
                  <span>Quality Assured</span>
                </div>
              </div>
            </div>

            {/* Connector between cards */}
            {index < processSteps.length - 1 && (
              <div 
                className={styles.connector}
                ref={el => connectorsRef.current[index] = el}
              >
                <div className={styles.connectorLine}></div>
                <div className={styles.connectorArrow}>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductionFlow;
