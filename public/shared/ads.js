/* =================================================================
   Nutryio Ads Manager  ·  /shared/ads.js
   Loaded automatically on every page via template.js.

   Networks (rotated per [data-ad] slot):
     1. Adsterra banners    (728x90 + 300x250)
     2. Advertica banners   (728x90 + 300x250)
     3. (optional) Google AdSense — disabled by default

   ================================================================= */

const NUTRYIO_ADS = {

  /* ── Google AdSense (disabled) ─────────────────────────────── */
  adsense: {
    enabled: false,
    publisherId: 'ca-pub-1056206763644639',
    slots: {},
  },

  /* ── Adsterra banners ──────────────────────────────────────── */
  adsterra: {
    enabled: true,
    units: {
      leaderboard: { key: '529880126f5050c80092250dcea5e50e', width: 728, height: 90 },
      rectangle:   { key: '0f6f2d44485c1bc0f4b725a17a63fae6', width: 300, height: 250 },
    },
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

  ezmobVideo: {
    enabled: true,
    scriptUrl: 'https://docdn.ezmob.com/prebid.js',
    rendererUrl: 'https://docdn.ezmob.com/outstream_pb.js',
    zoneId: 393463,
    host: 'cpm.ezmob.com',
  },

  /* Adsterra smartlink opened by a click anywhere on the page */
  clickSmartlink: {
    enabled: true,
    url: 'https://www.profitableratecpmnetwork.com/jbdxi6dvs?key=fcab50e7f82afe9d7fafe62186db9a72',
    /* how many times it may trigger per page load */
    perPage: 1,
  },

};

/* ================================================================
   Internal helpers
   ================================================================ */

/* Per-tab counter — increments on every page load so each new page
   picks the next item in any rotating list. */
function _nutryioTick() {
  try {
    const k = 'nutryio_ad_tick';
    const n = (parseInt(sessionStorage.getItem(k) || '0', 10) || 0) + 1;
    sessionStorage.setItem(k, String(n));
    return n;
  } catch (_) {
    return Math.floor(Math.random() * 1e9);
  }
}
const _TICK = _nutryioTick();

/* ── Banner rendering ───────────────────────────────────────── */

function _nutryioRenderAdsterra(el, size) {
  const unit = NUTRYIO_ADS.adsterra.units[size];
  if (!unit || !unit.key) return false;
  const html = `<!doctype html><html><head><meta charset="utf-8">
    <style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style>
    </head><body>
    <script type="text/javascript">
      atOptions = { 'key':'${unit.key}','format':'iframe','height':${unit.height},'width':${unit.width},'params':{} };
    <\/script>
    <script type="text/javascript" src="https://www.highperformanceformat.com/${unit.key}/invoke.js"><\/script>
    </body></html>`;
  el.innerHTML = `<iframe title="Advertisement" scrolling="no" frameborder="0"
    style="display:block;margin:0 auto;border:0;width:${unit.width}px;height:${unit.height}px;max-width:100%"
    srcdoc='${html.replace(/'/g, "&#39;")}'></iframe>`;
  return true;
}

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
  const slotKey = el.dataset.ad;
  const size = NUTRYIO_ADS.slotSizes[slotKey] || 'rectangle';

  const networks = [];
  if (NUTRYIO_ADS.adsterra.enabled)  networks.push('adsterra');
  if (NUTRYIO_ADS.advertica.enabled) networks.push('advertica');
  if (!networks.length) return;

  /* Hash slot key into a stable offset so different slots on the
     same page rotate to different networks. */
  let hash = 0;
  for (let i = 0; i < slotKey.length; i++) hash = (hash * 31 + slotKey.charCodeAt(i)) | 0;
  const net = networks[Math.abs(_TICK + hash) % networks.length];

  let ok = false;
  if (net === 'adsterra')  ok = _nutryioRenderAdsterra(el, size);
  if (net === 'advertica') ok = _nutryioRenderAdvertica(el, size);

  /* Fallback to the other network if the chosen one had no unit */
  if (!ok) {
    const other = networks.find(n => n !== net);
    if (other === 'adsterra')  ok = _nutryioRenderAdsterra(el, size);
    if (other === 'advertica') ok = _nutryioRenderAdvertica(el, size);
  }
  if (ok) el.dataset.adLive = '1';
}

/* ── Click-anywhere smartlink (hidden, opens in a new tab) ──── */

function _nutryioInitClickSmartlink() {
  const cfg = NUTRYIO_ADS.clickSmartlink;
  if (!cfg || !cfg.enabled || !cfg.url) return;

  let fired = 0;
  const max = cfg.perPage || 1;

  const handler = (e) => {
    if (fired >= max) return;
    if (!e.isTrusted) return;
    if (e.button !== undefined && e.button !== 0) return;

    /* never hijack real navigation, forms, or the ad/CTA elements */
    const t = e.target instanceof Element ? e.target : null;
    if (t && t.closest('a, button, input, textarea, select, label, iframe, [data-ad]')) return;

    fired++;
    try {
      const w = window.open(cfg.url, '_blank', 'noopener,noreferrer');
      if (w) w.opener = null;
    } catch (_) {}
  };

  document.addEventListener('click', handler, true);
}

/* ── EZMob outstream video — once per page ───────────────────── */

function _nutryioInitVideoAd() {
  const cfg = NUTRYIO_ADS.ezmobVideo;
  if (!cfg.enabled || document.getElementById('nutryio-ezmob-video-script')) return;

  if (!document.getElementById('container-1')) {
    const container = document.createElement('div');
    container.id = 'container-1';
    container.setAttribute('aria-label', 'Video advertisement');
    document.body.appendChild(container);
  }

  const pbjs = window.pbjs = window.pbjs || {};
  pbjs.que = pbjs.que || [];
  pbjs.que.push(function () {
    pbjs.addAdUnits([{
      code: 'container-1',
      mediaTypes: {
        video: {
          context: 'outstream',
          playerSize: [300, 250],
          renderer: {
            url: cfg.rendererUrl,
            render: function (bid) {
              if (typeof window.OutstreamPlayerPB === 'function') {
                window.OutstreamPlayerPB(bid, {
                  displayMode: 'floating',
                  transitions: true,
                  vpaidMode: 2,
                });
              }
            },
          },
        },
      },
      bids: [{ bidder: 'adkernel', params: { zoneId: cfg.zoneId, host: cfg.host } }],
    }]);
    pbjs.requestBids({
      bidsBackHandler: function () {
        const bids = pbjs.getHighestCpmBids('container-1');
        if (bids.length === 0) return;
        pbjs.renderAd(document, bids[0].adId);
      },
    });
  });

  const script = document.createElement('script');
  script.id = 'nutryio-ezmob-video-script';
  script.type = 'text/javascript';
  script.src = cfg.scriptUrl;
  script.async = true;
  document.head.appendChild(script);
}

/* ── Activation ─────────────────────────────────────────────── */

function _nutryioActivateAds() {
  document.querySelectorAll('[data-ad]').forEach(_nutryioRenderSlot);
  _nutryioInitVideoAd();
  _nutryioInitClickSmartlink();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _nutryioActivateAds);
} else {
  _nutryioActivateAds();
}

window.NUTRYIO_ADS = NUTRYIO_ADS;
