// ============================================================
//  ARTICLES: the one list that powers the whole blog.
//
//  To publish a new article:
//    1. Add its page to the /articles folder (copy an existing one).
//    2. Add an entry to the TOP of the ARTICLES list below.
//  The home page, blog page, category pages and search all update
//  automatically. Set featured: true on the one article you want
//  in the big spot on the home page (only one at a time).
//
//  category must be one of: diaries, obsessed, tech, money
//  date format: 'YYYY-MM-DD'
//  image: a file in /images
// ============================================================

window.CATEGORIES = [
  {
    slug: 'diaries',
    name: 'The Homeowner Diaries',
    short: 'Homeowner Diaries',
    page: 'diaries.html',
    image: 'images/16-imp-kitchen.jpg',
    tone: 'tone-sage',
    blurb: 'My own experiences owning a home: renovations, repairs, lessons learned, mistakes, and progress on home projects.'
  },
  {
    slug: 'obsessed',
    name: "Homes I'm Obsessed With",
    short: "Homes I'm Obsessed With",
    page: 'obsessed.html',
    image: 'images/04-fall-bungalow.jpg',
    tone: 'tone-champagne',
    blurb: 'Interesting houses, beautiful architecture, historic homes, unusual layouts, and dream properties I visit or discover.'
  },
  {
    slug: 'tech',
    name: 'Homes & Technology',
    short: 'Homes & Technology',
    page: 'technology.html',
    image: 'images/19-office.jpg',
    tone: 'tone-stone',
    blurb: 'Smart-home tech, automation, AI, security systems, gadgets, and experiments that make a home more functional.'
  },
  {
    slug: 'money',
    name: 'Real Estate & Money',
    short: 'Real Estate & Money',
    page: 'money.html',
    image: 'images/06-keys.jpg',
    tone: 'tone-sand',
    blurb: 'Building equity, property taxes, rental properties, investing, mortgages, and the financial realities of owning a home.'
  }
];

window.ARTICLES = [
  {
    title: "I'm a Realtor, But I Don't Really Want to Sell Houses. I Just Love Real Estate.",
    url: 'articles/i-love-real-estate-not-selling-houses.html',
    category: 'diaries',
    date: '2026-10-09',
    readTime: '6 min read',
    image: 'images/05-kitchen-table.jpg',
    imageAlt: 'Open notebook and coffee mug on a butcher-block kitchen island',
    excerpt: 'How my love of architecture, an unexpected career path, and buying my first home changed the way I see real estate.',
    featured: true
  },
  {
    title: 'Understanding Home Equity: What It Is and How It Grows',
    url: 'articles/understanding-home-equity.html',
    category: 'money',
    date: '2026-10-09',
    readTime: '7 min read',
    image: 'images/03-front-porch.jpg',
    imageAlt: 'Brick front porch with a wood door and potted ferns',
    excerpt: 'How to estimate your equity, what builds it over time, and what to weigh before borrowing against it.'
  }
];
