// Johnice Edwards Realty — small, dependency-free site scripts.
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Newsletter sign-up forms.
  // Not connected to an email platform yet: when one is chosen, send the
  // address to it inside this handler (see README "Newsletter").
  document.querySelectorAll('.js-newsletter').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var note = form.querySelector('.js-form-note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = EMAIL_RE.test(input.value.trim());
      input.setAttribute('aria-invalid', String(!ok));
      note.hidden = false;
      note.className = 'form-note js-form-note ' + (ok ? 'success' : 'error');
      note.textContent = ok
        ? "Thank you! The newsletter launches soon. Sign-ups aren't being collected yet, so please check back."
        : 'Please enter a valid email address.';
    });
  });

  // Contact form.
  // Not connected yet: when a form service is chosen, submit to it here.
  var contact = document.getElementById('contact-form');
  if (contact) {
    var done = document.getElementById('contact-done');
    var fields = {
      name: function (v) { return v.trim().length > 0; },
      email: function (v) { return EMAIL_RE.test(v.trim()); },
      message: function (v) { return v.trim().length > 0; }
    };
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(fields).forEach(function (key) {
        var el = contact.elements[key];
        var ok = fields[key](el.value);
        el.setAttribute('aria-invalid', String(!ok));
        document.getElementById(key + '-error').hidden = ok;
        if (!ok && !firstBad) firstBad = el;
      });
      if (firstBad) { firstBad.focus(); return; }
      var first = contact.elements.name.value.trim().split(/\s+/)[0];
      document.getElementById('contact-first').textContent = first;
      contact.hidden = true;
      done.hidden = false;
      done.focus();
    });
    document.getElementById('contact-reset').addEventListener('click', function () {
      contact.reset();
      done.hidden = true;
      contact.hidden = false;
      contact.elements.name.focus();
    });
  }

  // Article search and category filters (Real Estate Education page).
  var list = document.getElementById('article-list');
  if (list) {
    var cards = Array.prototype.slice.call(list.querySelectorAll('[data-category]'));
    var search = document.getElementById('article-search');
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    var count = document.getElementById('article-count');
    var empty = document.getElementById('article-empty');
    var current = 'All';

    var apply = function () {
      var q = search.value.trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var match = (current === 'All' || card.dataset.category === current) &&
          (!q || card.textContent.toLowerCase().indexOf(q) !== -1);
        card.hidden = !match;
        if (match) shown++;
      });
      count.textContent = shown === 1 ? '1 article' : shown + ' articles';
      empty.hidden = shown !== 0;
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
      current = 'All';
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === 'All')); });
      apply();
      search.focus();
    });

    // Allow links like education.html?q=equity
    var params = new URLSearchParams(window.location.search);
    if (params.get('q')) search.value = params.get('q');
    apply();
  }
})();
