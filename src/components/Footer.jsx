'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../css/footer.module.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with your actual newsletter subscription logic
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
    console.log(`Opening ${platform} social media page`);
    // Add your social media navigation logic here
  };

  const handleNavigation = (page) => {
    console.log(`Navigating to: ${page}`);
    // Add your navigation logic here
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Decorative Top Border */}
      <div className={styles.decorativeBorder}>
        <div className={styles.borderPattern}></div>
      </div>

      {/* Main Footer Content */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            
            {/* Company Info Section */}
            <div className={styles.footerSection}>
              <div className={styles.brandSection}>
                <div className={styles.logoContainer}>
                  <div className={styles.logoWrapper}>
                    <Image 
                      src="/logo.png" 
                      alt="Seven Sisters Logo" 
                      width={80}
                      height={80}
                      className={styles.footerLogo}
                    />
                  </div>
                  <div className={styles.brandInfo}>
                    <h3 className={styles.brandName}>Seven Sisters</h3>
                    <p className={styles.brandTagline}>Trade & Distilleries Pvt. Ltd</p>
                    <div className={styles.brandAccent}></div>
                  </div>
                </div>
                
                <div className={styles.brandDescription}>
                  <p>
                    Crafting exceptional spirits with tradition, passion, and uncompromising quality. 
                    Experience the finest collection of premium distilled beverages that define luxury 
                    and excellence in every drop.
                  </p>
                  
                  <div className={styles.accolades}>
                    <div className={styles.accoladeItem}>
                      <span className={styles.accoladeNumber}>25+</span>
                      <span className={styles.accoladeLabel}>Years of Excellence</span>
                    </div>
                    <div className={styles.accoladeItem}>
                      <span className={styles.accoladeNumber}>50+</span>
                      <span className={styles.accoladeLabel}>Premium Products</span>
                    </div>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className={styles.socialSection}>
                  <h4 className={styles.socialTitle}>Follow Our Journey</h4>
                  <div className={styles.socialLinks}>
                    <button 
                      onClick={() => handleSocialClick('facebook')}
                      className={styles.socialButton}
                      aria-label="Follow us on Facebook"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => handleSocialClick('instagram')}
                      className={styles.socialButton}
                      aria-label="Follow us on Instagram"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => handleSocialClick('twitter')}
                      className={styles.socialButton}
                      aria-label="Follow us on Twitter"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={() => handleSocialClick('linkedin')}
                      className={styles.socialButton}
                      aria-label="Follow us on LinkedIn"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.footerSection}>
              <div className={styles.sectionHeader}>
                <h4 className={styles.sectionTitle}>Company</h4>
                <div className={styles.titleUnderline}></div>
              </div>
              <ul className={styles.linksList}>
                <li><button onClick={() => handleNavigation('home')} className={styles.footerLink}>Home</button></li>
                <li><button onClick={() => handleNavigation('about')} className={styles.footerLink}>About Us</button></li>
                <li><button onClick={() => handleNavigation('history')} className={styles.footerLink}>Our Heritage</button></li>
                <li><button onClick={() => handleNavigation('mission')} className={styles.footerLink}>Mission & Vision</button></li>
                <li><button onClick={() => handleNavigation('leadership')} className={styles.footerLink}>Leadership Team</button></li>
                <li><button onClick={() => handleNavigation('board')} className={styles.footerLink}>Board of Directors</button></li>
                <li><button onClick={() => handleNavigation('careers')} className={styles.footerLink}>Careers</button></li>
              </ul>
            </div>

            {/* Our Spirits */}
            <div className={styles.footerSection}>
              <div className={styles.sectionHeader}>
                <h4 className={styles.sectionTitle}>Our Portfolio</h4>
                <div className={styles.titleUnderline}></div>
              </div>
              <ul className={styles.linksList}>
                <li><button onClick={() => handleNavigation('premium')} className={styles.footerLink}>Premium Collection</button></li>
                <li><button onClick={() => handleNavigation('limited')} className={styles.footerLink}>Limited Edition</button></li>
                <li><button onClick={() => handleNavigation('craft')} className={styles.footerLink}>Craft Series</button></li>
                <li><button onClick={() => handleNavigation('awards')} className={styles.footerLink}>Awards & Recognition</button></li>
                <li><button onClick={() => handleNavigation('tastings')} className={styles.footerLink}>Tastings & Events</button></li>
                <li><button onClick={() => handleNavigation('distillery')} className={styles.footerLink}>Distillery Tours</button></li>
                <li><button onClick={() => handleNavigation('news')} className={styles.footerLink}>News & Updates</button></li>
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div className={styles.footerSection}>
              <div className={styles.contactSection}>
                <div className={styles.sectionHeader}>
                  <h4 className={styles.sectionTitle}>Get in Touch</h4>
                  <div className={styles.titleUnderline}></div>
                </div>
                
                {/* Contact Info */}
                <div className={styles.contactInfo}>
                  <div className={styles.contactCard}>
                    <div className={styles.contactItem}>
                      <div className={styles.contactIconWrapper}>
                        <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div className={styles.contactDetails}>
                        <span className={styles.contactLabel}>Visit Us</span>
                        <span className={styles.contactValue}>Guwahati, Assam, India</span>
                      </div>
                    </div>
                    
                    <div className={styles.contactItem}>
                      <div className={styles.contactIconWrapper}>
                        <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div className={styles.contactDetails}>
                        <span className={styles.contactLabel}>Call Us</span>
                        <a href="tel:+919876543210" className={styles.contactValue}>+91 98765 43210</a>
                      </div>
                    </div>
                    
                    <div className={styles.contactItem}>
                      <div className={styles.contactIconWrapper}>
                        <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div className={styles.contactDetails}>
                        <span className={styles.contactLabel}>Email Us</span>
                        <a href="mailto:info@sevensistersco.com" className={styles.contactValue}>info@sevensistersco.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Newsletter Subscription */}
                <div className={styles.newsletterSection}>
                  <div className={styles.newsletterHeader}>
                    <h5 className={styles.newsletterTitle}>Exclusive Updates</h5>
                    <p className={styles.newsletterDescription}>
                      Subscribe for exclusive releases, tastings, and insider news from our distillery.
                    </p>
                  </div>
                  
                  <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                    <div className={styles.inputGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Your email address"
                          className={styles.emailInput}
                          required
                          disabled={isSubmitting}
                          aria-label="Email for newsletter subscription"
                        />
                        <div className={styles.inputFocusLine}></div>
                      </div>
                      <button 
                        type="submit" 
                        className={styles.subscribeButton}
                        disabled={isSubmitting || !newsletterEmail}
                        aria-label="Subscribe to newsletter"
                      >
                        {isSubmitting ? (
                          <div className={styles.loadingSpinner}></div>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.buttonIcon}>
                              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                    
                    {subscriptionStatus && (
                      <div className={`${styles.statusMessage} ${styles[subscriptionStatus]}`}>
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
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <p>&copy; {currentYear} Seven Sisters Trade & Distilleries Pvt. Ltd. All rights reserved.</p>
              <p className={styles.tagline}>Crafted with passion in India</p>
            </div>
            
            <div className={styles.legalLinks}>
              <button onClick={() => handleNavigation('privacy')} className={styles.legalLink}>
                Privacy Policy
              </button>
              <button onClick={() => handleNavigation('terms')} className={styles.legalLink}>
                Terms of Service
              </button>
              <button onClick={() => handleNavigation('sitemap')} className={styles.legalLink}>
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
