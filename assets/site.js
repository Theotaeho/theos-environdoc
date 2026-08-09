/* Taeho Kim — site behaviour. No dependencies.
   Fades sections in once, on first scroll into view. Nothing else. */

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
