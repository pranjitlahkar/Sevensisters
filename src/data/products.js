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
        description: '8PM Black is a premium Indian blended whisky known for its smooth, mellow character and luxurious packaging. It is made from a blend of malted barley and grains, with a dark amber color and tasting notes that include a fruity and sweet nose with a hint of peat, a medium body with a hint of fruitiness on the palate, and a rich, medium finish. The bottle features crystals, and the brand emphasizes themes of success, friendship, and luxury. ',
        tagline: 'Heritage in Every Drop',
        category: 'Whiskey',
        specs: {
          abv: '40%',

          volume: '750ml',
          origin: 'India',
        },


      },
      {
        slug: 'magic-moments',
        name: 'Magic Moments',
        image: '/images/products/magicmomentsplain.png',
        description: 'Magic Moments is a premium vodka produced by Radico Khaitan and launched in 2006, known for its smooth, pure taste derived from being crafted from high-quality grains and triple-distilled. It has a clean, crisp flavor profile with subtle notes of grain, vanilla, and citrus, making it suitable for both cocktails and sipping neat. The brand is a market leader in India and is positioned as a premium, celebratory vodka with an attractive, decorative bottle',
        category: 'Vodka',
        specs: {
          abv: '40%',
          volume: '750ml',
          origin: 'India',
        }
      },
      {
        slug: 'magic-moments-lemon',
        name: 'Magic Moments Lemon',
        image: '/images/products/magicmomentslemon.png',
        description: 'Magic Moments Lemon vodka is a premium flavored vodka from India, infused with natural lemon essence to provide a refreshing, zesty, and citrusy taste. It is typically crafted from high-quality grains, triple-distilled for purity, and is versatile enough to be enjoyed on its own, chilled, or mixed into various cocktails. Its flavor profile is described as bright and tangy with a clean, crisp finish',
        category: 'Vodka',
        specs: {
          abv: '40%',
          volume: '750ml',
          origin: 'India',
        }
      },
      {
        slug: 'magic-moments-green-apple',
        name: 'Magic Moments Green Apple',
        image: '/images/products/greenapple.png',
        description: 'Magic Moments Green Apple vodka is a flavored vodka infused with the crisp and tart taste of green apples, described as having a balance of sweet and sour notes. It is a smooth, easy-to-drink vodka that can be enjoyed on its own or used in cocktails, with tasting notes including aromas of green apple and a clean, refreshing finish. It is a triple-distilled spirit made with natural ingredients. ',
        category: 'Vodka',
        specs: {
          abv: '40%',
          volume: '750ml',
          origin: 'India',
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
        description: 'All Seasons is an Indian blended whisky brand, often described as smooth, mellow, and approachable. It is made from a blend of malt and grain whiskies, with tasting notes frequently mentioning vanilla, caramel, and soft spice, along with a lingering oak and vanilla finish. It is popular for both sipping neat and mixing in cocktails. ',
        category: 'Whiskey',
        specs: {
          abv: '42%',
          volume: '750ml , 375ml , 180ml',
          origin: 'India',
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
        description: 'Old Monk XXX is a classic dark Indian rum known for its robust, bold flavor with notes of vanilla, caramel, and oak. It is typically a dark brown color and has a smooth, versatile profile that can be enjoyed neat, on the rocks, or in cocktails. The "XXX" in its name signifies it is a higher quality, more aged, or classic dark rum.',
        tagline: 'Crisp Botanical Infusion',
        category: 'Rum',
        specs: {
          abv: '42%',
          volume: '750ml',
          origin: 'India',
        },

      },
      {
        slug: 'old-monk-legend',
        name: 'Old Monk Legend',
        image: '/images/products/oldmonklegend.png',
        description: 'Old Monk The Legend is a premium, special edition dark rum from Indias Mohan Meakin distillery, known for its iconic monk-head bottle. Compared to the standard Old Monk, it is a smoother, more complex spirit, with a minimum aging of 12 years in oak barrels.',
        specs: {
          abv: '42%',
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
