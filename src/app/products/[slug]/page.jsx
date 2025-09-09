'use client';
// app/products/[slug]/page.jsx

import dynamic from 'next/dynamic';
import { products } from '../../../data/products';

// Dynamically import the UI component
const ProductShowcase = dynamic(() => import('../../../components/ProductShowcase'), {
  ssr: false,
});

export default function ProductPage({ params }) {
  const { slug } = params;

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <h1 style={{ padding: '2rem' }}>❌ Product not found</h1>;
  }

  return <ProductShowcase product={product} />;
}
