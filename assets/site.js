/* Taeho Kim — site behaviour. No dependencies.
   Fades sections in once, on first scroll into view, and drives the filter
   bar on the publications and research pages. Nothing else. */

/* — section filter — */
(function () {
  'use strict';

  var bar = document.querySelector('.filterbar');
  if (!bar) return;

  var buttons = bar.querySelectorAll('.filterbar-btn');
  var groups = document.querySelectorAll('[data-group]');

  function show(which) {
    groups.forEach(function (section) {
      var on = which === 'all' || section.dataset.group === which;
      section.hidden = !on;
      /* A section filtered back in has already been passed by the observer,
         so it would sit at opacity 0 forever without this. */
      if (on) section.classList.add('is-in');
    });
    buttons.forEach(function (btn) {
      var on = btn.dataset.filter === which;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filterbar-btn');
    if (btn) show(btn.dataset.filter);
  });
})();

/* — section fade-in — */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var targets = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

  targets.forEach(function (el) { io.observe(el); });
})();
