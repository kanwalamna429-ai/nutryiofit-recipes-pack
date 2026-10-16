/* =================================================================
   Nutryio Ads Manager  ·  /shared/ads.js
   Loaded automatically on every page via template.js.

   Fills every [data-ad] slot with a High Revenue Format banner:
     - leaderboard slots  -> 728x90 unit
     - rectangle slots    -> 300x250 unit

   The vendor invoke.js uses document.write, so each banner is
   rendered inside a srcdoc iframe sized to the unit.

   ================================================================= */

const NUTRYIO_ADS = {

  /* ── Google AdSense (disabled) ─────────────────────────────── */
  adsense: {
    enabled: false,
    publisherId: 'ca-pub-1056206763644639',
    slots: {},
  },

  /* ── High Revenue Format banner units ──────────────────────── */
  highRevenueFormat: {
    enabled: true,
    units: {
      leaderboard: { key: '529880126f5050c80092250dcea5e50e', width: 728, height: 90 },
      rectangle:   { key: '0f6f2d44485c1bc0f4b725a17a63fae6', width: 300, height: 250 },
    },
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

/* Build the srcdoc HTML for one High Revenue Format unit. */
function _nutryioHrfSrcdoc(unit) {
  return '<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body>'
    + '<scr' + 'ipt>atOptions={key:\'' + unit.key + '\',format:\'iframe\',height:' + unit.height
    + ',width:' + unit.width + ',params:{}};</scr' + 'ipt>'
    + '<scr' + 'ipt src="https://www.highrevenueformat.com/' + unit.key + '/invoke.js"></scr' + 'ipt>'
    + '</body></html>';
}

/* Render one banner into a slot element. */
function _nutryioRenderBanner(el, sizeName) {
  const unit = NUTRYIO_ADS.highRevenueFormat.units[sizeName];
  if (!unit) return;

  const frame = document.createElement('iframe');
  frame.width = unit.width;
  frame.height = unit.height;
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('marginheight', '0');
  frame.setAttribute('marginwidth', '0');
  frame.style.border = '0';
  frame.style.overflow = 'hidden';
  frame.style.maxWidth = '100%';
  frame.style.display = 'block';
  frame.style.margin = '0 auto';
  frame.loading = 'lazy';
  frame.srcdoc = _nutryioHrfSrcdoc(unit);

  el.replaceChildren(frame);
  el.hidden = false;
  el.style.display = '';
  el.dataset.adLive = 'highrevenueformat';
}

/* ── Activation ─────────────────────────────────────────────── */

function _nutryioActivateAds() {
  const cfg = NUTRYIO_ADS.highRevenueFormat;
  document.querySelectorAll('[data-ad]').forEach(el => {
    const slot = el.dataset.ad;
    const sizeName = NUTRYIO_ADS.slotSizes[slot];
    if (cfg.enabled && sizeName && cfg.units[sizeName]) {
      _nutryioRenderBanner(el, sizeName);
    } else {
      el.replaceChildren();
      delete el.dataset.adLive;
      el.hidden = true;
      el.style.display = 'none';
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _nutryioActivateAds);
} else {
  _nutryioActivateAds();
}

window.NUTRYIO_ADS = NUTRYIO_ADS;
