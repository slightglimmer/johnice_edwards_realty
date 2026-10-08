# Johnice Edwards Realty

The website for **johniceedwardsrealty.com**. *Real Estate, Renovation & Smarter Homeownership.*

It's a plain HTML/CSS site with no build step, so any static host can serve it
(GitHub Pages, Netlify, Cloudflare Pages, or a regular web host).

## What's where

| Path | What it is |
|---|---|
| `index.html` | Home |
| `education.html` | Real Estate Education (article list, search, category filters) |
| `articles/` | One HTML file per full article |
| `improvements.html` | Home Improvements |
| `resources.html` | Homeowner Resources (all "Coming soon" for now) |
| `about.html` | About Johnice |
| `contact.html` | Contact form |
| `privacy.html` | Privacy policy, disclaimers, licensing disclosure, terms |
| `404.html` | "Page not found" page |
| `images/` | **Site photos.** See `images/README.md` for file names and sizes |
| `css/styles.css` | All styling. Colors are set once at the top |
| `js/main.js` | Mobile menu, forms, article search and filters |

## Adding photos

All site photos live in `images/`. To swap one, upload a replacement with the same file name
(see [`images/README.md`](images/README.md)).

## Adding an article

1. Copy `articles/understanding-home-equity.html` to a new file, e.g. `articles/closing-costs.html`.
2. Change the `<title>`, description, canonical link, headline and body text.
3. In `education.html`, find the article's card and change it from `<article class="card" ...>`
   to `<a class="card lift" href="articles/closing-costs.html" ...>`. Replace the
   "Full article coming soon" tag with `<span class="card-cta">Read the article →</span>`
   and change the closing `</article>` to `</a>`.
   For a brand-new topic, copy a whole card. Its `data-category` must match one of the
   filter buttons.
4. Add the new page to `sitemap.xml`.

## Header and footer

Every page has its own copy of the header and footer. If you change a menu item or
the footer text, make the same change on every page (search the project for the old text).

## Not connected yet

These parts are built honestly: they tell visitors they aren't live yet.

- **Newsletter sign-up** (Home): checks the email address but doesn't save it.
  Once you pick an email platform (Mailchimp, Kit, Flodesk, etc.), paste its
  embed form code or connect it in the newsletter section of `js/main.js`.
- **Contact form**: checks the fields but doesn't send. A form service such as Formspree
  or Netlify Forms can be connected in `contact.html` and `js/main.js`.
- **Resources**: the four tools are marked "Coming soon" with disabled buttons.
- **Planned tools** (renovation assistant, maintenance reminders, Q&A guide, budgeting)
  are listed only as roadmap items on the Resources page.

## Before launch

- Finish the privacy policy and terms on `privacy.html` (have them reviewed).
- Confirm the brokerage disclosure wording with your broker.

## Publishing with GitHub Pages (free)

1. In the repository on GitHub go to **Settings → Pages**.
2. Under "Build and deployment", choose **Deploy from a branch**, pick the branch and `/ (root)`.
3. To use johniceedwardsrealty.com, enter it under **Custom domain**, then update
   the domain's DNS records as GitHub's instructions describe. That moves the domain
   off your current website, so only do it when you're ready to switch.
