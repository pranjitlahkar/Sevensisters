"use client";

import dynamic from "next/dynamic";

// Dynamically import ProductShowcase as a Client Component
const ProductShowcase = dynamic(() => import("./ProductShowcase"), {
  ssr: false,
});

export default function ProductShowcaseWrapper({ product }) {
  return <ProductShowcase product={product} />;
}
