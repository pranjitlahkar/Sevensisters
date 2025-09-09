'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../css/navbartwo.module.css';
import { Lato } from 'next/font/google'; // 1) switch to Lato [component-level]

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], // pick what you actually use
  display: 'swap',        // good FOUT behavior
  variable: '--font-lato' // enables CSS variable usage
});

const Navbartwo = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  const handleNavigation = (page, event) => {
    event.preventDefault();
    console.log(`Navigating to: ${page}`);
    
    // Close mobile menu and dropdown
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    
    // Add your navigation logic here
    // For example: router.push(`/${page}`);
  };

  const handleDropdownClick = (event) => {
    event.preventDefault();
  };

  return (
    <nav 
      ref={navRef}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${lato.variable}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.container}>
        {/* Brand Logo */}
        <div className={styles.brand}>
          <a 
            href="#" 
            onClick={(e) => handleNavigation('home', e)}
            className={styles.logoLink}
            aria-label="Seven Sisters Home"
          >
            <Image 
              src="/logo.png" 
              alt="Seven Sisters Logo" 
              width={70}
              height={70}
              className={styles.logo}
              priority
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className={styles.desktopNav} role="menubar">
          <li className={styles.navItem} role="none">
            <a 
              href="#" 
              onClick={(e) => handleNavigation('home', e)}
              className={styles.navLink}
              role="menuitem"
            >
              Home
            </a>
          </li>
          
          <li className={`${styles.navItem} ${styles.hasDropdown}`} role="none">
            <button 
              className={`${styles.navLink} ${styles.dropdownTrigger}`}
              onClick={handleDropdownClick}
              aria-haspopup="true"
              aria-expanded="false"
              role="menuitem"
            >
              Our Story
              <svg className={styles.dropdownIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={styles.dropdownMenu} role="menu">
              <a href="#" onClick={(e) => handleNavigation('about', e)} className={styles.dropdownItem} role="menuitem">
                About Us
              </a>
              <a href="#" onClick={(e) => handleNavigation('history', e)} className={styles.dropdownItem} role="menuitem">
                History
              </a>
              <a href="#" onClick={(e) => handleNavigation('mission', e)} className={styles.dropdownItem} role="menuitem">
                Mission & Vision
              </a>
              <a href="#" onClick={(e) => handleNavigation('leadership', e)} className={styles.dropdownItem} role="menuitem">
                Leadership Team
              </a>
            </div>
          </li>
          
          <li className={styles.navItem} role="none">
            <a 
              href="#" 
              onClick={(e) => handleNavigation('board', e)}
              className={styles.navLink}
              role="menuitem"
            >
              Board of Directors
            </a>
          </li>
          
          <li className={`${styles.navItem} ${styles.hasDropdown}`} role="none">
            <button 
              className={`${styles.navLink} ${styles.dropdownTrigger}`}
              onClick={handleDropdownClick}
              aria-haspopup="true"
              aria-expanded="false"
              role="menuitem"
            >
              Our Spirits
              <svg className={styles.dropdownIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={styles.dropdownMenu} role="menu">
              <a href="#" onClick={(e) => handleNavigation('premium', e)} className={styles.dropdownItem} role="menuitem">
                Premium Collection
              </a>
              <a href="#" onClick={(e) => handleNavigation('limited', e)} className={styles.dropdownItem} role="menuitem">
                Limited Edition
              </a>
              <a href="#" onClick={(e) => handleNavigation('craft', e)} className={styles.dropdownItem} role="menuitem">
                Craft Series
              </a>
              <a href="#" onClick={(e) => handleNavigation('awards', e)} className={styles.dropdownItem} role="menuitem">
                Awards & Recognition
              </a>
            </div>
          </li>
          
          <li className={styles.navItem} role="none">
            <a 
              href="#" 
              onClick={(e) => handleNavigation('career', e)}
              className={`${styles.navLink} ${styles.ctaLink}`}
              role="menuitem"
            >
             Our brand 
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        role="menu"
        aria-label="Mobile navigation menu"
      >
        <div className={styles.mobileMenuContent}>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <a 
                href="#" 
                onClick={(e) => handleNavigation('home', e)}
                className={styles.mobileNavLink}
                role="menuitem"
              >
                Home
              </a>
            </li>
            
            <li className={styles.mobileNavItem}>
              <button 
                className={styles.mobileDropdownBtn}
                onClick={() => toggleMobileDropdown('story')}
                aria-expanded={activeDropdown === 'story'}
                aria-controls="mobile-story-dropdown"
              >
                <span>Our Story</span>
                <svg 
                  className={`${styles.mobileDropdownIcon} ${activeDropdown === 'story' ? styles.rotated : ''}`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div 
                id="mobile-story-dropdown"
                className={`${styles.mobileDropdown} ${activeDropdown === 'story' ? styles.expanded : ''}`}
                role="menu"
              >
                <a href="#" onClick={(e) => handleNavigation('about', e)} className={styles.mobileSubLink} role="menuitem">
                  About Us
                </a>
                <a href="#" onClick={(e) => handleNavigation('history', e)} className={styles.mobileSubLink} role="menuitem">
                  History
                </a>
                <a href="#" onClick={(e) => handleNavigation('mission', e)} className={styles.mobileSubLink} role="menuitem">
                  Mission & Vision
                </a>
                <a href="#" onClick={(e) => handleNavigation('leadership', e)} className={styles.mobileSubLink} role="menuitem">
                  Leadership Team
                </a>
              </div>
            </li>
            
            <li className={styles.mobileNavItem}>
              <a 
                href="#" 
                onClick={(e) => handleNavigation('board', e)}
                className={styles.mobileNavLink}
                role="menuitem"
              >
                Board of Directors
              </a>
            </li>
            
            <li className={styles.mobileNavItem}>
              <button 
                className={styles.mobileDropdownBtn}
                onClick={() => toggleMobileDropdown('spirits')}
                aria-expanded={activeDropdown === 'spirits'}
                aria-controls="mobile-spirits-dropdown"
              >
                <span>Our Spirits</span>
                <svg 
                  className={`${styles.mobileDropdownIcon} ${activeDropdown === 'spirits' ? styles.rotated : ''}`}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div 
                id="mobile-spirits-dropdown"
                className={`${styles.mobileDropdown} ${activeDropdown === 'spirits' ? styles.expanded : ''}`}
                role="menu"
              >
                <a href="#" onClick={(e) => handleNavigation('premium', e)} className={styles.mobileSubLink} role="menuitem">
                  Premium Collection
                </a>
                <a href="#" onClick={(e) => handleNavigation('limited', e)} className={styles.mobileSubLink} role="menuitem">
                  Limited Edition
                </a>
                <a href="#" onClick={(e) => handleNavigation('craft', e)} className={styles.mobileSubLink} role="menuitem">
                  Craft Series
                </a>
                <a href="#" onClick={(e) => handleNavigation('awards', e)} className={styles.mobileSubLink} role="menuitem">
                  Awards & Recognition
                </a>
              </div>
            </li>
            
            <li className={styles.mobileNavItem}>
              <a 
                href="#" 
                onClick={(e) => handleNavigation('career', e)}
                className={`${styles.mobileNavLink} ${styles.mobileCta}`}
                role="menuitem"
              >
                Career
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbartwo;
