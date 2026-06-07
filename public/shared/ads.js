/* =================================================================
   Nutryio Ads Manager  ·  /shared/ads.js
   Loaded automatically on every page via template.js.

   Supports three networks running side-by-side:
     1. Google AdSense      (per-slot <ins> units)
     2. Adsterra banners    (728x90 + 300x250 iframe units)
     3. Monetag MultiTag    (single global script – push/popunder/etc.)

   Each network has its own enabled flag. Adsterra renders into the
   same [data-ad] placeholders as AdSense; if both networks are
   enabled for a slot, AdSense wins and Adsterra is skipped for
   that placeholder (so units do not stack).
   ================================================================= */

const NUTRYIO_ADS = {

  /* ── Google AdSense ────────────────────────────────────────── */
  adsense: {
    enabled: true,
    publisherId: 'ca-pub-1056206763644639',
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
  },

  /* ── Adsterra banners ──────────────────────────────────────── */
  /*
   * Two banner units are configured: a 728x90 leaderboard for
   * in-content / full-width slots and a 300x250 medium rectangle
   * for sidebar slots. Each [data-ad] slot is mapped to one of
   * these two sizes below.
   */
  adsterra: {
    enabled: true,
    units: {
      leaderboard: {
        key:    '529880126f5050c80092250dcea5e50e',
        width:  728,
        height: 90,
      },
      rectangle: {
        key:    '0f6f2d44485c1bc0f4b725a17a63fae6',
        width:  300,
        height: 250,
      },
    },
    /* slot-key → unit name */
    slotUnits: {
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
    },
  },

  /* ── Monetag MultiTag (push / popunder / etc.) ─────────────── */
  monetag: {
    enabled: true,
    src:     'https://quge5.com/88/tag.min.js',
    zone:    '246800',
  },

};

/* ================================================================
   Internal — ad injection logic.  Do not edit below this line.
   ================================================================ */

function _nutryioLoadAdsense() {
  const cfg = NUTRYIO_ADS.adsense;
  if (!cfg.enabled || !cfg.publisherId) return;
  if (document.querySelector('script[data-nutryio-adsense]')) return;
  const s = document.createElement('script');
  s.async       = true;
  s.src         = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cfg.publisherId}`;
  s.crossOrigin = 'anonymous';
  s.dataset.nutryioAdsense = '1';
  document.head.appendChild(s);
}

function _nutryioLoadMonetag() {
  const cfg = NUTRYIO_ADS.monetag;
  if (!cfg.enabled || !cfg.src) return;
  if (document.querySelector('script[data-nutryio-monetag]')) return;
  const s = document.createElement('script');
  s.src   = cfg.src;
  s.async = true;
  s.setAttribute('data-cfasync', 'false');
  if (cfg.zone) s.setAttribute('data-zone', cfg.zone);
  s.dataset.nutryioMonetag = '1';
  document.head.appendChild(s);
}

function _nutryioRenderAdsense(el, slotKey) {
  const cfg = NUTRYIO_ADS.adsense;
  if (!cfg.enabled || !cfg.publisherId) return false;
  const slotId = cfg.slots[slotKey];
  if (!slotId) return false;
  el.innerHTML = `<ins class="adsbygoogle"
    style="display:block"
    data-ad-client="${cfg.publisherId}"
    data-ad-slot="${slotId}"
    data-ad-format="auto"
    data-full-width-responsive="true"></ins>`;
  try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (_) {}
  return true;
}

function _nutryioRenderAdsterra(el, slotKey) {
  const cfg = NUTRYIO_ADS.adsterra;
  if (!cfg.enabled) return false;
  const unitName = cfg.slotUnits[slotKey];
  if (!unitName) return false;
  const unit = cfg.units[unitName];
  if (!unit || !unit.key) return false;

  /* Adsterra's invoke.js uses document.write, which only works
     inline at parse time. To inject after page load we host the
     script inside an isolated iframe via srcdoc.                 */
  const html = `<!doctype html><html><head><meta charset="utf-8">
    <style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style>
    </head><body>
    <script type="text/javascript">
      atOptions = {
        'key'    : '${unit.key}',
        'format' : 'iframe',
        'height' : ${unit.height},
        'width'  : ${unit.width},
        'params' : {}
      };
    <\/script>
    <script type="text/javascript" src="https://www.highperformanceformat.com/${unit.key}/invoke.js"><\/script>
    </body></html>`;

  el.innerHTML = `<iframe
    title="Advertisement"
    scrolling="no"
    frameborder="0"
    style="display:block;margin:0 auto;border:0;width:${unit.width}px;height:${unit.height}px;max-width:100%"
    srcdoc='${html.replace(/'/g, "&#39;")}'></iframe>`;
  return true;
}

function _nutryioActivateAds() {
  /* Always load Monetag — it is a sitewide tag, not tied to slots. */
  _nutryioLoadMonetag();

  const hasAdsense  = NUTRYIO_ADS.adsense.enabled  && !!NUTRYIO_ADS.adsense.publisherId;
  const hasAdsterra = NUTRYIO_ADS.adsterra.enabled;

  if (hasAdsense)  _nutryioLoadAdsense();
  if (!hasAdsense && !hasAdsterra) return; // nothing to render into slots

  document.querySelectorAll('[data-ad]').forEach(el => {
    const slotKey = el.dataset.ad;

    /* Prefer AdSense when a slot ID is configured; otherwise fall
       back to Adsterra so the placeholder is still monetised.    */
    let filled = false;
    if (hasAdsense)  filled = _nutryioRenderAdsense(el, slotKey);
    if (!filled && hasAdsterra) filled = _nutryioRenderAdsterra(el, slotKey);

    if (filled) el.dataset.adLive = '1';
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
