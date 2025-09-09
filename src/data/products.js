// /data/products.js

export const companies = [
  {
    id: 'brand-alpha',
    name: 'Brand Alpha',
    logo: '/partners/alpha-logo.png',
    hero: '/partners/alpha-hero.jpg',
    blurb:
      'A decade of co-development spanning small-batch single malts to award-winning cask finishes.',
    history:
      'Our collaboration began in 2015 with a focus on Assam grain selection, copper-pot runs, and selective oak programs to deliver a signature profile.',
    products: [
      {
        slug: 'alpha-reserve',
        name: 'Alpha Reserve 12',
        image: '/products/alpha-reserve.jpg',
        description: 'Aged 12 years in oak barrels with a smooth finish.',
        tagline: 'Heritage in Every Drop',
        category: 'Blended Scotch',
        specs: {
          abv: '40%',
          age: '12 Years',
          volume: '750ml',
          origin: 'Scotland',
        },
        awards: ['Silver Spirits Award 2022'],
        price: '$199',
      },
      {
        slug: 'alpha-sherry',
        name: 'Alpha Sherry Cask',
        image: '/products/alpha-sherry.jpg',
        description: 'Matured in Spanish sherry casks for a rich flavor.',
      },
      {
        slug: 'alpha-smoke',
        name: 'Alpha Smokestack',
        image: '/products/alpha-smoke.jpg',
        description: 'Bold smoky profile with a peaty backbone.',
      },
    ],
  },
  {
    id: 'brand-betxa',
    name: 'Betxa Collective',
    logo: '/partners/betxa-logo.png',
    hero: '/partners/betxa-hero.jpg',
    blurb:
      'Experimental releases featuring native botanicals and progressive barrel regimens.',
    history:
      'Started 2019; joint pilot line evolved into seasonal drops with limited runs and transparent sourcing.',
    products: [
      {
        slug: 'betxa-dry',
        name: 'Betxa Dry Gin',
        image: '/products/betxa-dry.jpg',
        description: 'Infused with botanicals, crisp and aromatic.',
        tagline: 'Crisp Botanical Infusion',
        category: 'Gin',
        specs: {
          abv: '42%',
          age: 'N/A',
          volume: '750ml',
          origin: 'India',
        },
        awards: ['Gold Gin Masters 2022'],
        price: '$149',
      },
      {
        slug: 'betxa-gold',
        name: 'Betxa Gold Rum',
        image: '/products/betxa-gold.jpg',
        description: 'Smooth golden rum with tropical notes.',
      },
    ],
  },
];

// ✅ Flat product list for dynamic route lookups
export const products = companies.flatMap((c) =>
  c.products.map((p) => ({
    ...p,
    company: c.name, // optional: keep reference to parent brand
  }))
);
