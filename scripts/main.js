/*
  MAIN SCRIPT — 30 Days Project
  ================================
  Contributors: please add your scripts at the BOTTOM of this file
  or in a separate .js file in /scripts/
  DO NOT modify existing functions — only add new ones
  The END_DATE constant below is sacred — do not change it

  Structure:
  1. Constants
  2. Modal logic
  3. Countdown timer
  4. Guestbook renderer
  5. Contributions renderer
  6. Init
*/

'use strict';

/* ─────────────────────────────────────────
   1. CONSTANTS
   The end date is fixed. The clock only goes one direction.
   ───────────────────────────────────────── */

const LAUNCH_DATE = '2026-03-18T00:00:00'; // When this started
const END_DATE    = '2026-04-17T00:00:00'; // When this ends — do not change

/* ─────────────────────────────────────────
   2. MODAL LOGIC
   Shows the agreement modal on first visit.
   Stores agreement in localStorage so it only appears once.
   ───────────────────────────────────────── */

const STORAGE_KEY = 'thirty-days-agreed'; // localStorage key for agreement

/**
 * Check if the user has already agreed.
 * Returns true if they have, false if not.
 */
function hasAgreed() {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

/**
 * Record agreement and reveal the main content.
 */
function recordAgreement() {
  localStorage.setItem(STORAGE_KEY, 'true');
  showMainContent();
}

/**
 * Hide the modal, reveal main content.
 */
function showMainContent() {
  const backdrop = document.getElementById('modal-backdrop');
  const main     = document.getElementById('main-content');

  if (backdrop) backdrop.classList.add('hidden');
  if (main)     main.classList.remove('hidden');
}

/**
 * Set up modal — show or hide based on prior agreement.
 */
function initModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const agreeBtn = document.getElementById('agree-btn');
  const main     = document.getElementById('main-content');

  if (!backdrop || !agreeBtn || !main) return;

  if (hasAgreed()) {
    // Already agreed — skip straight to content
    backdrop.classList.add('hidden');
    main.classList.remove('hidden');
  } else {
    // Show the modal, hide the content
    backdrop.classList.remove('hidden');
    main.classList.add('hidden');
  }

  // Wire up the agree button
  agreeBtn.addEventListener('click', recordAgreement);
}

/* ─────────────────────────────────────────
   3. COUNTDOWN TIMER
   Calculates time remaining to END_DATE.
   Updates every second. When it hits zero,
   displays a farewell message.
   ───────────────────────────────────────── */

/**
 * Returns an object with days, hours, minutes, seconds remaining.
 * All values are zero if the end date has passed.
 */
function getTimeRemaining() {
  const now  = new Date().getTime();
  const end  = new Date(END_DATE).getTime();
  const diff = Math.max(end - now, 0); // never negative

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: diff };
}

/**
 * Pads a number to at least 2 digits. e.g. 7 → "07"
 */
function pad(n) {
  return String(n).padStart(2, '0');
}

/**
 * Updates the DOM countdown elements with current time remaining.
 */
function updateCountdown() {
  const { days, hours, minutes, seconds, total } = getTimeRemaining();

  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const footerEl  = document.getElementById('footer-days-left');

  if (daysEl)    daysEl.textContent    = pad(days);
  if (hoursEl)   hoursEl.textContent   = pad(hours);
  if (minutesEl) minutesEl.textContent = pad(minutes);
  if (secondsEl) secondsEl.textContent = pad(seconds);

  // Update footer "gone in X days" text
  if (footerEl) {
    if (total <= 0) {
      footerEl.textContent = 'gone.';
    } else if (days === 0) {
      footerEl.textContent = 'less than a day';
    } else {
      footerEl.textContent = `${days} day${days === 1 ? '' : 's'}`;
    }
  }

  // If time is up, show farewell
  if (total <= 0) {
    const heroEl = document.querySelector('.hero');
    if (heroEl && !document.getElementById('farewell')) {
      const farewell = document.createElement('p');
      farewell.id = 'farewell';
      farewell.style.cssText = 'color:var(--color-accent);margin-top:2rem;font-size:1.125rem;';
      farewell.textContent = "It's over. Thank you for being here.";
      heroEl.appendChild(farewell);
    }
  }
}

/**
 * Start the countdown clock — ticks every second.
 */
function initCountdown() {
  updateCountdown();                      // Run immediately
  setInterval(updateCountdown, 1000);     // Then every second
}

/* ─────────────────────────────────────────
   4. GUESTBOOK RENDERER
   Fetches guestbook.json and renders entries.
   Falls back gracefully if fetch fails.
   ───────────────────────────────────────── */

/**
 * Escapes a string for safe insertion into HTML.
 * Prevents XSS from untrusted guestbook/contribution data.
 */
function escapeHtml(str) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' };
  return String(str).replace(/[&<>"']/g, c => map[c]);
}

/**
 * Returns true if a GitHub handle contains only valid characters.
 * GitHub handles: alphanumeric + hyphens, no leading/trailing hyphens, max 39 chars.
 */
function isValidGithubHandle(handle) {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(handle);
}

/**
 * Returns true if a contribution URL is a safe relative path under /contributions/.
 * Blocks javascript:, data:, and external URLs.
 */
function isValidContributionUrl(url) {
  return /^\.\/contributions\/[a-zA-Z0-9._\-/]+$/.test(url);
}

/**
 * Creates a single guestbook entry DOM element.
 * All values are escaped before DOM insertion.
 */
function createGuestbookEntry(entry) {
  const el = document.createElement('div');
  el.className = 'guestbook-entry';

  const safeName    = escapeHtml(entry.name    || '');
  const safeMessage = escapeHtml(entry.message || '');
  const safeDate    = escapeHtml(entry.date    || '');

  // Build name — link to GitHub only if handle passes validation
  const meta = document.createElement('div');
  meta.className = 'entry-meta';

  const nameSpan = document.createElement('span');
  nameSpan.className = 'entry-name';

  if (entry.github && isValidGithubHandle(entry.github)) {
    const a = document.createElement('a');
    a.href = `https://github.com/${encodeURIComponent(entry.github)}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = entry.name || '';
    nameSpan.appendChild(a);
  } else {
    nameSpan.textContent = entry.name || '';
  }

  const msgSpan = document.createElement('span');
  msgSpan.className = 'entry-message';
  msgSpan.textContent = entry.message || '';

  const dateSpan = document.createElement('span');
  dateSpan.className = 'entry-date';
  dateSpan.textContent = entry.date || '';

  meta.appendChild(nameSpan);
  meta.appendChild(msgSpan);
  el.appendChild(meta);
  el.appendChild(dateSpan);

  return el;
}

/**
 * Fetch guestbook.json and render all entries into #guestbook-entries.
 */
async function initGuestbook() {
  const container = document.getElementById('guestbook-entries');
  if (!container) return;

  try {
    const res  = await fetch('./guestbook.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Clear loading text
    container.innerHTML = '';

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = '<p class="loading-text">No entries yet. Be the first.</p>';
      return;
    }

    // Render each entry — most recent last (chronological)
    data.forEach(entry => {
      container.appendChild(createGuestbookEntry(entry));
    });

  } catch (err) {
    // Graceful failure — don't break the page
    container.innerHTML = `<p class="loading-text muted">Couldn't load guestbook. Check back later.</p>`;
    console.warn('[thirty-days] Guestbook load failed:', err);
  }
}

/* ─────────────────────────────────────────
   5. CONTRIBUTIONS RENDERER
   Reads contributions data and renders cards.
   Contributors add their entry to the manifest
   inside index.html as a data attribute.
   ───────────────────────────────────────── */

/**
 * Creates a single contribution card DOM element.
 * URL is validated to only allow relative paths under /contributions/.
 * All text content is set via textContent, not innerHTML.
 */
function createContributionCard(item) {
  const card = document.createElement('div');
  card.className = 'contribution-card';

  const title  = document.createElement('p');
  title.className = 'card-title';
  title.textContent = item.title || '';

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = item.description || '';

  const author = document.createElement('p');
  author.className = 'card-author';
  author.textContent = `by ${item.author || ''}`;

  card.appendChild(title);
  card.appendChild(desc);
  card.appendChild(author);

  // Only link if URL is a safe relative path under /contributions/
  if (item.url && isValidContributionUrl(item.url)) {
    const link = document.createElement('a');
    link.className = 'card-link';
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = `Open ${item.title || 'contribution'}`;
    link.appendChild(srText);

    card.appendChild(link);
  }

  return card;
}

/**
 * Reads contribution data from #contributions-data script tag
 * and renders cards into #contributions-grid.
 *
 * Contributors: add your entry to the JSON array
 * in the <script id="contributions-data"> tag in index.html.
 */
function initContributions() {
  const grid     = document.getElementById('contributions-grid');
  const dataEl   = document.getElementById('contributions-data');

  if (!grid) return;

  // No data script tag means no contributions yet
  if (!dataEl) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>Nothing here yet.</p>
        <p>Be the first to contribute.</p>
      </div>
    `;
    return;
  }

  try {
    const data = JSON.parse(dataEl.textContent);

    if (!Array.isArray(data) || data.length === 0) {
      grid.innerHTML = `<div class="empty-state"><p>Nothing here yet. Be the first.</p></div>`;
      return;
    }

    // Clear placeholder, render cards
    grid.innerHTML = '';
    data.forEach(item => {
      grid.appendChild(createContributionCard(item));
    });

  } catch (err) {
    grid.innerHTML = `<div class="empty-state"><p>Couldn't load contributions.</p></div>`;
    console.warn('[thirty-days] Contributions parse failed:', err);
  }
}

/* ─────────────────────────────────────────
   6. INIT
   Runs everything when the DOM is ready.
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initModal();
  initCountdown();
  initGuestbook();
  initContributions();
});

/* ─────────────────────────────────────────
   CONTRIBUTOR SCRIPTS — ADD BELOW THIS LINE
   ─────────────────────────────────────────

   Hello, contributor. This is your zone.
   Add new functions and event listeners below.
   Do not modify anything above this line.

   Template:

   /*
     CONTRIBUTOR: [Your Name] (@github_handle)
     DATE: YYYY-MM-DD
     DESCRIPTION: What this does in one sentence
   */

/* ↓ ↓ ↓ START YOUR CONTRIBUTION HERE ↓ ↓ ↓ */
