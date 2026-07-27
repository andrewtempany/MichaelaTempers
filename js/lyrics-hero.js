/**
 * Lyrics Karaoke Hero
 * -------------------
 * Replaces the homepage image hero with an Embla carousel of song lyrics
 * (one song per slide). Lyrics text AND word timing are parsed from the
 * WebVTT files in /songs — the VTT is the single source of truth.
 *
 * One verse (stanza) is shown at a time, large and centred. Two visual modes:
 *   • Idle    — cursor proximity "spotlight" over the current verse (inline styles).
 *   • Karaoke — as the audio plays, the stage focuses the verse being sung and
 *               lights its words one by one, driven by the shared #player-audio
 *               element from player.js.
 *
 * Playback reuses the existing fixed bottom player: each slide's play button
 * carries the `.player-open-btn` class + data-src/data-track, which player.js
 * picks up via event delegation.
 */

(function () {
  'use strict';

  // ── Config ───────────────────────────────────────────────────

  var ASSET_BASE = 'https://andrewtempany.github.io/michaela-tempers-assets/';
  var STANZA_GAP = 2.0;   // seconds of silence between lines that starts a new stanza
  var REDUCED    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // n / title drive both the local VTT path and the remote audio URL.
  var SONGS = [
    { n: 1, title: 'Forest Fire' },
    { n: 2, title: 'Good Woman' },
    { n: 3, title: 'Higher Ground' },
    { n: 4, title: 'Saintly' },
    { n: 5, title: 'Nothing to Lose' },
    { n: 6, title: 'The Plane' }
  ].map(function (s) {
    return {
      title: s.title,
      vtt:   encodeURI('songs/' + s.n + '. ' + s.title + '.vtt'),
      audio: encodeURI(ASSET_BASE + s.n + '. ' + s.title + ' - Michaela Tempers.mp3')
    };
  });

  // ── Boot ─────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    var container = document.getElementById('embla-container');
    if (!container || typeof EmblaCarousel === 'undefined') return;

    // Fetch + parse every VTT in parallel, preserving order.
    Promise.all(SONGS.map(loadSong)).then(function (songs) {
      build(songs);
    });
  }

  // ── VTT loading + parsing ────────────────────────────────────

  function loadSong(song) {
    return fetch(song.vtt)
      .then(function (r) { return r.ok ? r.text() : ''; })
      .then(function (text) {
        var lines = parseVTT(text);
        if (lines.length) {
          // Word timing comes from the VTT, but its inter-line gaps make poor
          // verse breaks. Prefer the hand-authored stanza shape in lyrics-data.js
          // (line counts match); fall back to the gap heuristic if they don't.
          var stanzas = regroupByFallback(song.title, lines) || groupIntoStanzas(lines);
          return { title: song.title, audio: song.audio, stanzas: stanzas, hasTiming: true };
        }
        return fallbackSong(song);          // no timing → plain lyrics
      })
      .catch(function () { return fallbackSong(song); });
  }

  // Regroup timed VTT lines into verses using the fallback's stanza sizes.
  // Returns null if there's no fallback or the line counts don't line up.
  function regroupByFallback(title, lines) {
    var fb = (window.LYRICS_FALLBACK || {})[title];
    if (!fb) return null;
    var sizes = fb.map(function (st) { return st.length; });
    var total = sizes.reduce(function (a, b) { return a + b; }, 0);
    if (total !== lines.length) return null;
    var stanzas = [], idx = 0;
    sizes.forEach(function (n) { stanzas.push(lines.slice(idx, idx + n)); idx += n; });
    return stanzas;
  }

  // Un-timed lyrics from js/lyrics-data.js, normalised to the stanza shape.
  function fallbackSong(song) {
    var fb = (window.LYRICS_FALLBACK || {})[song.title];
    var stanzas = fb ? fb.map(function (stanza) {
      return stanza.map(function (lineText) {
        return lineText.split(/\s+/).filter(Boolean).map(function (w) {
          return { text: w };             // no start/end → not karaoke-able
        });
      });
    }) : [];
    return { title: song.title, audio: song.audio, stanzas: stanzas, hasTiming: false };
  }

  // Group timed lines into stanzas by inter-line silence.
  function groupIntoStanzas(lines) {
    var stanzas = [];
    var current = [];
    var prevEnd = null;
    lines.forEach(function (lineWords) {
      var lineStart = lineWords[0].start;
      if (prevEnd !== null && current.length && lineStart - prevEnd > STANZA_GAP) {
        stanzas.push(current);
        current = [];
      }
      current.push(lineWords);
      prevEnd = lineWords[lineWords.length - 1].end;
    });
    if (current.length) stanzas.push(current);
    return stanzas;
  }

  // Returns an array of lines; each line is an array of { text, start, end }.
  function parseVTT(text) {
    if (!text) return [];

    var lines  = [];
    var blocks = text.replace(/\r/g, '').split('\n\n');

    // <00:00:21.014><c.classes>word</c>
    var WORD = /<(\d\d):(\d\d):(\d\d)\.(\d{3})>\s*<c[^>]*>([^<]*)<\/c>/g;

    blocks.forEach(function (block) {
      if (!/-->/.test(block)) return;                 // skip WEBVTT / STYLE / NOTE
      var cueEnd = cueEndTime(block);

      var words = [];
      var m;
      WORD.lastIndex = 0;
      while ((m = WORD.exec(block)) !== null) {
        var t = (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4]) / 1000;
        var w = m[5].trim();
        if (w) words.push({ text: w, start: t, end: 0 });
      }
      if (!words.length) return;

      // Each word ends where the next begins; last word ends at the cue end.
      for (var i = 0; i < words.length; i++) {
        words[i].end = (i + 1 < words.length) ? words[i + 1].start
                                              : Math.max(cueEnd, words[i].start + 0.3);
      }
      lines.push(words);
    });

    return lines;
  }

  function cueEndTime(block) {
    var m = block.match(/-->\s*(\d\d):(\d\d):(\d\d)\.(\d{3})/);
    if (!m) return 0;
    return (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4]) / 1000;
  }

  // ── DOM build ────────────────────────────────────────────────

  function build(songs) {
    var container = document.getElementById('embla-container');
    var dotsEl    = document.getElementById('embla-dots');
    var counter   = document.getElementById('song-counter');
    var btnPrev   = document.getElementById('btn-prev');
    var btnNext   = document.getElementById('btn-next');
    var stage     = document.getElementById('lyrics-stage');
    var cursorDot = document.getElementById('cursor-dot');

    var slideData = [];   // { wordEls, words, playBtn, scrollEl }
    var karaokeIndex = -1;

    songs.forEach(function (song, si) {
      var slide = el('div', 'embla__slide');
      slide.setAttribute('role', 'tabpanel');
      slide.id = 'slide-' + si;

      var inner = el('div', 'slide-inner');

      // Header: title + play button (play button drives the bottom player)
      var header = el('div', 'slide-header');
      var titleEl = el('h2', 'song-title');
      titleEl.textContent = song.title;

      var playBtn = el('button', 'play-btn player-open-btn');
      playBtn.type = 'button';
      playBtn.dataset.track = song.title;
      playBtn.dataset.src   = song.audio;
      playBtn.setAttribute('aria-label', 'Play ' + song.title);
      playBtn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path class="icon-play" d="M8 5v14l11-7z"/>' +
        '<path class="icon-pause" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

      header.appendChild(titleEl);
      header.appendChild(playBtn);

      // Lyrics — each stanza is a "verse panel". For timed songs only the
      // current verse is shown (large, centred) and playback advances it.
      var verseStage    = el('div', 'verse-stage' + (song.hasTiming ? '' : ' flow'));
      var stanzaEls     = [];   // stanza DOM nodes
      var stanzaWordEls = [];   // word spans grouped by stanza (for spotlight)
      var words         = [];   // flat timed words (drive karaoke), tagged with stanza

      song.stanzas.forEach(function (stanzaLines, sti) {
        var stanza  = el('div', 'lyric-stanza');
        var stWords = [];
        stanzaLines.forEach(function (lineWords) {
          var lineEl = el('div', 'lyric-line');
          lineWords.forEach(function (w) {
            var span = el('span', 'lyric-word');
            span.textContent = w.text;
            lineEl.appendChild(span);
            stWords.push(span);
            if (typeof w.start === 'number') {
              span.dataset.start = w.start;
              span.dataset.end   = w.end;
              words.push({ el: span, start: w.start, end: w.end, stanza: sti });
            }
          });
          stanza.appendChild(lineEl);
        });
        if (song.hasTiming && sti === 0) stanza.classList.add('is-current');
        verseStage.appendChild(stanza);
        stanzaEls.push(stanza);
        stanzaWordEls.push(stWords);
      });

      // Empty-state if neither VTT nor fallback lyrics exist
      if (!song.stanzas.length) {
        var empty = el('p', 'lyrics-empty');
        empty.textContent = 'Lyrics coming soon.';
        verseStage.appendChild(empty);
      }

      inner.appendChild(header);
      inner.appendChild(verseStage);
      slide.appendChild(inner);
      container.appendChild(slide);

      // Dot
      var dot = el('button', 'embla__dot' + (si === 0 ? ' is-selected' : ''));
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Go to ' + song.title);
      dot.setAttribute('aria-selected', si === 0 ? 'true' : 'false');
      dot.addEventListener('click', function () { embla.scrollTo(si); });
      dotsEl.appendChild(dot);

      // Clicking play arms karaoke for this song (player.js handles the audio).
      // Songs without timing still play — they just don't highlight.
      playBtn.addEventListener('click', function () {
        if (song.hasTiming) setKaraoke(si);
      });

      slideData.push({ stanzaEls: stanzaEls, stanzaWordEls: stanzaWordEls,
                       words: words, playBtn: playBtn,
                       hasTiming: song.hasTiming, curStanza: 0 });
    });

    // ── Embla ──────────────────────────────────────────────────

    var embla = EmblaCarousel(
      document.getElementById('embla'),
      { loop: false, dragFree: false, align: 'start' }
    );

    var dots = dotsEl.querySelectorAll('.embla__dot');

    function updateNav(index) {
      counter.textContent = (index + 1) + ' / ' + songs.length;
      dots.forEach(function (d, i) {
        d.classList.toggle('is-selected', i === index);
        d.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      btnPrev.disabled = index === 0;
      btnNext.disabled = index === songs.length - 1;
    }

    embla.on('select', function () {
      var idx = embla.selectedScrollSnap();
      updateNav(idx);
      // Reset idle styling on the newly-shown slide unless it's the karaoke one
      if (idx !== karaokeIndex) resetSpotlight(idx);
    });

    btnPrev.addEventListener('click', function () { embla.scrollPrev(); });
    btnNext.addEventListener('click', function () { embla.scrollNext(); });

    document.addEventListener('keydown', function (e) {
      var tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') embla.scrollNext();
      if (e.key === 'ArrowLeft')  embla.scrollPrev();
    });

    updateNav(0);

    // ── Karaoke (driven by the shared bottom player audio) ──────

    var audio = document.getElementById('player-audio');

    function setKaraoke(index) {
      if (karaokeIndex === index) return;
      // Clear the previously-armed slide back to idle
      if (karaokeIndex >= 0) {
        slideData[karaokeIndex].words.forEach(function (w) {
          w.el.classList.remove('is-sung', 'is-active');
        });
        resetSpotlight(karaokeIndex);
      }
      karaokeIndex = index;
      // Drop any idle inline styles so karaoke classes take over cleanly
      resetSpotlight(index);
    }

    if (audio) {
      audio.addEventListener('timeupdate', function () {
        if (karaokeIndex < 0) return;
        renderKaraoke(slideData[karaokeIndex], audio.currentTime);
      });

      audio.addEventListener('play', function () {
        if (karaokeIndex >= 0) slideData[karaokeIndex].playBtn.classList.add('is-playing');
      });
      audio.addEventListener('pause', function () {
        if (karaokeIndex >= 0) slideData[karaokeIndex].playBtn.classList.remove('is-playing');
      });
      audio.addEventListener('ended', function () {
        if (karaokeIndex >= 0) slideData[karaokeIndex].playBtn.classList.remove('is-playing');
      });
    }

    function renderKaraoke(slide, t) {
      // Which verse are we in? The stanza of the most recent word to have begun
      // (holds through instrumental gaps; defaults to the first verse).
      var cur = 0;
      for (var i = 0; i < slide.words.length; i++) {
        if (slide.words[i].start <= t) cur = slide.words[i].stanza;
        else break;
      }
      if (cur !== slide.curStanza) setStanza(slide, cur);

      // Light words within the (visible) current verse; clear the rest.
      var activeLine = null;
      slide.words.forEach(function (w) {
        if (w.stanza !== cur) {
          w.el.classList.remove('is-active', 'is-sung');
          return;
        }
        var active = t >= w.start && t < w.end;
        w.el.classList.toggle('is-active', active);
        w.el.classList.toggle('is-sung',   t >= w.end);
        if (active) activeLine = w.el.parentNode;
      });

      // Keep the line being sung centred when the verse is taller than the stage.
      if (activeLine && activeLine !== slide._activeLine) {
        slide._activeLine = activeLine;
        scrollLineIntoView(slide.stanzaEls[cur], activeLine);
      }
    }

    function scrollLineIntoView(container, lineEl) {
      if (container.scrollHeight <= container.clientHeight + 4) return;  // fits, no scroll
      var cr = container.getBoundingClientRect();
      var lr = lineEl.getBoundingClientRect();
      var delta = (lr.top + lr.height / 2) - (cr.top + cr.height / 2);
      if (Math.abs(delta) < 6) return;
      container.scrollBy({ top: delta, behavior: REDUCED ? 'auto' : 'smooth' });
    }

    function setStanza(slide, idx) {
      var prev = slide.curStanza;
      if (slide.stanzaEls[prev]) slide.stanzaEls[prev].classList.remove('is-current');
      (slide.stanzaWordEls[prev] || []).forEach(resetWord);  // drop stale spotlight
      if (slide.stanzaEls[idx]) {
        slide.stanzaEls[idx].classList.add('is-current');
        slide.stanzaEls[idx].scrollTop = 0;                  // fresh verse starts at top
      }
      slide._activeLine = null;
      slide.curStanza = idx;
    }

    // ── Idle cursor spotlight ───────────────────────────────────

    var RADIUS = Math.min(window.innerWidth, window.innerHeight) * 0.4;
    window.addEventListener('resize', function () {
      RADIUS = Math.min(window.innerWidth, window.innerHeight) * 0.4;
    });

    // Words the spotlight acts on: the current verse for timed songs, or every
    // word for un-timed (flow) fallback songs.
    function spotlightEls(slide) {
      if (slide.hasTiming) return slide.stanzaWordEls[slide.curStanza] || [];
      return slide.stanzaWordEls.reduce(function (a, b) { return a.concat(b); }, []);
    }

    function resetSpotlight(slideIndex) {
      spotlightEls(slideData[slideIndex]).forEach(resetWord);
    }

    function updateProximity(slideIndex, cx, cy) {
      spotlightEls(slideData[slideIndex]).forEach(function (elw) {
        var rect = elw.getBoundingClientRect();
        var wx = rect.left + rect.width / 2;
        var wy = rect.top + rect.height / 2;
        var dist = Math.hypot(cx - wx, cy - wy);
        var tt = Math.max(0, 1 - dist / RADIUS);
        var p  = tt * tt * (3 - 2 * tt);  // smoothstep
        elw.style.opacity   = (0.3 + p * 0.7).toFixed(3);
        elw.style.color     = p > 0.45 ? 'var(--color-primary)' : 'var(--color-secondary)';
        elw.style.transform = (!REDUCED && p > 0.01) ? 'translateY(' + (-p * 5).toFixed(1) + 'px)' : '';
      });
    }

    if (!REDUCED) {
      stage.addEventListener('mousemove', function (e) {
        var idx = embla.selectedScrollSnap();
        if (idx === karaokeIndex) { cursorDot.style.opacity = '0'; return; }
        cursorDot.style.opacity = '1';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top  = e.clientY + 'px';
        updateProximity(idx, e.clientX, e.clientY);
      });

      stage.addEventListener('mouseleave', function () {
        cursorDot.style.opacity = '0';
        var idx = embla.selectedScrollSnap();
        if (idx !== karaokeIndex) resetSpotlight(idx);
      });
    }
  }

  // ── Helpers ──────────────────────────────────────────────────

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function resetWord(elw) {
    elw.style.opacity   = '';
    elw.style.color     = '';
    elw.style.transform = '';
  }

})();
