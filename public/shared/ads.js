/* =================================================================
   Nutryio Ads Manager  ·  /shared/ads.js
   Loaded automatically on every page via template.js.

   Advertica banners (728x90 + 300x250) in each [data-ad] slot.
   Optional Google AdSense configuration remains disabled.

   ================================================================= */

const NUTRYIO_ADS = {

  /* ── Google AdSense (disabled) ─────────────────────────────── */
  adsense: {
    enabled: false,
    publisherId: 'ca-pub-1056206763644639',
    slots: {},
  },

  /* ── Advertica banners ─────────────────────────────────────── */
  advertica: {
    enabled: true,
    units: {
      /* 728x90 horizontal leaderboard */
      leaderboard: {
        className:  'b36b1198822',
        domain:     '//data527.click',
        affquery:   '/54c73f944984d4d8f2b7/36b1198822/?placementName=default',
        width:  728,
        height: 90,
      },
      /* 300x250 medium rectangle */
      rectangle: {
        className:  'j0a2a18ff52',
        domain:     '//data527.click',
        affquery:   '/831521adee1baed8293f/0a2a18ff52/?placementName=default',
        width:  300,
        height: 250,
      },
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

/* ── Banner rendering ───────────────────────────────────────── */

function _nutryioRenderAdvertica(el, size) {
  const unit = NUTRYIO_ADS.advertica.units[size];
  if (!unit || !unit.className) return false;
  const w = unit.width || 0;
  const h = unit.height || 0;
  const frameW = w > 0 ? w : 320;
  const frameH = h > 0 ? h : 250;
  const html = `<!doctype html><html><head><meta charset="utf-8">
    <style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style>
    </head><body>
    <ins style="width:${w}px;height:${h}px" data-width="${w}" data-height="${h}"
      class="${unit.className}" data-domain="${unit.domain}" data-affquery="${unit.affquery}"></ins>
    <script src="${unit.domain}/js/responsive.js" async><\/script>
    </body></html>`;
  el.innerHTML = `<iframe title="Advertisement" scrolling="no" frameborder="0"
    style="display:block;margin:0 auto;border:0;width:${frameW}px;height:${frameH}px;max-width:100%"
    srcdoc='${html.replace(/'/g, "&#39;")}'></iframe>`;
  return true;
}

function _nutryioRenderSlot(el) {
  if (!NUTRYIO_ADS.advertica.enabled) return;
  const size = NUTRYIO_ADS.slotSizes[el.dataset.ad] || 'rectangle';
  if (_nutryioRenderAdvertica(el, size)) el.dataset.adLive = '1';
}

/* ── Activation ─────────────────────────────────────────────── */

function _nutryioActivateAds() {
  document.querySelectorAll('[data-ad]').forEach(_nutryioRenderSlot);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _nutryioActivateAds);
} else {
  _nutryioActivateAds();
}

window.NUTRYIO_ADS = NUTRYIO_ADS;
