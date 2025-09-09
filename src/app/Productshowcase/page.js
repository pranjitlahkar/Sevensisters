'use client'
// app/products/[slug]/page.jsx
import dynamic from 'next/dynamic';

const ProductShowcase = dynamic(() => import('../../components/ProductShowcase'), { 
  ssr: false 
});

 const productData = {
    name: 'All Seasons Whiskey',
    tagline: 'Aged to Perfection',
    category: 'Single Malt Whisky',
    description: 'A symphony of caramel, oak, and spice...',
    image: '/all seasons.png',
    specs: {
      abv: '43%',
      age: '12 Years',
      volume: '750ml , 375ml , 180ml',
      origin: 'Single Malt'
    },
    awards: ['Gold Medal 2023', 'Best Whisky Award'],
    price: '$299'
  };
export default function ProductPage() {
 


  return <ProductShowcase product={productData} />;
}
