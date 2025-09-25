'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // ✅ use Next.js Link
import styles from '../css/navbar.module.css';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato'
});

const Navbartwo = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // click outside
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

  // escape key
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
          <Link href="/" className={styles.logoLink} aria-label="Seven Sisters Home">
            <Image
              src="/logo.png"
              alt="Seven Sisters Logo"
              width={70}
              height={70}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className={styles.desktopNav} role="menubar">
          <li className={styles.navItem} role="none">
            <Link href="/" className={styles.navLink} role="menuitem">
              Home
            </Link>
          </li>

          <li className={`${styles.navItem} ${styles.hasDropdown}`} role="none">
            <button
              className={`${styles.navLink} ${styles.dropdownTrigger}`}
              aria-haspopup="true"
              aria-expanded="false"
              role="menuitem"
            >
              Our Story
              <svg className={styles.dropdownIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className={styles.dropdownMenu} role="menu">
              <Link href="/about" className={styles.dropdownItem} role="menuitem">
                About Us
              </Link>
              <Link href="/history" className={styles.dropdownItem} role="menuitem">
                History
              </Link>
              <Link href="/mission" className={styles.dropdownItem} role="menuitem">
                Mission & Vision
              </Link>
              <Link href="/leadership" className={styles.dropdownItem} role="menuitem">
                Leadership Team
              </Link>
            </div>
          </li>

          <li className={styles.navItem} role="none">
            <Link href="/board" className={styles.navLink} role="menuitem">
              Board of Directors
            </Link>

          </li>

          <li className={`${styles.navItem} ${styles.hasDropdown}`} role="none">
            <button
              className={`${styles.navLink} ${styles.dropdownTrigger}`}
              aria-haspopup="true"
              aria-expanded="false"
              role="menuitem"
            >
              Our Spirits
              <svg className={styles.dropdownIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className={styles.dropdownMenu} role="menu">
              <Link href="/premium" className={styles.dropdownItem} role="menuitem">
                Premium Collection
              </Link>
              <Link href="/limited" className={styles.dropdownItem} role="menuitem">
                Limited Edition
              </Link>
              <Link href="/craft" className={styles.dropdownItem} role="menuitem">
                Craft Series
              </Link>

            </div>
          </li>

          <li className={styles.navItem} role="none">
            <Link href="/brand" className={`${styles.navLink} ${styles.ctaLink}`} role="menuitem">
              Our brand
            </Link>
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
      {isMobileMenuOpen && <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />}

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
              <Link href="/" className={styles.mobileNavLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
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
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                id="mobile-story-dropdown"
                className={`${styles.mobileDropdown} ${activeDropdown === 'story' ? styles.expanded : ''}`}
                role="menu"
              >
                <Link href="/about" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  About Us
                </Link>
                <Link href="/history" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  History
                </Link>
                <Link href="/mission" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  Mission & Vision
                </Link>
                <Link href="/leadership" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  Leadership Team
                </Link>
              </div>
            </li>

            <li className={styles.mobileNavItem}>
              <Link href="/board" className={styles.mobileNavLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                Board of Directors
              </Link>

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
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                id="mobile-spirits-dropdown"
                className={`${styles.mobileDropdown} ${activeDropdown === 'spirits' ? styles.expanded : ''}`}
                role="menu"
              >
                <Link href="/premium" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  Premium Collection
                </Link>
                <Link href="/limited" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  Limited Edition
                </Link>
                <Link href="/craft" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  Craft Series
                </Link>
                <Link href="/awards" className={styles.mobileSubLink} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                  Awards & Recognition
                </Link>
              </div>
            </li>

            <li className={styles.mobileNavItem}>
              <Link href="/career" className={`${styles.mobileNavLink} ${styles.mobileCta}`} role="menuitem" onClick={() => setIsMobileMenuOpen(false)}>
                Career
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbartwo;
