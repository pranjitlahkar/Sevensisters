import { products } from "../../../data/products";
import ProductShowcaseWrapper from "../../../components/ProductShowcaseWrapper";


export const metadata = {
  title: 'Products',
};
// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// ✅ Make page async and await params
export default async function ProductPage({ params }) {
  const { slug } = await params; // 🔑 await params here

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return null; // Will trigger not-found.jsx if you add one
  }

  return <ProductShowcaseWrapper product={product} />;
}
