// app/gallery/page.jsx
"use client"
import dynamic from 'next/dynamic';

const GallerySection = dynamic(() => import('../../components/GallerySection'), { 
  ssr: false // Client-side only for GSAP animations
});

export default function GalleryPage() {
  const galleryImages = [
    { src: '/gallery/copper-stills.jpg', alt: 'Copper Whisky Stills' },
    { src: '/gallery/rum-barrels.jpg', alt: 'Aged Rum Barrels' },
    { src: '/gallery/gin-botanicals.jpg', alt: 'Fresh Gin Botanicals' },
    { src: '/gallery/vodka-distillation.jpg', alt: 'Vodka Distillation Process' },
    { src: '/gallery/oak-warehouse.jpg', alt: 'Oak Barrel Warehouse' },
    { src: '/gallery/quality-lab.jpg', alt: 'Quality Testing Laboratory' }
  ];

  return (
    <main>
      <GallerySection 
        title="Distillery Gallery"
        subtitle="From grain to glass — a visual journey through our craft"
        images={galleryImages}
      />
    </main>
  );
}
