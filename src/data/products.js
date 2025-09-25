// /data/products.js

export const companies = [
  {
    id: 'radico-khaitan',
    name: 'Radico Khaitan',
    logo: '/images/partners/radico.jpg',
    hero: '/images/partners/radico.jpg',
    blurb:
      'A decade of co-development spanning small-batch single malts to award-winning cask finishes.',
    history:
      'Our collaboration began in 2015 with a focus on Assam grain selection, copper-pot runs, and selective oak programs to deliver a signature profile.',
    products: [
      {
        slug: '8-pm',
        name: '8PM Black',
        image: '/images/products/8pm.png',
        description: 'Aged 12 years in oak barrels with a smooth finish.',
        tagline: 'Heritage in Every Drop',
        category: 'Whiskey',
        specs: {
          abv: '40%',
          age: '12 Years',
          volume: '750ml',
          origin: 'Scotland',
        },
        
       
      },
      {
        slug: 'magic-moments',
        name: 'Magic Moments',
        image: '/images/products/magicmomentsplain.png',
        description: 'Matured in Spanish sherry casks for a rich flavor.',
        category: 'Vodka',
         specs: {
          abv: '40%',
          age: '12 Years',
          volume: '750ml',
          origin: 'Scotland',
        }
      },
      {
        slug: 'magic-moments-lemon',
        name: 'Magic Moments Lemon',
        image: '/images/products/magicmomentslemon.png',
        description: 'A zesty twist on the classic, infused with natural lemon flavors.',
        category: 'Vodka',
        specs: {
          abv: '40%',
          age: '12 Years',
          volume: '750ml',
          origin: 'Scotland',
        }
      },
      {
        slug: 'magic-moments-green-apple',
        name: 'Magic Moments Green Apple',
        image: '/images/products/greenapple.png',
        description: 'A refreshing twist on the classic, infused with natural green apple flavors.',
        category: 'Vodka',
        specs: {
          abv: '40%',
          age: '12 Years',
          volume: '750ml',
          origin: 'Scotland',
        }
      }
    ],
  },

  {

    id: 'Oasis-Group',
    name: 'Oasis Group',
    logo: '/images/partners/oasisgroup.png',
    hero: '/images/partners/oasisgroup.png',
    blurb:
      'A collective of innovative brands pushing the boundaries of flavor and experience.',
    history:
      'Founded in 2020, Oasis Group has quickly become a leader in the beverage industry, known for its commitment to quality and creativity.',
    products: [
      {
        slug: 'all-seasons-whiskey',
        name: 'All Seasons Whiskey',
        image: '/images/products/all seasons.png',
        description: 'A smooth and versatile whiskey, perfect for any occasion.',
        category: 'Whiskey',
        specs: {
          abv: '42%',
          volume: '750ml , 375ml , 180ml',
          origin: 'USA',
        }
      }
    ],
  },
  {
    id: 'Mohan-Meakin',
    name: 'Mohan Meakin',
    logo: '/images/partners/mohanmeakin.png',
    hero: '/images/partners/mohanmeakin.png',
    blurb:
      'Experimental releases featuring native botanicals and progressive barrel regimens.',
    history:
      'Started 2019; joint pilot line evolved into seasonal drops with limited runs and transparent sourcing.',
    products: [
      {
        slug: 'old-monk',
        name: 'Old Monk XXX',
        image: '/images/products/oldmonkxxx.png',
        description: 'Infused with botanicals, crisp and aromatic.',
        tagline: 'Crisp Botanical Infusion',
        category: 'Rum',
        specs: {
          abv: '42%',
          age: 'N/A',
          volume: '750ml',
          origin: 'India',
        },
       
      },
      {
        slug: 'old-monk-legend',
        name: 'Old Monk Legend',
        image: '/images/products/oldmonklegend.png',
        description: 'Smooth golden rum with tropical notes.',
         specs: {
          abv: '42%',
          age: 'N/A',
          volume: '750ml',
          origin: 'India',
        }
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
