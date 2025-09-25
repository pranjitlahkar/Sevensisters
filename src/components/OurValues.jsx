"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "@/css/ourvalues.module.css";
import ValuesStats from "./ValuesStats";

export default function OurValues() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.timeline()
        .fromTo(
          heroRef.current.children,
          { opacity: 0, y: 80 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.3, 
            duration: 1.5, 
            ease: "power3.out" 
          }
        );

      // Values animation
      gsap.fromTo(
        valuesRef.current.children,
        { opacity: 0, scale: 0.8, y: 60 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "back.out(1.7)",
          delay: 0.8
        }
      );

    
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.ultraValuesSection} ref={containerRef}>
      {/* Luxury Background Elements */}
      <div className={styles.luxuryBackground}>
        <div className={styles.goldOrb} style={{'--delay': '0s', '--duration': '20s'}}></div>
        <div className={styles.goldOrb} style={{'--delay': '5s', '--duration': '25s'}}></div>
        <div className={styles.goldOrb} style={{'--delay': '10s', '--duration': '18s'}}></div>
      </div>

      {/* Hero Section */}
      <div className={styles.heroContainer} ref={heroRef}>
        <div className={styles.luxuryBadge}>
          <span className={styles.badgeText}>Core Foundations</span>
          <div className={styles.badgeShimmer}></div>
        </div>
        <h1 className={styles.heroTitle}>Our Values</h1>
        <div className={styles.royalDivider}>
          <div className={styles.dividerLine}></div>
          <div className={styles.centerGem}>
            <div className={styles.gemInner}></div>
          </div>
          <div className={styles.dividerLine}></div>
        </div>
        <p className={styles.heroSubtitle}>
          The pillars that define our character, guide our decisions, and drive our commitment 
          to excellence in every aspect of our operations
        </p>
      </div>

      {/* Values Grid */}
      <div className={styles.valuesContainer}>
        <div className={styles.valuesGrid} ref={valuesRef}>
          {/* Empowerment & Inclusion */}
          <div className={styles.valueCard}>
            <div className={styles.cardGlow}></div>
            <div className={styles.iconContainer}>
              <div className={styles.valueIcon}>
                <span className={styles.iconSymbol}>👥</span>
                <div className={styles.iconAura}></div>
              </div>
            </div>
            <h3 className={styles.valueTitle}>Empowerment & Inclusion</h3>
            <div className={styles.titleAccent}></div>
            <p className={styles.valueDescription}>
              We take pride in having a workforce that is <span className={styles.highlight}>80% women</span>, 
              fostering an environment of equality, growth, and opportunity. We believe that diversity 
              drives strength, creativity, and long-term success.
            </p>
            <div className={styles.valueStats}>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>80%</span>
                <span className={styles.statLabel}>Women Workforce</span>
              </div>
            </div>
            <div className={styles.cardShimmer}></div>
          </div>

          {/* Trust & Partnerships */}
          <div className={styles.valueCard}>
            <div className={styles.cardGlow}></div>
            <div className={styles.iconContainer}>
              <div className={styles.valueIcon}>
                <span className={styles.iconSymbol}>🤝</span>
                <div className={styles.iconAura}></div>
              </div>
            </div>
            <h3 className={styles.valueTitle}>Trust & Partnerships</h3>
            <div className={styles.titleAccent}></div>
            <p className={styles.valueDescription}>
              Our enduring relationships with leading companies stand as a testament to the 
              <span className={styles.highlight}> trust and reliability</span> we bring to every 
              collaboration. We value partnerships built on integrity, transparency, and mutual growth.
            </p>
            <div className={styles.valueStats}>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Years of Trust</span>
              </div>
            </div>
            <div className={styles.cardShimmer}></div>
          </div>

          {/* Sustainability & Responsibility */}
          <div className={styles.valueCard}>
            <div className={styles.cardGlow}></div>
            <div className={styles.iconContainer}>
              <div className={styles.valueIcon}>
                <span className={styles.iconSymbol}>🌿</span>
                <div className={styles.iconAura}></div>
              </div>
            </div>
            <h3 className={styles.valueTitle}>Sustainability & Responsibility</h3>
            <div className={styles.titleAccent}></div>
            <p className={styles.valueDescription}>
              We are deeply committed to protecting the environment. Through sustainable practices 
              such as <span className={styles.highlight}>water recycling and waste reduction</span>, 
              we ensure that our operations contribute positively to the planet and future generations.
            </p>
            <div className={styles.valueStats}>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Eco Committed</span>
              </div>
            </div>
            <div className={styles.cardShimmer}></div>
          </div>

          {/* Goodwill & Community */}
          <div className={styles.valueCard}>
            <div className={styles.cardGlow}></div>
            <div className={styles.iconContainer}>
              <div className={styles.valueIcon}>
                <span className={styles.iconSymbol}>❤️</span>
                <div className={styles.iconAura}></div>
              </div>
            </div>
            <h3 className={styles.valueTitle}>Goodwill & Community</h3>
            <div className={styles.titleAccent}></div>
            <p className={styles.valueDescription}>
              Our goodwill is rooted in <span className={styles.highlight}>respect for our people</span>, 
              our partners, our consumers, and the communities we serve. We strive to uphold the 
              highest standards of ethics and social responsibility in everything we do.
            </p>
            <div className={styles.valueStats}>
              <div className={styles.statBadge}>
                <span className={styles.statNumber}>∞</span>
                <span className={styles.statLabel}>Community Impact</span>
              </div>
            </div>
            <div className={styles.cardShimmer}></div>
          </div>
        </div>
      </div>
      <ValuesStats backgroundImage="/images/background/background1.jpg" />
      
      {/* Commitment Statement */}
      <div className={styles.commitmentSection}>
        <div className={styles.commitmentContent}>
          <h3 className={styles.commitmentTitle}>Our Unwavering Commitment</h3>
          <p className={styles.commitmentText}>
            These values are not just words on a page—they are the living principles that guide 
            every decision, every partnership, and every product we create. They represent our 
            promise to our stakeholders and our pledge to future generations.
          </p>
          <div className={styles.signatureBadge}>
            <span>Seven Sisters Trade & Distilleries</span>
            <div className={styles.badgeGlow}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
