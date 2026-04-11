/**
 * Navigation Component
 * Injects consistent navigation across all pages.
 * Mobile: animated morphing-ring toggle + full-screen overlay menu.
 */

(function () {
  'use strict';

  function getCurrentPage() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    return page === '' ? 'index.html' : page;
  }

  function createNavigation() {
    var currentPage = getCurrentPage();

    return (
      '<div class="nav-container">' +
        '<div class="nav-brand">' +
          '<a href="index.html" class="brand-link">Michaela Tempers</a>' +
        '</div>' +
        '<button class="nav-toggle" aria-label="Open navigation menu"' +
                ' aria-expanded="false" aria-controls="nav-overlay">' +
          '<div class="ring ring--outer" aria-hidden="true"></div>' +
          '<div class="ring ring--inner" aria-hidden="true"></div>' +
          '<span class="nav-toggle-label" data-open="MENU" data-close="CLOSE">MENU</span>' +
        '</button>' +
        '<ul class="nav-menu">' +
          '<li class="nav-item"><a href="index.html" class="nav-link' + (currentPage === 'index.html' ? ' active' : '') + '"' + (currentPage === 'index.html' ? ' aria-current="page"' : '') + '>Home</a></li>' +
          '<li class="nav-item"><a href="shows.html" class="nav-link' + (currentPage === 'shows.html' ? ' active' : '') + '"' + (currentPage === 'shows.html' ? ' aria-current="page"' : '') + '>Shows</a></li>' +
          '<li class="nav-item"><a href="press-kit.html" class="nav-link' + (currentPage === 'press-kit.html' ? ' active' : '') + '"' + (currentPage === 'press-kit.html' ? ' aria-current="page"' : '') + '>Press Kit</a></li>' +
          '<li class="nav-item"><a href="merch.html" class="nav-link' + (currentPage === 'merch.html' ? ' active' : '') + '"' + (currentPage === 'merch.html' ? ' aria-current="page"' : '') + '>Merch</a></li>' +
        '</ul>' +
      '</div>'
    );
  }

  function initNavigation() {
    var navElement = document.getElementById('main-nav');
    if (!navElement) return;

    var currentPage = getCurrentPage();
    navElement.innerHTML = createNavigation();

    // ── Desktop nav: nothing extra needed ──────────────────────────

    // ── Build overlay ───────────────────────────────────────────────
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.id = 'nav-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Navigation menu');
    overlay.setAttribute('hidden', '');
    overlay.innerHTML =
      '<nav class="overlay-nav" aria-label="Main navigation">' +
        '<a href="index.html" class="overlay-link" style="--i:0"' + (currentPage === 'index.html' ? ' aria-current="page"' : '') + '>Home</a>' +
        '<a href="shows.html" class="overlay-link" style="--i:1"' + (currentPage === 'shows.html' ? ' aria-current="page"' : '') + '>Shows</a>' +
        '<a href="press-kit.html" class="overlay-link" style="--i:2"' + (currentPage === 'press-kit.html' ? ' aria-current="page"' : '') + '>Press Kit</a>' +
        '<a href="merch.html" class="overlay-link" style="--i:3"' + (currentPage === 'merch.html' ? ' aria-current="page"' : '') + '>Merch</a>' +
      '</nav>';
    document.body.appendChild(overlay);

    // ── Toggle button ───────────────────────────────────────────────
    var navToggle = navElement.querySelector('.nav-toggle');
    var label     = navToggle && navToggle.querySelector('.nav-toggle-label');
    var scrollY_stored = 0;

    function openMenu() {
      overlay.removeAttribute('hidden');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('is-open');
        });
      });
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close navigation menu');
      if (label) label.textContent = label.dataset.close;

      // iOS Safari scroll lock
      scrollY_stored = window.scrollY;
      document.body.style.cssText += ';position:fixed;top:-' + scrollY_stored + 'px;width:100%;overflow:hidden';

      trapFocus(overlay);
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      if (label) label.textContent = label.dataset.open;

      // Restore scroll
      var prev = document.body.style.cssText;
      document.body.style.cssText = prev.replace(/;?position:fixed;top:-\d+px;width:100%;overflow:hidden/, '');
      window.scrollTo(0, scrollY_stored);

      navToggle.focus();

      overlay.addEventListener('transitionend', function h() {
        overlay.setAttribute('hidden', '');
        overlay.removeEventListener('transitionend', h);
      });
    }

    function trapFocus(container) {
      var focusable = container.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
      var first = focusable[0];
      var last  = focusable[focusable.length - 1];
      if (first) first.focus();

      container.addEventListener('keydown', function trap(e) {
        if (e.key === 'Escape') {
          closeMenu();
          container.removeEventListener('keydown', trap);
          return;
        }
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
    }

    if (navToggle) {
      navToggle.addEventListener('click', function () {
        if (overlay.classList.contains('is-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    // Global Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
