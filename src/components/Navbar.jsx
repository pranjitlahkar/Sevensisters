'use client';

import React, { useState, useEffect, useRef } from 'react';

// You can easily manage your navigation links from this array
const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Our Story',
    dropdown: [
      { href: '/about', label: 'About Us' },
      { href: '/mission', label: 'Mission & Vision' },
      { href: '/values', label: 'Our Values' },
      { href: '/leadership', label: 'Leadership Team' },
    ],
  },
  { href: '/collaborations', label: 'Collaborations' },
  { href: '/directors', label: 'Board of Directors' },
  {
    label: 'Our Spirits',
    dropdown: [
      { href: '/premium', label: 'Premium Collection' },
      { href: '/limited', label: 'Limited Edition' },
      { href: '/craft', label: 'Craft Series' },
      { href: '/awards', label: 'Awards & Recognition' },
    ],
  },
  { href: '/Gallery', label: 'Gallery' },
];

// This component injects the necessary styles into the document head.
const NavbarStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

    .navbar-component {
      --nav-height: 80px;
      --nav-height-mobile: 70px;
      --rich-gold: #C3A66A;
      --warm-bronze: #A07837;
      --pearl-white: #FFFFFF;
      --soft-champagne: #F7EFE2;
      --deep-charcoal: #333333;
      --shadow-light: rgba(195, 166, 106, 0.1);
      --shadow-medium: rgba(195, 166, 106, 0.15);
      --transition-medium: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      --menu-translate-x: -100%;
      --hamburger-line1-transform: none;
      --hamburger-line2-opacity: 1;
      --hamburger-line3-transform: none;
    }

    .navbar-component.menuIsOpen {
      --menu-translate-x: 0;
      --hamburger-line1-transform: rotate(45deg) translate(5px, 5px);
      --hamburger-line2-opacity: 0;
      --hamburger-line3-transform: rotate(-45deg) translate(5px, -5px);
    }

    .navbar-component {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      font-family: 'Lato', system-ui, sans-serif;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--shadow-light);
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }

    .navbar-component.scrolled {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 4px 20px var(--shadow-medium);
    }

    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      height: var(--nav-height);
    }

    .navbar-brandLink {
      position: relative;
      z-index: 1001;
      transition: transform 0.2s ease;
    }
    .navbar-brandLink:hover {
      transform: scale(1.05);
    }
    .navbar-logo {
      height: 60px;
      width: auto;
      object-fit: contain;
    }

    .navbar-desktopNav {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .navbar-navList {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0.5rem;
    }
    .navbar-navLink {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.75rem 1rem;
      color: var(--deep-charcoal);
      text-decoration: none;
      font-weight: 700;
      font-size: 0.95rem;
      border-radius: 8px;
      transition: color var(--transition-medium), transform var(--transition-medium);
      position: relative;
      background: none;
      border: none;
      cursor: pointer;
    }
    .navbar-navLink:hover {
      color: var(--rich-gold);
      transform: translateY(-1px);
    }
    .navbar-ctaLink {
      background: linear-gradient(135deg, var(--rich-gold), var(--warm-bronze));
      color: var(--pearl-white) !important;
      margin-left: 0.5rem;
      box-shadow: 0 2px 8px rgba(195, 166, 106, 0.3);
    }
    .navbar-ctaLink:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(195, 166, 106, 0.4);
    }
    .navbar-hasDropdown {
      position: relative;
    }
    .navbar-dropdownIcon {
      width: 16px;
      height: 16px;
      transition: transform var(--transition-medium);
    }
    .navbar-hasDropdown:hover .navbar-dropdownIcon {
      transform: rotate(180deg);
    }
    .navbar-dropdownMenu {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      min-width: 220px;
      background: var(--pearl-white);
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border: 1px solid var(--shadow-light);
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: all var(--transition-medium);
      z-index: 1002;
    }
    .navbar-hasDropdown:hover .navbar-dropdownMenu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    .navbar-dropdownItem {
      display: block;
      padding: 0.75rem 1.5rem;
      color: var(--deep-charcoal);
      text-decoration: none;
      font-size: 0.9rem;
      transition: background-color 0.2s ease, color 0.2s ease, padding-left 0.2s ease;
    }
    .navbar-dropdownItem:hover {
      background-color: var(--soft-champagne);
      color: var(--warm-bronze);
      padding-left: 1.75rem;
    }
    .navbar-mobileToggle {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 1001;
      padding: 0;
    }
    .navbar-hamburgerLine {
      width: 24px;
      height: 2px;
      background: var(--rich-gold);
      border-radius: 1px;
      margin: 3px 0;
      transform-origin: center;
      transition: transform var(--transition-medium), opacity var(--transition-medium);
    }
    .navbar-hamburgerLine:nth-child(1) {
      transform: var(--hamburger-line1-transform);
    }
    .navbar-hamburgerLine:nth-child(2) {
      opacity: var(--hamburger-line2-opacity);
    }
    .navbar-hamburgerLine:nth-child(3) {
      transform: var(--hamburger-line3-transform);
    }
    .navbar-mobileMenu {
      position: fixed;
      top: var(--nav-height);
      left: 0;
      width: 100%;
      height: calc(100vh - var(--nav-height));
      background: linear-gradient(135deg, var(--pearl-white) 0%, var(--soft-champagne) 100%);
      z-index: 999;
      overflow-y: auto;
      padding: 2rem 0;
      transform: translateX(var(--menu-translate-x));
      transition: transform var(--transition-slow);
    }
    .navbar-mobileNavList {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .navbar-mobileNavItem {
      border-bottom: 1px solid var(--shadow-light);
    }
    .navbar-mobileNavLink {
      display: flex;
      align-items: center;
      padding: 1rem 2rem;
      color: var(--deep-charcoal);
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: background-color 0.2s ease, color 0.2s ease;
    }
    .navbar-mobileNavLink:active {
      background-color: var(--rich-gold);
      color: var(--pearl-white);
    }
    .navbar-mobileCta {
      background: linear-gradient(135deg, var(--rich-gold), var(--warm-bronze));
      color: var(--pearl-white) !important;
      font-weight: 700;
      margin: 1.5rem 2rem;
      border-radius: 8px;
      text-align: center;
      display: block;
    }
    .navbar-mobileAccordion-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 1rem 2rem;
      background: none;
      border: none;
      cursor: pointer;
      font-family: inherit;
      color: var(--deep-charcoal);
      font-weight: 600;
      font-size: 1.1rem;
      text-align: left;
    }
    .navbar-mobileAccordion-icon {
      width: 20px;
      height: 20px;
      transition: transform var(--transition-medium);
      flex-shrink: 0;
    }
    .navbar-mobileAccordion-icon.isOpen {
      transform: rotate(180deg);
    }
    .navbar-mobileAccordion-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease-in-out;
      background: var(--soft-champagne);
    }
    .navbar-mobileAccordion-content.isOpen {
      max-height: 500px; /* Adjust if a dropdown has many items */
    }
    .navbar-mobileAccordion-content ul {
      list-style: none;
      padding: 0.5rem 0;
      margin: 0;
    }
    .navbar-mobileSubLink {
      display: block;
      padding: 0.75rem 2rem 0.75rem 3rem; /* Indented */
      color: var(--deep-charcoal);
      text-decoration: none;
      font-size: 1rem;
    }
    .navbar-mobileSubLink:active {
      background-color: var(--rich-gold);
      color: var(--pearl-white);
    }
    @media (max-width: 1024px) {
      .navbar-desktopNav {
        display: none;
      }
      .navbar-mobileToggle {
        display: flex;
      }
    }
    @media (max-width: 768px) {
      .navbar-container {
        height: var(--nav-height-mobile);
        padding: 0 1rem;
      }
      .navbar-mobileMenu {
        top: var(--nav-height-mobile);
        height: calc(100vh - var(--nav-height-mobile));
      }
      .navbar-logo {
        height: 50px;
      }
    }
  `}</style>
);

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const navRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);
  
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenAccordion(null); // Reset accordion when menu closes
  };

  const handleAccordionClick = (label) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  // Combine all necessary class names
  const navClassName = [
    'navbar-component',
    isScrolled ? 'scrolled' : '',
    isMenuOpen ? 'menuIsOpen' : ''
  ].join(' ').trim();

  return (
    <>
      <NavbarStyles />
      <header ref={navRef} className={navClassName}>
        <div className="navbar-container">
          <a href="/" className="navbar-brandLink" aria-label="Seven Sisters Home" onClick={closeMenu}>
            {/* Make sure this path is correct for your project */}
            <img src="/images/logo/logo.png" alt="Seven Sisters Logo" className="navbar-logo" />
          </a>

          {/* --- Desktop Navigation --- */}
          <nav className="navbar-desktopNav" aria-label="Main navigation">
            <ul className="navbar-navList">
              {navLinks.map((link) => (
                <li key={link.label} className={link.dropdown ? "navbar-hasDropdown" : ''}>
                  {link.href ? (
                    <a href={link.href} className="navbar-navLink">{link.label}</a>
                  ) : (
                    <button className="navbar-navLink">
                      {link.label}
                      <svg className="navbar-dropdownIcon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  {link.dropdown && (
                    <div className="navbar-dropdownMenu">
                      {link.dropdown.map((item) => (
                        <a key={item.href} href={item.href} className="navbar-dropdownItem">{item.label}</a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <a href="http://queenbarrels.vercel.app" className="navbar-navLink navbar-ctaLink">Our Brand</a>
          </nav>

          {/* --- Mobile Navigation --- */}
          <button
            className="navbar-mobileToggle"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="navbar-hamburgerLine"></div>
            <div className="navbar-hamburgerLine"></div>
            <div className="navbar-hamburgerLine"></div>
          </button>

          <div id="mobile-menu" className="navbar-mobileMenu">
            <ul className="navbar-mobileNavList">
               {navLinks.map((link) => (
                 <li key={link.label} className="navbar-mobileNavItem">
                   {link.dropdown ? (
                     <>
                       <button
                         className="navbar-mobileAccordion-toggle"
                         onClick={() => handleAccordionClick(link.label)}
                         aria-expanded={openAccordion === link.label}
                       >
                         {link.label}
                         <svg className={`navbar-mobileAccordion-icon ${openAccordion === link.label ? 'isOpen' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                         </svg>
                       </button>
                       <div className={`navbar-mobileAccordion-content ${openAccordion === link.label ? 'isOpen' : ''}`}>
                         <ul>
                           {link.dropdown.map((item) => (
                             <li key={item.href}>
                               <a href={item.href} className="navbar-mobileSubLink" onClick={closeMenu}>
                                 {item.label}
                               </a>
                             </li>
                           ))}
                         </ul>
                       </div>
                     </>
                   ) : (
                     <a href={link.href} className="navbar-mobileNavLink" onClick={closeMenu}>
                       {link.label}
                     </a>
                   )}
                 </li>
               ))}
                <li>
                  <a href="http://queenbarrels.vercel.app" className="navbar-mobileNavLink navbar-mobileCta" onClick={closeMenu}>
                    Our Brand
                  </a>
                </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

