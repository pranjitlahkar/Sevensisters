'use client';
import dynamic from 'next/dynamic';

const ScrollGallery = dynamic(() => import('../../components/ScrollGallery'), { ssr: false }); // run only on client

export default function Page() {
  const images = [
    { src: '/gallery/copper-stills.jpg', alt: 'Copper pot stills' },
    { src: '/gallery/fermentation-tanks.jpg', alt: 'Fermentation tanks' },
    { src: '/gallery/oak-warehouse.jpg', alt: 'Oak barrel warehouse' },
    { src: '/gallery/bottling-line.jpg', alt: 'Automated bottling line' }
  ];
  return <ScrollGallery images={images} />;
}
