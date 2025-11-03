"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "@/css/gallery.module.css";

const images = [
    { id: 1, src: "/images/gallery/distillery.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
 
    { id: 2, src: "/images/gallery/distillery2.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 3, src: "/images/gallery/distillery3.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 4, src: "/images/gallery/distillery4.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 5, src: "/images/gallery/distillery5.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 6, src: "/images/gallery/distillery6.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 7, src: "/images/gallery/distillery7.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 8, src: "/images/gallery/distillery8.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 9, src: "/images/gallery/distillery9.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 10, src: "/images/gallery/distillery10.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 11, src: "/images/gallery/distillery11.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 12, src: "/images/gallery/distillery12.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 13, src: "/images/gallery/distillery13.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 14, src: "/images/gallery/distillery14.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 15, src: "/images/gallery/distillery15.jpg", category: "Distillery", title: "Heritage Craftsmanship" },
    { id: 16, src: "/images/gallery/distillery16.jpg", category: "Distillery", title: "Heritage Craftsmanship" },

    { id: 17, src: "/images/gallery/team.jpg", category: "Team", title: "Rich Legacy" },
    { id: 18, src: "/images/gallery/team2.jpg", category: "Team", title: "Rich Legacy" },
    { id: 19, src: "/images/gallery/team3.jpg", category: "Team", title: "Rich Legacy" },
    { id: 21, src: "/images/gallery/team5.jpg", category: "Team", title: "Rich Legacy" },
    { id: 22, src: "/images/gallery/team6.jpg", category: "Team", title: "Rich Legacy" },

    { id: 23, src: "/images/gallery/product1.jpg", category: "Products", title: "Premium Spirits" },
    { id: 24, src: "/images/gallery/product2.jpg", category: "Products", title: "Premium Spirits" },
    { id: 25, src: "/images/gallery/product3.jpg", category: "Products", title: "Premium Spirits" },
    { id: 26, src: "/images/gallery/product4.jpg", category: "Products", title: "Premium Spirits" },
    { id: 27, src: "/images/gallery/product5.jpg", category: "Products", title: "Premium Spirits" },
    { id: 28, src: "/images/gallery/product6.jpg", category: "Products", title: "Premium Spirits" },

];

const categories = ["All", "Distillery", "Team",  "Products"];

export default function PremiumGallery() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryRef = useRef(null);
    const lightboxRef = useRef(null);
    const headerRef = useRef(null);

    const filteredImages =
        selectedCategory === "All"
            ? images
            : images.filter((img) => img.category === selectedCategory);

    // Header animation on mount
    useEffect(() => {
        if (headerRef.current) {
            gsap.timeline()
                .fromTo(
                    headerRef.current.children,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.3,
                        duration: 1,
                        ease: "power2.out"
                    }
                );
        }
    }, []);

    // Animate gallery when filter changes
    useEffect(() => {
        if (galleryRef.current) {
            gsap.fromTo(
                galleryRef.current.children,
                { opacity: 0, scale: 0.9, y: 30 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    stagger: 0.1,
                    ease: "power2.out",
                    duration: 0.8,
                }
            );
        }
    }, [selectedCategory]);

    // Animate lightbox on open
    useEffect(() => {
        if (lightboxOpen && lightboxRef.current) {
            gsap.fromTo(
                lightboxRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [lightboxOpen]);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const showNext = () => {
        setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const showPrev = () => {
        setCurrentIndex(
            (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
        );
    };

    return (
        <section className={styles.gallerySection}>
            {/* Luxury Background Elements */}
            <div className={styles.luxuryElements}>
                <div className={styles.floatingElement} style={{ '--delay': '0s' }}></div>
                <div className={styles.floatingElement} style={{ '--delay': '3s' }}></div>
                <div className={styles.floatingElement} style={{ '--delay': '6s' }}></div>
            </div>

            {/* Header Section */}
            <div className={styles.headerContainer} ref={headerRef}>
                <div className={styles.premiumBadge}>
                    <span className={styles.badgeText}>Visual Excellence</span>
                    <div className={styles.badgeGlow}></div>
                </div>
                <h1 className={styles.galleryTitle}>Premium Gallery</h1>
                <div className={styles.royalDivider}>
                    <div className={styles.dividerLine}></div>
                    <div className={styles.centerDiamond}>
                        <div className={styles.diamondInner}></div>
                    </div>
                    <div className={styles.dividerLine}></div>
                </div>
                <p className={styles.gallerySubtitle}>
                    Discover the artistry and heritage behind our finest creations through
                    a curated collection of moments that define our legacy
                </p>

                {/* Company Logo */}
                <div className={styles.logoContainer}>
                    <img
                        src="/images/logo/logoheritage.png"
                        alt="Seven Sisters Distillery"
                        className={styles.companyLogo}
                    />
                </div>
            </div>

            {/* Filter Navigation */}
            <div className={styles.filterContainer}>
                <div className={styles.filterButtons}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ""
                                }`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            <span className={styles.btnText}>{cat}</span>
                            <div className={styles.btnShimmer}></div>
                        </button>
                    ))}
                </div>
                <div className={styles.filterIndicator}>
                    <span className={styles.resultsCount}>
                        {filteredImages.length} {filteredImages.length === 1 ? 'Image' : 'Images'}
                    </span>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className={styles.galleryContainer}>
                <div className={styles.galleryGrid} ref={galleryRef}>
                    {filteredImages.map((img, index) => (
                        <div
                            key={img.id}
                            className={styles.galleryCard}
                            onClick={() => openLightbox(index)}
                        >
                            <div className={styles.imageContainer}>
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className={styles.galleryImg}
                                />
                                <div className={styles.imageOverlay}>
                                    <div className={styles.overlayContent}>
                                        <h3 className={styles.imageTitle}>{img.title}</h3>
                                        <p className={styles.imageCategory}>{img.category}</p>
                                        <div className={styles.viewIcon}>
                                            <span>👁</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.cardGlow}></div>
                            </div>
                            <div className={styles.cardShimmer}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div className={styles.lightbox} ref={lightboxRef}>
                    <div className={styles.lightboxOverlay} onClick={closeLightbox}></div>
                    <div className={styles.lightboxContent}>
                        <button className={styles.closeBtn} onClick={closeLightbox}>
                            <span>✕</span>
                        </button>

                        <button
                            className={`${styles.navBtn} ${styles.prevBtn}`}
                            onClick={showPrev}
                        >
                            <span>‹</span>
                        </button>

                        <div className={styles.imageWrapper}>
                            <img
                                src={filteredImages[currentIndex]?.src}
                                alt={filteredImages[currentIndex]?.title}
                                className={styles.lightboxImg}
                            />
                            <div className={styles.imageInfo}>
                                <h3 className={styles.lightboxTitle}>
                                    {filteredImages[currentIndex]?.title}
                                </h3>
                                <p className={styles.lightboxCategory}>
                                    {filteredImages[currentIndex]?.category}
                                </p>
                            </div>
                        </div>

                        <button
                            className={`${styles.navBtn} ${styles.nextBtn}`}
                            onClick={showNext}
                        >
                            <span>›</span>
                        </button>
                    </div>

                    <div className={styles.imageCounter}>
                        <span>{currentIndex + 1} / {filteredImages.length}</span>
                    </div>
                </div>
            )}
        </section>
    );
}
