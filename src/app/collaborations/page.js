// app/collaborations/page.jsx
"use client"
import dynamic from 'next/dynamic';
const CollabShowcase = dynamic(() => import('../../components/CollabShowcase'), { ssr: false }); // run only on client [Next.js]

export default function Page() {
  const companies = [
    { id:'alpha', name:'Brand Alpha', logo:'/partners/alpha-logo.png', hero:'/partners/alpha-hero.jpg',
      blurb:'A decade of co‑development.', history:'Started 2015; selective oak program.',
      products:[{ slug:'alpha-reserve', name:'Alpha Reserve 12', image:'/director5.jpg' }]
    }
  ];
  return <CollabShowcase companies={companies} />;
}
