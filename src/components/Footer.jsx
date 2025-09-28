'use client';

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'; // Removed Next.js specific router

const Footer = () => {
  const router = useRouter(); // Removed Next.js specific router
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscriptionStatus('success');
      setNewsletterEmail('');
      
      // Reset status after 3 seconds
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform) => {
    // In a real app, you would navigate to the URL
    // Example: window.open('https://facebook.com/your-page', '_blank');
    console.log(`Opening ${platform} social media page`);
  };

  const handleNavigation = (page) => {
    router.push(`/${page}`);
    // Replaced Next.js router with simple console log for demonstration
    console.log(`Navigating to: /${page}`);
    // Or use: window.location.href = `/${page}`;
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        /*
        * === SEVEN SISTERS DISTILLERIES - FOOTER STYLES ===
        * Designed for a premium, rich, and responsive user experience.
        * Mobile-first approach with CSS Grid.
        */

        /* --- Main Footer Container --- */
        .footer {
          --rich-gold: #C3A66A;
          --warm-bronze: #A07837;
          --pearl-white: #FFFFFF;
          --soft-champagne: #F7EFE2;
          --satin-taupe: #B3A393;
          --deep-charcoal: #333333;
          --charcoal-light: #404040;
          --charcoal-dark: #1a1a1a;
          --shadow-subtle: rgba(195, 166, 106, 0.08);
          --shadow-light: rgba(195, 166, 106, 0.15);
          --shadow-medium: rgba(195, 166, 106, 0.25);
          --shadow-heavy: rgba(51, 51, 51, 0.3);
          --shadow-glow: rgba(195, 166, 106, 0.4);
          --font-body: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          --font-heading: 'Playfair Display', 'Georgia', serif;

          background: linear-gradient(175deg, var(--deep-charcoal), var(--charcoal-dark));
          color: var(--soft-champagne);
          font-family: var(--font-body);
          padding-top: 1rem;
          overflow: hidden;
          position: relative;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.4);
        }

        /* --- Decorative Elements --- */
        .decorativeBorder {
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--rich-gold), transparent);
          margin-bottom: 3rem;
          opacity: 0.8;
        }

        /* --- General Layout & Container --- */
        .container {
          width: 90%;
          max-width: 1280px;
          margin: 0 auto;
        }

        .footerMain {
          padding: 0 0 4rem 0;
        }

        .footerGrid {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-areas:
            "info"
            "links"
            "portfolio"
            "contact";
          gap: 3.5rem;
          text-align: center;
        }

        /* Assigning sections to their grid areas */
        .infoArea { grid-area: info; }
        .linksArea { grid-area: links; }
        .portfolioArea { grid-area: portfolio; }
        .contactArea { grid-area: contact; }


        /* --- Section Headers --- */
        .sectionHeader {
          margin-bottom: 1.5rem;
        }

        .sectionTitle {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--pearl-white);
          margin-bottom: 0.5rem;
          letter-spacing: 0.5px;
        }

        .titleUnderline {
          width: 50px;
          height: 2px;
          background: var(--rich-gold);
          margin: 0 auto;
          border-radius: 2px;
        }


        /* --- 1. Brand & Info Section --- */
        .brandSection {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .logoContainer {
          display: flex;
          flex-wrap: wrap; 
          justify-content: center;
          align-items: center;
          gap: 1rem;
        }

        .footerLogo {
          filter: drop-shadow(0 4px 8px var(--shadow-heavy));
          transition: transform 0.4s ease;
        }

        .logoContainer:hover .footerLogo {
            transform: rotate(5deg) scale(1.05);
        }

        .brandName {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--pearl-white);
          margin: 0;
        }

        .brandTagline {
          font-size: 0.9rem;
          color: var(--satin-taupe);
          margin-top: 0.25rem;
        }

        .brandDescription p {
          line-height: 1.7;
          color: var(--satin-taupe);
          max-width: 400px;
          margin: 0 auto;
        }

        .accolades {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .accoladeItem {
          display: flex;
          flex-direction: column;
        }

        .accoladeNumber {
          font-size: 2rem;
          font-weight: 700;
          color: var(--rich-gold);
        }

        .accoladeLabel {
          font-size: 0.8rem;
          color: var(--satin-taupe);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* --- Social Media Section --- */
        .socialSection {
          margin-top: 1.5rem;
        }

        .socialTitle {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--pearl-white);
        }

        .socialLinks {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .socialButton {
          background: var(--charcoal-light);
          border: 1px solid var(--charcoal-light);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.2);
        }

        .socialIcon {
          width: 20px;
          height: 20px;
          color: var(--satin-taupe);
          transition: all 0.3s ease;
        }

        .socialButton:hover {
          background: var(--rich-gold);
          border-color: var(--warm-bronze);
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 8px 15px var(--shadow-heavy), inset 0 1px 2px rgba(255,255,255,0.2);
        }

        .socialButton:hover .socialIcon {
          color: var(--pearl-white);
        }


        /* --- 2. & 3. Quick Links Sections --- */
        .linksList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .footerLink {
          background: none;
          border: none;
          font-family: var(--font-body);
          color: var(--satin-taupe);
          font-size: 1rem;
          cursor: pointer;
          padding: 0.25rem 0;
          position: relative;
          transition: color 0.3s ease;
        }

        .footerLink::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 1px;
          background: var(--rich-gold);
          transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .footerLink:hover {
          color: var(--rich-gold);
        }

        .footerLink:hover::after {
          width: 100%;
        }


        /* --- 4. Contact & Newsletter Section --- */
        .contactCard {
          background: var(--charcoal-light);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.4);
        }

        .contactInfo {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contactItem {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
        }

        .contactIconWrapper {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--deep-charcoal);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contactIcon {
          color: var(--rich-gold);
          width: 20px;
          height: 20px;
        }

        .contactDetails {
          display: flex;
          flex-direction: column;
        }

        .contactLabel {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--satin-taupe);
          letter-spacing: 0.5px;
        }

        .contactValue {
          font-size: 0.95rem;
          color: var(--soft-champagne);
          text-decoration: none;
          transition: color 0.3s ease;
          word-break: break-word; 
        }

        .contactValue:hover {
          color: var(--rich-gold);
        }

        /* --- Newsletter --- */
        .newsletterSection {
          margin-top: 2rem;
        }

        .newsletterTitle {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: var(--pearl-white);
          margin: 0;
        }

        .newsletterDescription {
          font-size: 0.9rem;
          color: var(--satin-taupe);
          line-height: 1.6;
          margin: 0.5rem 0 1.5rem 0;
        }

        .inputGroup {
          display: flex;
          box-shadow: 0 5px 15px var(--shadow-heavy);
          border-radius: 8px;
          overflow: hidden;
        }

        .inputWrapper {
          flex-grow: 1;
          min-width: 0; 
          position: relative;
        }

        .emailInput {
          width: 100%;
          border: 1px solid var(--charcoal-light);
          background: var(--deep-charcoal);
          padding: 0.8rem 1rem;
          font-size: 1rem;
          color: var(--pearl-white);
          border-radius: 8px 0 0 8px;
          transition: border-color 0.3s ease;
          outline: none;
        }

        .emailInput:focus {
          border-color: var(--rich-gold);
          box-shadow: 0 0 0 3px var(--shadow-glow);
        }

        .subscribeButton {
          flex-shrink: 0;
          background: linear-gradient(135deg, var(--rich-gold), var(--warm-bronze));
          color: var(--pearl-white);
          border: none;
          padding: 0.8rem 1.2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          border-radius: 0 8px 8px 0;
        }

        .subscribeButton:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 20px var(--shadow-glow);
        }

        .subscribeButton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .buttonIcon {
          width: 18px;
          height: 18px;
        }

        .loadingSpinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: var(--pearl-white);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .statusMessage {
          padding: 0.75rem;
          margin-top: 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          animation: fadeIn 0.5s ease;
        }

        .statusMessage.success {
          background-color: rgba(160, 120, 55, 0.2);
          color: var(--rich-gold);
        }

        .statusMessage.error {
          background-color: rgba(220, 53, 69, 0.2);
          color: #dc3545;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }


        /* --- Footer Bottom --- */
        .footerBottom {
          border-top: 1px solid var(--charcoal-light);
          padding: 2rem 0;
          margin-top: 4rem;
        }

        .bottomContent {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          text-align: center;
        }

        .copyright p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--satin-taupe);
          line-height: 1.6;
        }

        .copyright .tagline {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .legalLinks {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .legalLink {
          background: none;
          border: none;
          color: var(--satin-taupe);
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .legalLink:hover {
          color: var(--rich-gold);
          text-decoration: underline;
        }


        /* --- Tablet Responsiveness --- */
        @media (min-width: 768px) {
          .footerGrid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas:
              "info links"
              "info portfolio"
              "contact contact";
            text-align: left;
            gap: 2rem 4rem;
          }

          .titleUnderline {
            margin: 0;
          }
          
          .accolades, .legalLinks {
            flex-direction: row;
            gap: 2rem;
          }

          .brandSection,
          .brandDescription p {
            align-items: flex-start;
            margin-left: 0;
            margin-right: 0;
          }
          
          .socialSection,
          .accolades,
          .socialLinks {
            justify-content: flex-start;
          }
          
          .footerLink::after {
            left: 0;
            transform: translateX(0);
          }

          .bottomContent {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        /* --- Desktop Responsiveness --- */
        @media (min-width: 1024px) {
          .footerGrid {
            grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
            grid-template-areas: "info links portfolio contact";
            gap: 4rem;
          }
        }
      `}</style>
      <footer className="footer" role="contentinfo">
        {/* Decorative Top Border */}
        <div className="decorativeBorder"></div>

        {/* Main Footer Content */}
        <div className="footerMain">
          <div className="container">
            <div className="footerGrid">
              
              {/* Company Info Section - Grid Area: info */}
              <div className="footerSection infoArea">
                <div className="brandSection">
                  <div className="logoContainer">
                    <div className="logoWrapper">
                      <img 
                        src="/images/logo/logo.png" 
                        alt="Seven Sisters Logo" 
                        width={80}
                        height={80}
                        className="footerLogo"
                      />
                    </div>
                    <div className="brandInfo">
                      <h3 className="brandName">Seven Sisters</h3>
                      <p className="brandTagline">Trade & Distilleries Pvt. Ltd</p>
                    </div>
                  </div>
                  
                  <div className="brandDescription">
                    <p>
                      Crafting exceptional spirits with tradition, passion, and uncompromising quality. 
                      Experience the finest collection of premium distilled beverages that define luxury 
                      and excellence in every drop.
                    </p>
                    
                    <div className="accolades">
                      <div className="accoladeItem">
                        <span className="accoladeNumber">25+</span>
                        <span className="accoladeLabel">Years of Excellence</span>
                      </div>
                      <div className="accoladeItem">
                        <span className="accoladeNumber">50+</span>
                        <span className="accoladeLabel">Premium Products</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Media Links */}
                  <div className="socialSection">
                    <h4 className="socialTitle">Follow Our Journey</h4>
                    <div className="socialLinks">
                      <button 
                        onClick={() => handleSocialClick('facebook')}
                        className="socialButton"
                        aria-label="Follow us on Facebook"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="socialIcon">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => handleSocialClick('instagram')}
                        className="socialButton"
                        aria-label="Follow us on Instagram"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="socialIcon">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </button>
                      
                      <button 
                        onClick={() => handleSocialClick('twitter')}
                        className="socialButton"
                        aria-label="Follow us on Twitter"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="socialIcon">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links - Grid Area: links */}
              <div className="footerSection linksArea">
                <div className="sectionHeader">
                  <h4 className="sectionTitle">Company</h4>
                  <div className="titleUnderline"></div>
                </div>
                <ul className="linksList">
                  <li><button onClick={() => handleNavigation('')} className="footerLink">Home</button></li>
                  <li><button onClick={() => handleNavigation('about')} className="footerLink">About Us</button></li>
                  <li><button onClick={() => handleNavigation('values')} className="footerLink">Our Values</button></li>
                  <li><button onClick={() => handleNavigation('mission')} className="footerLink">Mission & Vision</button></li>
                  <li><button onClick={() => handleNavigation('leadership')} className="footerLink">Leadership Team</button></li>
                  <li><button onClick={() => handleNavigation('directors')} className="footerLink">Board of Directors</button></li>
                  <li><button onClick={() => handleNavigation('brand')} className="footerLink">Our Brand</button></li>
                </ul>
              </div>

              {/* Our Spirits - Grid Area: portfolio */}
              <div className="footerSection portfolioArea">
                <div className="sectionHeader">
                  <h4 className="sectionTitle">Our Portfolio</h4>
                  <div className="titleUnderline"></div>
                </div>
                <ul className="linksList">
                  <li><button onClick={() => handleNavigation('premium')} className="footerLink">Premium Collection</button></li>
                  <li><button onClick={() => handleNavigation('limited')} className="footerLink">Limited Edition</button></li>
                  <li><button onClick={() => handleNavigation('news')} className="footerLink">News & Updates</button></li>
                </ul>
              </div>

              {/* Contact & Newsletter - Grid Area: contact */}
              <div className="footerSection contactArea">
                <div className="sectionHeader">
                  <h4 className="sectionTitle">Get in Touch</h4>
                  <div className="titleUnderline"></div>
                </div>
                
                {/* Contact Info */}
                <div className="contactInfo">
                  <div className="contactCard">
                    <div className="contactItem">
                      <div className="contactIconWrapper">
                        <svg className="contactIcon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div className="contactDetails">
                        <span className="contactLabel">Visit Us</span>
                        <span className="contactValue">EPIP,Amingaon,Guwahati,Assam,781031</span>
                      </div>
                    </div>
                    
                    <div className="contactItem">
                      <div className="contactIconWrapper">
                        <svg className="contactIcon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div className="contactDetails">
                        <span className="contactLabel">Call Us</span>
                        <a href="tel:+919007099119" className="contactValue">+91 90070 99119</a>
                      </div>
                    </div>
                    
                    <div className="contactItem">
                      <div className="contactIconWrapper">
                        <svg className="contactIcon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div className="contactDetails">
                        <span className="contactLabel">Email Us</span>
                        <a href="mailto:info@sevensistersdistilleries.com" className="contactValue">info@sevensistersdistilleries.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="newsletterSection">
                  <div className="newsletterHeader">
                    <h5 className="newsletterTitle">Exclusive Updates</h5>
                    <p className="newsletterDescription">
                      Subscribe for exclusive releases, tastings, and insider news from our distillery.
                    </p>
                  </div>
                  
                  <form onSubmit={handleNewsletterSubmit} className="newsletterForm">
                    <div className="inputGroup">
                      <div className="inputWrapper">
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Your email address"
                          className="emailInput"
                          required
                          disabled={isSubmitting}
                          aria-label="Email for newsletter subscription"
                        />
                        <div className="inputFocusLine"></div>
                      </div>
                      <button 
                        type="submit" 
                        className="subscribeButton"
                        disabled={isSubmitting || !newsletterEmail}
                        aria-label="Subscribe to newsletter"
                      >
                        {isSubmitting ? (
                          <div className="loadingSpinner"></div>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="buttonIcon">
                              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {subscriptionStatus && (
                      <div className={"statusMessage " + subscriptionStatus}>
                        {subscriptionStatus === 'success' 
                          ? '🎉 Welcome to our exclusive community!' 
                          : '❌ Something went wrong. Please try again.'
                        }
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footerBottom">
          <div className="container">
            <div className="bottomContent">
              <div className="copyright">
                <p>&copy; {currentYear} Seven Sisters Trade & Distilleries Pvt. Ltd. All rights reserved.</p>
                <p className="tagline">Crafted with passion in India</p>
              </div>
              
              <div className="legalLinks">
                <button onClick={() => handleNavigation('privacy')} className="legalLink">
                  Privacy Policy
                </button>
                <button onClick={() => handleNavigation('terms')} className="legalLink">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

