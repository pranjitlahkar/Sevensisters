'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/css/navbartwo.module.css';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

const Navbartwo = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              src="/images/logo/logo.png"
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
          <li className={styles.navItem}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>

          <li className={`${styles.navItem} ${styles.hasDropdown}`}>
            <button className={`${styles.navLink} ${styles.dropdownTrigger}`}>
              Our Story
              <svg className={styles.dropdownIcon} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className={styles.dropdownMenu}>
              <Link href="/about" className={styles.dropdownItem}>
                About Us
              </Link>

              <Link href="/mission" className={styles.dropdownItem}>
                Mission & Vision
              </Link>
              <Link href="/values" className={styles.dropdownItem}>
                Our Values
              </Link>
              <Link href="/leadership" className={styles.dropdownItem}>
                Leadership Team
              </Link>
            </div>
          </li>



          <li className={styles.navItem}>
            <Link href="/collaborations" className={styles.navLink}>
              Collaborations
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/directors" className={styles.navLink}>
              Board of Directors
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/managerial" className={styles.navLink}>
              Managerial Team
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/Gallery" className={styles.navLink}>
              Gallery
            </Link>
          </li>

          <li className={`${styles.navItem} ${styles.hasDropdown}`}>
            <button className={`${styles.navLink} ${styles.dropdownTrigger}`}>
              Our Spirits
              <svg className={styles.dropdownIcon} viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className={styles.dropdownMenu}>
              <Link href="/premium" className={styles.dropdownItem}>
                Premium Collection
              </Link>
              <Link href="/limited" className={styles.dropdownItem}>
                Limited Edition
              </Link>
              <Link href="/craft" className={styles.dropdownItem}>
                Craft Series
              </Link>
              <Link href="/awards" className={styles.dropdownItem}>
                Awards & Recognition
              </Link>
            </div>
          </li>

          <li className={styles.navItem}>
            <Link href="/brand" className={`${styles.navLink} ${styles.ctaLink}`}>
              Our Brand
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.mobileMenuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavList}>
          <li>
            <Link href="/" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>
          </li>

          <li>
            <Link href="/mission" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Mission & Vision
            </Link>
          </li>
          <li>
            <Link href="/values" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Our Values
            </Link>
          </li>
          <li>
            <Link href="/leadership" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Leadership Team
            </Link>
          </li>
          <li>
            <Link href="/directors" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Board of Directors
            </Link>
          </li>
          <li>
            <Link href="/managerial" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Managerial Team
            </Link>
          </li>
          <li>
            <Link href="/Gallery" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/premium" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Premium Collection
            </Link>
          </li>
          <li>
            <Link href="/limited" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Limited Edition
            </Link>
          </li>
          <li>
            <Link href="/craft" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Craft Series
            </Link>
          </li>
          <li>
            <Link href="/awards" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
              Awards & Recognition
            </Link>
          </li>
          <li>
            <Link
              href="/brand"
              className={`${styles.mobileNavLink} ${styles.mobileCta}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Brand
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbartwo;
