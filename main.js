(function () {
  const { settings, works, lines } = window.SITE;
  const $ = (sel) => document.querySelector(sel);

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k === 'style') Object.assign(node.style, v);
      else node.setAttribute(k, v);
    }
    for (const child of children || []) node.append(child);
    return node;
  }

  /* Settings */
  document.querySelectorAll('[data-resume]').forEach((a) => a.setAttribute('href', settings.resumeUrl || 'assets/Writing_Resume.pdf'));
  $('#contact-card').dataset.style = settings.contactStyle || 'Sage';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header → side rail. On wide screens, once the page scrolls, the top bar morphs into a
     vertical column in the right margin so it never sits over the text. */
  const header = $('.page > .site-header');
  const bar = header.querySelector('.pill-bar');
  const wide = window.matchMedia('(min-width: 1360px)');
  let railOn = false;

  function setRail(on, animate) {
    if (on === railOn) return;
    const first = bar.getBoundingClientRect();
    bar.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    // Lock the header to its resting height so the page never moves: the bar leaves the
    // flow as a rail, and on the way back its tall in-between shape must not push content down.
    header.style.height = `${header.offsetHeight}px`;
    railOn = on;
    header.classList.toggle('is-rail', on);
    if (!animate || reduceMotion) {
      if (!on) header.style.height = '';
      return;
    }

    const last = bar.getBoundingClientRect();
    const easing = 'cubic-bezier(.65, 0, .25, 1)';
    const morph = bar.animate([
      { transform: `translate(${first.left - last.left}px, ${first.top - last.top}px)`, width: `${first.width}px`, height: `${first.height}px`, overflow: 'hidden' },
      { transform: 'none', width: `${last.width}px`, height: `${last.height}px`, overflow: 'hidden' },
    ], { duration: 480, easing });
    if (!on) morph.finished.then(() => { header.style.height = ''; }, () => {});
    // Each link turns 90° from its old direction into the new one.
    bar.querySelectorAll('.nav-link, .pill-bar > .btn').forEach((a, i) => a.animate([
      { opacity: 0, transform: `rotate(${on ? -90 : 90}deg)` },
      { opacity: 1, transform: 'none' },
    ], { duration: 420, delay: 140 + i * 50, easing, fill: 'backwards' }));
    if (!on) bar.querySelector('.brand').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 220, fill: 'backwards' });
  }

  function updateRail(animate) {
    if (!wide.matches) return setRail(false, false);
    const y = window.scrollY;
    if (!railOn && y > 40) setRail(true, animate);
    else if (railOn && y < 10) setRail(false, animate);
  }
  // Mark the link for the section being read (shown as a highlight in the rail).
  // Nothing is marked at the top of the page.
  const spyLinks = [...bar.querySelectorAll('.nav-link')];
  const spySections = spyLinks.map((a) => document.querySelector(a.getAttribute('href')));
  function updateSpy() {
    let current = -1;
    if (window.scrollY >= 10) {
      const line = window.innerHeight * 0.4;
      spySections.forEach((s, i) => { if (s.getBoundingClientRect().top <= line) current = i; });
      // The last section can be too short to reach the line, so the page bottom counts as it.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = spySections.length - 1;
    }
    spyLinks.forEach((a, i) => {
      if (i === current) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  window.addEventListener('scroll', () => { updateRail(true); updateSpy(); }, { passive: true });
  window.addEventListener('resize', updateSpy);
  wide.addEventListener('change', () => updateRail(false));
  updateRail(false);
  updateSpy();

  /* Work grid + filters */
  const tagColors = {
    'Lyrics / Songs': ['#f0cfb6', '#6b3410'],
    'Poetry': ['#dfe3d3', '#3f4a2e'],
    'Scripts': ['#201e1d', '#f5ead8'],
    'Others': ['#f5ead8', '#4a433d'],
    'Articles': ['#8a4519', '#f5ead8'],
  };
  // Filters follow the order types first appear in content.js; the first one is shown on load.
  const types = [...new Set(works.map((w) => w.type))];
  let filter = types[0];

  function renderFilters() {
    $('#filters').replaceChildren(...types.map((t) => {
      const b = el('button', { type: 'button', class: 'filter', 'aria-pressed': String(t === filter), text: t });
      b.addEventListener('click', () => { filter = t; renderFilters(); renderWorks(); });
      return b;
    }));
  }

  function renderWorks() {
    const visible = works.filter((w) => w.type === filter);
    $('#work-grid').replaceChildren(...visible.map((w) => {
      const [bg, fg] = tagColors[w.type] || ['#f5ead8', '#201e1d'];
      return el('a', { href: w.url, target: '_blank', rel: 'noopener', class: 'work-card' }, [
        el('div', { class: 'work-meta' }, [
          el('span', { class: 'tag', text: w.type, style: { background: bg, color: fg } }),
          el('span', { class: 'year', text: w.year }),
        ]),
        el('div', { class: 'work-body' }, [
          el('h3', { class: 'work-title', text: w.title }),
          el('p', { class: 'work-blurb', text: w.blurb }),
        ]),
        el('span', { class: 'work-cta', text: 'Read the piece →' }),
      ]);
    }));
  }

  renderFilters();
  renderWorks();

  /* Lines carousel */
  const track = $('#track');
  const slides = lines.map((l, i) => el('a', {
    href: l.url, target: '_blank', rel: 'noopener', class: 'slide',
    role: 'group', 'aria-roledescription': 'slide', 'aria-label': `${i + 1} of ${lines.length}`,
  }, [
    el('div', { class: 'quote-mark', 'aria-hidden': 'true', text: '“' }),
    el('p', { class: 'slide-text', text: l.text }),
    el('div', { class: 'slide-foot' }, [
      el('span', { text: `— ${l.source}` }),
      el('span', { class: 'slide-cta', text: 'Read the full piece →' }),
    ]),
  ]));
  track.replaceChildren(...slides);

  // Long passages (over LONG_CHARS) get a smaller font so they are no taller than the
  // tallest regular line; otherwise one long line would make the whole carousel taller.
  const LONG_CHARS = 220;
  const texts = slides.map((s) => s.querySelector('.slide-text'));
  function fitLongLines() {
    texts.forEach((t) => { t.style.fontSize = ''; t.style.maxWidth = ''; });
    const isLong = (t) => t.textContent.length > LONG_CHARS;
    const limit = Math.max(0, ...texts.filter((t) => !isLong(t)).map((t) => t.offsetHeight));
    if (!limit) return;
    texts.filter(isLong).forEach((t) => {
      const base = parseFloat(getComputedStyle(t).fontSize);
      t.style.maxWidth = `${parseFloat(getComputedStyle(t).maxWidth)}px`; // keep the wrap width while the font shrinks
      for (let scale = 0.96; t.offsetHeight > limit && scale > 0.5; scale -= 0.04) {
        t.style.fontSize = `${base * scale}px`;
      }
    });
  }
  fitLongLines();
  document.fonts.ready.then(fitLongLines);
  let fitTimer;
  window.addEventListener('resize', () => { clearTimeout(fitTimer); fitTimer = setTimeout(fitLongLines, 150); });

  const dots = lines.map((_, i) => {
    const d = el('button', { type: 'button', class: 'dot', 'aria-label': `Line ${i + 1}` });
    d.addEventListener('click', () => go(i));
    return d;
  });
  $('#dots').replaceChildren(...dots);

  let idx = 0;
  let paused = false;
  let statementOpen = false;
  let shownMs = 0; // time the current line has been on screen, not counting pauses

  // How long a line stays: its reading time at readingWpm, plus extraSeconds.
  const wpm = settings.readingWpm || 238;
  const extra = settings.extraSeconds ?? 3;
  const durations = lines.map((l) => {
    const words = l.text.trim().split(/\s+/).length;
    return (words / wpm) * 60000 + extra * 1000;
  });

  function go(i) {
    const n = lines.length;
    idx = ((i % n) + n) % n;
    shownMs = 0;
    track.style.transform = `translateX(-${idx * 100}%)`;
    $('#counter').textContent = `${idx + 1} of ${n}`;
    slides.forEach((s, j) => {
      const active = j === idx;
      s.toggleAttribute('inert', !active);
      s.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((d, j) => d.setAttribute('aria-current', String(j === idx)));
  }
  go(0);

  $('#prev').addEventListener('click', () => go(idx - 1));
  $('#next').addEventListener('click', () => go(idx + 1));

  const carousel = $('#carousel');
  carousel.addEventListener('mouseenter', () => { paused = true; });
  carousel.addEventListener('mouseleave', () => { paused = false; });
  carousel.addEventListener('focusin', () => { paused = true; });
  carousel.addEventListener('focusout', () => { paused = false; });

  // Swipe: the slide follows the finger, and any sideways swipe moves to the next/previous line.
  let touchX = null;
  let touchY = 0;
  let dragging = false;
  carousel.addEventListener('touchstart', (e) => {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
    dragging = false;
    paused = true;
  }, { passive: true });
  carousel.addEventListener('touchmove', (e) => {
    if (touchX === null) return;
    const dx = e.touches[0].clientX - touchX;
    const dy = e.touches[0].clientY - touchY;
    if (!dragging) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) dragging = true;
      else if (Math.abs(dy) > 8) { touchX = null; paused = false; return; } // a page scroll, not a swipe
      else return;
    }
    track.style.transition = 'none';
    track.style.transform = `translateX(calc(-${idx * 100}% + ${dx}px))`;
  }, { passive: true });
  function endSwipe(e) {
    if (dragging) {
      const dx = e.changedTouches[0].clientX - touchX;
      track.style.transition = '';
      // Any sideways swipe moves on, however short; only a tiny wobble stays put.
      go(Math.abs(dx) > 10 ? idx + (dx < 0 ? 1 : -1) : idx);
    }
    touchX = null;
    dragging = false;
    paused = false;
  }
  carousel.addEventListener('touchend', endSwipe);
  carousel.addEventListener('touchcancel', endSwipe);

  if (settings.autoplay !== false && !reduceMotion && lines.length > 1) {
    const TICK = 250;
    setInterval(() => {
      if (paused || statementOpen || document.hidden) return;
      shownMs += TICK;
      if (shownMs >= durations[idx]) go(idx + 1);
    }, TICK);
  }

  /* Full artist statement (own page at #artist-statement) */
  const STATEMENT_HASH = '#artist-statement';
  const page = $('#statement-page');
  let openedInPage = false;
  let returnFocus = null;

  function setStatement(open) {
    if (open === statementOpen) return;
    statementOpen = open;
    page.hidden = !open;
    document.body.classList.toggle('locked', open);
    document.querySelectorAll('.page > header, .page > main').forEach((n) => n.toggleAttribute('inert', open));
    if (open) {
      returnFocus = document.activeElement;
      page.scrollTop = 0;
      page.querySelector('[data-close]').focus();
    } else if (returnFocus && document.contains(returnFocus) && location.hash !== '#work') {
      returnFocus.focus({ preventScroll: true });
    }
  }

  function closeStatement() {
    if (!statementOpen) return;
    if (openedInPage) {
      history.back();
    } else {
      history.replaceState(null, '', '#statement');
      setStatement(false);
    }
  }

  window.addEventListener('hashchange', () => {
    const open = location.hash === STATEMENT_HASH;
    if (open) openedInPage = true;
    setStatement(open);
    if (!open) {
      openedInPage = false;
      const target = location.hash && document.getElementById(location.hash.slice(1));
      if (target && location.hash !== '#statement') target.scrollIntoView();
    }
  });

  page.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', closeStatement));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeStatement();
  });

  if (location.hash === STATEMENT_HASH) setStatement(true);
})();
