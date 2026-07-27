/**
 * Music Player
 * Persistent fixed player bar for Michaela Tempers site.
 * Triggered by any element with data-track and data-src attributes.
 * Gracefully handles missing audio files.
 */

(function () {
  'use strict';

  var player        = document.getElementById('music-player');
  var audio         = document.getElementById('player-audio');
  var playBtn       = document.getElementById('player-play');
  var scrubber      = document.getElementById('player-scrubber');
  var currentTimeEl = document.getElementById('player-current');
  var durationEl    = document.getElementById('player-duration');
  var trackTitleEl  = document.getElementById('player-track-title');
  var volumeControl = document.getElementById('player-volume-control');
  var closeBtn      = document.getElementById('player-close');

  if (!player || !audio || !playBtn) return;

  var playIcon  = playBtn.querySelector('.icon-play');
  var pauseIcon = playBtn.querySelector('.icon-pause');

  // ── Open player ──────────────────────────────────────────────

  function openPlayer(src, trackTitle) {
    // Update track title
    if (trackTitle && trackTitleEl) {
      trackTitleEl.textContent = trackTitle;
    }

    // Load new source only if it changed
    if (src) {
      var resolved = new URL(src, document.baseURI).href;
      if (audio.src !== resolved) {
        audio.src = src;
        audio.load();
      }
    }

    // Show the player
    player.removeAttribute('hidden');
    // Trigger CSS transition on next frame
    requestAnimationFrame(function () {
      player.classList.add('is-visible');
    });
    document.body.classList.add('player-open');

    // Attempt playback; silently fail if file is missing or blocked
    if (src) {
      var playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(function () {
          // File missing, autoplay blocked, or format unsupported — UI stays visible
        });
      }
    }
  }

  // ── Trigger buttons ──────────────────────────────────────────
  // Delegated so buttons rendered after load (e.g. the lyrics hero
  // slides built by lyrics-hero.js) are wired without re-scanning.

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.player-open-btn');
    if (!btn) return;
    openPlayer(btn.dataset.src || '', btn.dataset.track || '');
  });

  // ── Play / Pause ─────────────────────────────────────────────

  function togglePlay() {
    if (!audio.src) return;
    if (audio.paused) {
      var p = audio.play();
      if (p !== undefined) p.catch(function () {});
    } else {
      audio.pause();
    }
  }

  playBtn.addEventListener('click', togglePlay);

  audio.addEventListener('play', function () {
    if (playIcon)  playIcon.style.display  = 'none';
    if (pauseIcon) pauseIcon.style.display = '';
    playBtn.setAttribute('aria-label', 'Pause');
  });

  audio.addEventListener('pause', function () {
    if (playIcon)  playIcon.style.display  = '';
    if (pauseIcon) pauseIcon.style.display = 'none';
    playBtn.setAttribute('aria-label', 'Play');
  });

  audio.addEventListener('ended', function () {
    if (scrubber) scrubber.value = 0;
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
  });

  // ── Progress ─────────────────────────────────────────────────

  audio.addEventListener('timeupdate', function () {
    if (!audio.duration || isNaN(audio.duration)) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    if (scrubber) {
      scrubber.value = pct;
      scrubber.setAttribute('aria-valuenow', Math.round(pct));
      scrubber.setAttribute('aria-valuetext', Math.round(pct) + '% played');
    }
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', function () {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });

  if (scrubber) {
    scrubber.addEventListener('input', function () {
      if (!audio.duration || isNaN(audio.duration)) return;
      audio.currentTime = (parseFloat(this.value) / 100) * audio.duration;
    });
  }

  // ── Volume ───────────────────────────────────────────────────

  if (volumeControl) {
    audio.volume = parseFloat(volumeControl.value);
    volumeControl.addEventListener('input', function () {
      audio.volume = parseFloat(this.value);
    });
  }

  // ── Close ────────────────────────────────────────────────────

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      audio.pause();
      player.classList.remove('is-visible');
      document.body.classList.remove('player-open');
      // Re-hide after transition completes
      var duration = 300;
      setTimeout(function () {
        if (!player.classList.contains('is-visible')) {
          player.setAttribute('hidden', '');
        }
      }, duration);
    });
  }

  // ── Keyboard shortcuts ───────────────────────────────────────

  document.addEventListener('keydown', function (e) {
    if (!player.classList.contains('is-visible')) return;
    // Don't intercept when typing in a form field
    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    }
  });

  // ── Reduced motion ───────────────────────────────────────────

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    player.style.transition = 'none';
  }

  // ── Helpers ──────────────────────────────────────────────────

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '—:——';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' + s : s);
  }

})();
