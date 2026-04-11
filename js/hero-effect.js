/**
 * Hero Film Grain Effect
 * Animated canvas noise overlaid on the full-screen hero image.
 * Throttled to every 2nd frame. Static single frame under prefers-reduced-motion.
 */

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initGrain() {
    var canvas = document.querySelector('.hero-grain');
    if (!canvas) return;

    var ctx  = canvas.getContext('2d');
    var wrap = canvas.parentElement;

    function resize() {
      canvas.width  = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    }

    function drawNoise() {
      var w = canvas.width;
      var h = canvas.height;
      var img = ctx.createImageData(w, h);
      var d   = img.data;
      for (var i = 0; i < d.length; i += 4) {
        var v = (Math.random() * 255) | 0;
        d[i]     = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }

    function loop() {
      drawNoise();
      requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener('resize', resize);
    // Re-check dimensions once full page has loaded (images painted)
    window.addEventListener('load', function () { resize(); if (REDUCED) drawNoise(); });

    if (REDUCED) {
      drawNoise();
    } else {
      loop();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGrain);
  } else {
    initGrain();
  }
})();
