# Johnice Edwards Realty

The website for **johniceedwardsrealty.com**. *Real Estate, Renovation & Smarter Homeownership.*

It's a plain HTML/CSS site with no build step, so any static host can serve it
(GitHub Pages, Netlify, Cloudflare Pages, or a regular web host).

## What's where

| Path | What it is |
|---|---|
| `index.html` | Home: hero, featured story, categories, newsletter |
| `blog.html` | All stories, with search and category filters |
| `diaries.html`, `obsessed.html`, `technology.html`, `money.html` | The four category pages |
| `articles/` | One HTML file per story |
| `js/articles.js` | **The list of stories.** Add new posts here |
| `about.html` | About me |
| `contact.html` | Contact form (sends to Formspree) |
| `improvements.html` | Home improvement guide (linked in the footer) |
| `resources.html` | Homeowner tools, coming soon (linked in the footer) |
| `privacy.html` | Privacy policy, terms, disclaimers, licensing disclosure |
| `images/` | Site photos. See `images/README.md` |
| `css/styles.css` | All styling. Colors are set once at the top |
| `js/main.js` | Story cards, forms, search, mobile menu |

## Publishing a new story

1. Copy `articles/understanding-home-equity.html` to a new file, e.g. `articles/my-first-renovation.html`.
2. Change the title, description, canonical link, date, category link, photo, headline and body text.
3. Add the photo to `images/`.
4. Open `js/articles.js` and add an entry at the top of `ARTICLES` (copy the existing one).
   Use `category: 'diaries'`, `'obsessed'`, `'tech'` or `'money'`.
   Move `featured: true` to the story you want in the big spot on the home page.
5. Add the new page to `sitemap.xml`.

The home page, blog page, category pages, story counts and search all update automatically.

## Forms

Both the contact form and the newsletter sign-up send to Formspree
(`https://formspree.io/f/xwlvodrn`). Messages and sign-ups arrive by email and are listed in the
Formspree dashboard, where they can be exported. The free plan allows 50 submissions a month.
When the newsletter grows, move sign-ups to an email platform (Kit is free up to 10,000
subscribers) by changing the newsletter form's `action` in `index.html`.

## Future ideas

- AI-powered homeownership tools (listed as "planned" on `resources.html`).

## Publishing with GitHub Pages (free)

1. In the repository on GitHub go to **Settings → Pages**.
2. Under "Build and deployment", choose **Deploy from a branch**, pick the branch and `/ (root)`.
3. To use johniceedwardsrealty.com (registered at Namecheap), enter it under **Custom domain**,
   then in Namecheap → Domain List → Manage → Advanced DNS add:
   - four `A` records for host `@`: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - one `CNAME` record for host `www` pointing to `slightglimmer.github.io.`
   and remove the old records that point to your current website.
