/* =================================================================
   Nutryio AdSense Manager  ·  /shared/ads.js
   Loaded automatically on every page via template.js.
   =================================================================

   HOW TO ACTIVATE ADS  (3 steps):

   1. Sign up and get approved at https://adsense.google.com
      This can take a few days — you need your site to be live.

   2. Find your Publisher ID:
        AdSense → Account → Account information
        Looks like:  ca-pub-1234567890123456

   3. Create one Display ad unit per slot below:
        AdSense → Ads → By ad unit → + New ad unit → Display ads
        Copy the numeric Slot ID shown in the code snippet.
        (e.g. 9876543210)

   4. Fill in the slot IDs below, then set  enabled: true

   ================================================================= */

const NUTRYIO_ADS = {

  /* ── Master switch ─────────────────────────────────────────── */
  enabled: true,             // AdSense library loads on every page

  /* ── Your publisher ID ─────────────────────────────────────── */
  publisherId: 'ca-pub-1056206763644639',

  /* ── Ad slot IDs ───────────────────────────────────────────── */
  /*
   * Each key maps to a data-ad="..." attribute in the HTML.
   * Create one ad unit per slot in AdSense → Ads → By ad unit.
   * All units use the responsive "Display" format.
   *
   * HOMEPAGE
   *   homepage-after-category  Responsive banner after each category section
   *
   * BLOG INDEX SIDEBAR
   *   blog-index-sidebar-top      300×250 at the top of the sidebar
   *   blog-index-sidebar-bottom   300×250 below all sidebar widgets
   *
   * SINGLE BLOG POST
   *   post-above-image            Responsive — above the featured image
   *   post-in-article             Responsive — mid-article (after first callout)
   *   post-below-article          Responsive — below the article body
   *   post-sidebar-top            300×250 — sidebar top
   *   post-sidebar-after-widgets  300×250 — sidebar after all widgets
   *
   * CALCULATOR PAGES
   *   calc-after-calculator       Responsive — below the calculator card
   *   calc-after-content          Responsive — after the SEO/FAQ content
   *   calc-sidebar                300×250 — calculator sidebar
   */
  slots: {

    /* Homepage */
    'homepage-after-category':     '',

    /* Blog index sidebar */
    'blog-index-sidebar-top':      '',
    'blog-index-sidebar-bottom':   '',

    /* Single blog post */
    'post-above-image':            '',
    'post-in-article':             '',
    'post-below-article':          '',
    'post-sidebar-top':            '',
    'post-sidebar-after-widgets':  '',

    /* Calculator pages */
    'calc-after-calculator':       '',
    'calc-after-content':          '',
    'calc-sidebar':                '',

  },

};

/* ================================================================
   Internal — ad injection logic.  Do not edit below this line.
   ================================================================ */

function _nutryioActivateAds() {
  if (!NUTRYIO_ADS.enabled) return; // placeholders stay as-is when disabled

  /* Inject the AdSense library once */
  if (!document.querySelector('script[data-nutryio-adsense]')) {
    const s = document.createElement('script');
    s.async        = true;
    s.src          = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${NUTRYIO_ADS.publisherId}`;
    s.crossOrigin  = 'anonymous';
    s.dataset.nutryioAdsense = '1';
    document.head.appendChild(s);
  }

  /* Replace every placeholder with a live AdSense <ins> unit */
  document.querySelectorAll('[data-ad]').forEach(el => {
    const slotKey = el.dataset.ad;
    const slotId  = NUTRYIO_ADS.slots[slotKey];
    if (!slotId) return; // skip slots with no ID configured yet

    /* Mark element so CSS strips the dashed-border placeholder style */
    el.dataset.adLive = '1';

    el.innerHTML = `<ins class="adsbygoogle"
      style="display:block"
      data-ad-client="${NUTRYIO_ADS.publisherId}"
      data-ad-slot="${slotId}"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>`;

    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
  });
}

/* DOM-safe invocation */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _nutryioActivateAds);
} else {
  _nutryioActivateAds();
}

/* Expose config so it can be inspected in the browser console */
window.NUTRYIO_ADS = NUTRYIO_ADS;
