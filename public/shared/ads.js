/* =================================================================
   Nutryio Ads Manager  ·  /shared/ads.js
   Loaded automatically on every page via template.js.

   Advertising providers are currently removed.
   Optional Google AdSense configuration remains disabled.

   ================================================================= */

const NUTRYIO_ADS = {

  /* ── Google AdSense (disabled) ─────────────────────────────── */
  adsense: {
    enabled: false,
    publisherId: 'ca-pub-1056206763644639',
    slots: {},
  },

  /* ── Slot → banner size map ────────────────────────────────── */
  slotSizes: {
    'homepage-after-category':     'leaderboard',
    'blog-index-sidebar-top':      'rectangle',
    'blog-index-sidebar-bottom':   'rectangle',
    'post-above-image':            'leaderboard',
    'post-in-article':             'leaderboard',
    'post-below-article':          'leaderboard',
    'post-sidebar-top':            'rectangle',
    'post-sidebar-after-widgets':  'rectangle',
    'calc-after-calculator':       'leaderboard',
    'calc-after-content':          'leaderboard',
    'calc-sidebar':                'rectangle',
    'recipe-index-top':            'leaderboard',
    'recipe-index-sidebar-top':    'rectangle',
    'recipe-index-sidebar-bottom': 'rectangle',
    'recipe-above-card':           'leaderboard',
    'recipe-below-card':           'leaderboard',
    'recipe-sidebar-top':          'rectangle',
    'recipe-sidebar-bottom':       'rectangle',
  },


};

/* ================================================================
   Internal helpers
   ================================================================ */

/* ── Activation ─────────────────────────────────────────────── */

function _nutryioActivateAds() {
  document.querySelectorAll('[data-ad]').forEach(el => {
    el.replaceChildren();
    delete el.dataset.adLive;
    el.hidden = true;
    el.style.display = 'none';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _nutryioActivateAds);
} else {
  _nutryioActivateAds();
}

window.NUTRYIO_ADS = NUTRYIO_ADS;
