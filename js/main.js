// Johnice Edwards Realty: small, dependency-free site scripts.
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var ROOT = document.body.getAttribute('data-root') || '';
  var ARTICLES = window.ARTICLES || [];
  var CATEGORIES = window.CATEGORIES || [];

  function categoryFor(slug) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].slug === slug) return CATEGORIES[i];
    return { slug: slug, name: slug, page: 'blog.html', tone: 'tone-sand' };
  }

  function formatDate(iso) {
    var parts = iso.split('-');
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function photo(src, alt, tone, eager) {
    var img = el('img', { src: ROOT + src, alt: alt || '' });
    if (!eager) img.setAttribute('loading', 'lazy');
    img.addEventListener('error', function () { img.remove(); });
    return el('div', { class: 'photo ' + (tone || 'tone-sand') }, [img]);
  }

  function articleCard(a) {
    var cat = categoryFor(a.category);
    var card = el('a', { class: 'card lift', href: ROOT + a.url, 'data-category': a.category }, [
      photo(a.image, a.imageAlt, cat.tone),
      el('div', { class: 'card-body' }, [
        el('span', { class: 'kicker', text: cat.name }),
        el('h3', { text: a.title }),
        el('p', { class: 'excerpt', text: a.excerpt }),
        el('span', { class: 'meta', text: formatDate(a.date) + ' · ' + a.readTime })
      ])
    ]);
    return card;
  }

  var sorted = ARTICLES.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  var featured = sorted.filter(function (a) { return a.featured; })[0] || sorted[0];

  // Featured article (home page)
  var featureSlot = document.getElementById('featured-article');
  if (featureSlot && featured) {
    var cat = categoryFor(featured.category);
    featureSlot.appendChild(el('a', { class: 'card feature-card lift', href: ROOT + featured.url }, [
      photo(featured.image, featured.imageAlt, cat.tone),
      el('div', { class: 'card-body' }, [
        el('span', { class: 'kicker', text: 'Featured · ' + cat.name }),
        el('h3', { text: featured.title }),
        el('p', { class: 'excerpt', text: featured.excerpt }),
        el('span', { class: 'meta', text: formatDate(featured.date) + ' · ' + featured.readTime }),
        el('span', { class: 'card-cta', text: 'Read the story →' })
      ])
    ]));
    var latest = document.getElementById('latest-link');
    if (latest) {
      latest.href = ROOT + featured.url;
      latest.querySelector('strong').textContent = featured.title;
    }
  }

  // Article lists: <div data-articles data-category="money" data-limit="3" data-exclude-featured>
  document.querySelectorAll('[data-articles]').forEach(function (list) {
    var only = list.getAttribute('data-category');
    var limit = Number(list.getAttribute('data-limit')) || Infinity;
    var exclude = list.hasAttribute('data-exclude-featured');
    var excludeCurrent = list.hasAttribute('data-exclude-current');
    var items = sorted.filter(function (a) {
      var isCurrent = new URL(ROOT + a.url, window.location.href).pathname === window.location.pathname;
      return (!only || a.category === only) && !(exclude && a === featured) && !(excludeCurrent && isCurrent);
    }).slice(0, limit);
    items.forEach(function (a) { list.appendChild(articleCard(a)); });
    var empty = document.getElementById(list.getAttribute('data-empty') || '');
    if (empty) empty.hidden = items.length > 0;
    if (!items.length && list.hasAttribute('data-hide-empty')) {
      var section = list.closest('section');
      if (section) section.hidden = true;
    }
  });

  // Category story counts on category tiles: <span data-count="money">
  document.querySelectorAll('[data-count]').forEach(function (node) {
    var n = ARTICLES.filter(function (a) { return a.category === node.getAttribute('data-count'); }).length;
    node.textContent = n === 0 ? 'First story coming soon' : n === 1 ? '1 story' : n + ' stories';
  });

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Send a form to Formspree without leaving the page.
  function submitToFormspree(form) {
    return fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('Request failed');
      return res;
    });
  }

  // Newsletter sign-up forms (collected in Formspree for now).
  document.querySelectorAll('.js-newsletter').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var button = form.querySelector('button[type="submit"]');
    var note = form.querySelector('.js-form-note');
    var show = function (kind, text) {
      note.hidden = false;
      note.className = 'form-note js-form-note ' + kind;
      note.textContent = text;
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = EMAIL_RE.test(input.value.trim());
      input.setAttribute('aria-invalid', String(!ok));
      if (!ok) { show('error', 'Please enter a valid email address.'); return; }
      button.disabled = true;
      submitToFormspree(form).then(function () {
        form.reset();
        show('success', "You're on the list! Thank you for subscribing.");
      }).catch(function () {
        show('error', 'Something went wrong. Please try again in a moment.');
      }).then(function () { button.disabled = false; });
    });
  });

  // Contact form
  var contact = document.getElementById('contact-form');
  if (contact) {
    var done = document.getElementById('contact-done');
    var fail = document.getElementById('contact-fail');
    var send = contact.querySelector('button[type="submit"]');
    var fields = {
      name: function (v) { return v.trim().length > 0; },
      email: function (v) { return EMAIL_RE.test(v.trim()); },
      message: function (v) { return v.trim().length > 0; }
    };
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(fields).forEach(function (key) {
        var field = contact.elements[key];
        var ok = fields[key](field.value);
        field.setAttribute('aria-invalid', String(!ok));
        document.getElementById(key + '-error').hidden = ok;
        if (!ok && !firstBad) firstBad = field;
      });
      if (firstBad) { firstBad.focus(); return; }
      fail.hidden = true;
      send.disabled = true;
      send.textContent = 'Sending…';
      submitToFormspree(contact).then(function () {
        document.getElementById('contact-first').textContent = contact.elements.name.value.trim().split(/\s+/)[0];
        contact.reset();
        contact.hidden = true;
        done.hidden = false;
        done.focus();
      }).catch(function () {
        fail.hidden = false;
      }).then(function () {
        send.disabled = false;
        send.textContent = 'Send message';
      });
    });
    document.getElementById('contact-reset').addEventListener('click', function () {
      done.hidden = true;
      contact.hidden = false;
      contact.elements.name.focus();
    });
  }

  // Search and category filters (Blog page)
  var blogList = document.getElementById('article-list');
  var search = document.getElementById('article-search');
  if (blogList && search) {
    var cards = Array.prototype.slice.call(blogList.querySelectorAll('[data-category]'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    var count = document.getElementById('article-count');
    var noMatch = document.getElementById('article-nomatch');
    var current = 'all';

    var apply = function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var match = (current === 'all' || card.dataset.category === current) &&
          (!q || card.textContent.toLowerCase().indexOf(q) !== -1);
        card.hidden = !match;
        if (match) shown++;
      });
      count.textContent = shown === 1 ? '1 story' : shown + ' stories';
      noMatch.hidden = shown !== 0;
    };

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        current = chip.dataset.filter;
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        apply();
      });
    });
    search.addEventListener('input', apply);
    document.getElementById('article-reset').addEventListener('click', function () {
      search.value = '';
      current = 'all';
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === 'all')); });
      apply();
      search.focus();
    });

    var params = new URLSearchParams(window.location.search);
    if (params.get('q')) search.value = params.get('q');
    apply();
  }
})();
